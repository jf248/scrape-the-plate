from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models.fields.related import ManyToManyField, ForeignKey
from rest_framework import serializers, validators
from rest_framework.fields import CharField
from django.contrib.auth import get_user_model

from . import models

UserModel = get_user_model()


class UniqueFieldsMixin(serializers.ModelSerializer):
    """
    Remove all UniqueValidator validators from fields. The validator prevents
    us
    using a writable nested serializer.  Uniqueness is tested any way in the
    ModelValidateMixin
    @see https://github.com/beda-software/drf-writable-nested/blob/master \
    /drf_writable_nested/mixins.py
    """

    def get_fields(self):
        self._unique_fields = []

        fields = super(UniqueFieldsMixin, self).get_fields()
        for field_name, field in fields.items():
            is_unique = any([isinstance(validator, validators.UniqueValidator)
                             for validator in field.validators])
            if is_unique:
                self._unique_fields.append(field_name)
                field.validators = [
                    validator for validator in field.validators
                    if not isinstance(validator, validators.UniqueValidator)]

        return fields


class UpdateListMixin(serializers.Serializer):

    # Serializer doesn't include id by default.
    # Make id visible in .validated_data:
    id = serializers.IntegerField(required=False)

    class CustomListSerializer(serializers.ListSerializer):
        """
        Adds an update method to the ListSerializer.
        - Any existing instances not in the update instances will be deleted
        (checks id field of the update instance)
        - Any completely new instances (no id field) will be created
        """

        def update(self, instances, validated_data):
            ids_for_updates = [item['id'] for item in validated_data
                               if item.get('id') is not None]

            # Delete instances not in the list
            instances.exclude(id__in=ids_for_updates).delete()

            # Save the new instances
            ret = []
            for item in validated_data:
                id_ = item.get('id')
                if id_ is None:
                    ret.append(self.child.create(item))
                else:
                    instance = instances.get(id=id_)
                    ret.append(self.child.update(instance, item))

            return ret

    def __init__(self, *args, **kwargs):
        setattr(self.Meta, 'list_serializer_class', self.CustomListSerializer)
        super().__init__(*args, **kwargs)


class NestedMixin(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Find all the nested serializers, check they are ToMany relational
        # types and add to self.Meta.nested_fields
        self.Meta.nested_fields = [name for name, field in self.fields.items()
                                   if isinstance(field,
                                                 serializers.BaseSerializer)]
        for field_name in self.Meta.nested_fields:
            field = self.Meta.model._meta.get_field(field_name)
            assert (
                isinstance(field, ManyToManyField) or
                isinstance(field, ForeignKey)
            ), (
                'Nested field %s, is not a relational field' % field_name
            )
            # assert relation.to_many, (
            #     'Nested field %s, is not a to_many relational field'
            #     % field_name
            # )

    def validate(self, data, *args, **kwargs):
        """
        Remove nested data before running .validate()
        """
        no_nested = {**data}
        for field in self.Meta.nested_fields:
            no_nested.pop(field, None)
        super().validate(no_nested, *args, **kwargs)
        return data

    @transaction.atomic
    def create(self, validated_data):
        nested = self.pop_nested(validated_data)
        instance = super().create(validated_data)
        if nested:
            self.update_nested(nested, instance)
        return instance

    @transaction.atomic
    def update(self, instance, validated_data):
        nested = self.pop_nested(validated_data)
        instance = super().update(instance, validated_data)
        if nested:
            self.update_nested(nested, instance)
        return instance

    def pop_nested(self, validated_data):
        nested = {}
        for field_name in self.Meta.nested_fields:
            value = validated_data.pop(field_name, None)
            nested[field_name] = value
        return nested

    def update_nested(self, nested, instance):
        """
        Call the nested serializer's update method and set the returned items
        """
        for nested_field_name, attrs in nested.items():
            serializer = self.get_fields()[nested_field_name]
            nested_field = self.Meta.model._meta.get_field(nested_field_name)

            if isinstance(nested_field, ManyToManyField):
                related_manager = getattr(instance, nested_field_name)
                related_objects = related_manager.all()
                ret = serializer.update(related_objects, (attrs or []))
                related_manager.set(ret)

            elif isinstance(nested_field, ForeignKey):
                related_manager = nested_field.related_model.objects
                # 3 cases:
                # No attrs - delete any existing related instance
                # attrs with id - update the existing related instance
                # attrs without id - create new related instance

                if not attrs:
                    setattr(instance, nested_field_name, None)
                else:
                    nested_id = attrs.get('id', None)

                    if nested_id:
                        nested_instance = related_manager.get(
                            pk=nested_id
                        )
                        serializer.update(nested_instance, attrs)
                        setattr(instance, nested_field_name, nested_instance)
                    else:
                        nested_instance = serializer.create(attrs)
                        setattr(instance, nested_field_name, nested_instance)

            else:
                raise TypeError(
                    '{0} is marked as a nested field but is neither'
                    'a ManyToManyField or a ForeignKey field'.format(
                        nested_field_name)
                )
            # Save the instance
            instance.save()


class ModelValidateMixin(object):
    """
    This mixin implements a custom validate method to run the model's own
    validation checks by calling model.clean().
    This allows us to keep validation better encapsulated at the model level
    and avoid duplication of validation.
    """

    def validate(self, attrs):
        # Either:
            # Load instance from self.instance or load from attrs.id and make
            # changes to the fields from attrs
        # Or:
            # Create a new instance using attrs
        instance = self.instance
        ModelClass = self.Meta.model
        meta = ModelClass._meta
        pk_name = meta.pk.name

        if instance is None and hasattr(attrs, pk_name):
            instance = self.Meta.model.objects.filter(
                pk=attrs[pk_name]).first()
        if instance is None:
            instance = ModelClass()

        # We catch any django ValidationErrors and raise drf ValidationError's
        # instead.
        try:
            instance.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.args[0])

        attrs = super().validate(attrs)
        return attrs


class CustomSerializer(
    UniqueFieldsMixin, UpdateListMixin, NestedMixin, ModelValidateMixin,
    serializers.ModelSerializer
):
    def get_field_names(self, declared_fields, info):
        """
        Overwriten to allow .Meta.fields='__all__' to be used and then add
        extra fields on top with .Meta.extra_fields
        """
        expanded_fields = super().get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields


class GroceryGroupSerializer(CustomSerializer):

    class Meta:
        model = models.GroceryGroup
        fields = '__all__'
        validators = []


class GroceryItemSerializer(CustomSerializer):
    group = GroceryGroupSerializer()

    class Meta:
        model = models.GroceryItem
        fields = '__all__'
        extra_fields = ['group']
        validators = []


class TagSerializer(CustomSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'


class SourceSerializer(CustomSerializer):
    class Meta:
        model = models.Source
        fields = '__all__'


class IngredientSerializer(CustomSerializer):
    grocery_item = GroceryItemSerializer(required=False, allow_null=True)

    class Meta:
        model = models.Ingredient
        fields = '__all__'
        validators = []


class ListField(CharField):
    """
    A field for converting lists of strings stored in a model as one string.
    """
    delimiter = '\n\n'

    def to_internal_value(self, data):
        if isinstance(data, list):
            data = self.delimiter.join(data)
        return super().to_internal_value(data)

    def to_representation(self, value):
        value = super().to_representation(value)
        if value == '':
            return []
        else:
            return value.split(self.delimiter)


class RecipeSerializer(CustomSerializer):
    # Overwrite the default ingredients field to use a nested serializer
    ingredients = IngredientSerializer(many=True, required=False)
    preparation = ListField(allow_blank=True, required=False, style={
                            'base_template': 'textarea.html'})

    class Meta:
        model = models.Recipe
        exclude = ('image',)
        validators = []


class UserSerializer(CustomSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'first_name', 'last_name']


class BookSerializer(CustomSerializer):
    class Meta:
        model = models.Book
        fields = '__all__'


class AuthSerializer(CustomSerializer):
    # Write-only password
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user

    class Meta:
        model = UserModel
        fields = '__all__'
