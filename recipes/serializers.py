from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models.fields.related import ManyToManyField
from rest_framework import serializers
from rest_framework.fields import CharField
from rest_framework.utils import model_meta
from django.contrib.auth import get_user_model

from . import models

UserModel = get_user_model()


class CustomListSerializer(serializers.ListSerializer):
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


class UpdateListMixin(serializers.Serializer):

    # Serializer doesn't include id by default.
    # Make id visible in .validated_data:
    id = serializers.IntegerField(required=False)

    def __init__(self, *args, **kwargs):
        setattr(self.Meta, 'list_serializer_class', CustomListSerializer)
        super().__init__(*args, **kwargs)


class NestedMixin(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Find all the nested serializers, check they are ToMany relational
        # types and add to self.Meta.nested_fields
        self.Meta.nested_fields = [name for name, field in self.fields.items()
                                   if isinstance(field,
                                                 serializers.BaseSerializer)]
        ModelClass = self.Meta.model
        relations = model_meta.get_field_info(ModelClass).relations
        for field_name in self.Meta.nested_fields:
            relation = relations.get(field_name)
            assert relation, (
                'Nested field %s, is not a relational field' % field_name
            )
            assert relation.to_many, (
                'Nested field %s, is not a to_many relational field'
                % field_name
            )

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
            if value is not None:
                nested[field_name] = value
        return nested

    def update_nested(self, nested, instance):
        """
        Call the nested serializer's update method and set the returned items
        """
        for field_name, attrs in nested.items():
            related_manager = getattr(instance, field_name)
            serializer = self.get_fields()[field_name]
            related_objects = related_manager.all()
            ret = serializer.update(related_objects, attrs)
            related_manager.set(ret)


class ModelValidateMixin(object):
    """
    This mixin implements a custom validate method to run the model's own
    validation checks by calling model.clean().
    This allows us to keep validation better encapsulated at the model level
    or avoid duplication of validation.
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

        # Ignore, i.e. don't validate ManyToManyField fields
        for field_name, value in attrs.items():
            field = meta.get_field(field_name)
            if not isinstance(field, ManyToManyField):
                setattr(instance, field_name, value)

        # We catch any django ValidationErrors and raise drf ValidationError's
        # instead.
        try:
            instance.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.args[0])

        attrs = super().validate(attrs)
        return attrs


class CustomSerializer(UpdateListMixin, NestedMixin, ModelValidateMixin,
                       serializers.ModelSerializer):
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


class GroceryItemSerializer(CustomSerializer):
    group = GroceryGroupSerializer()

    class Meta:
        model = models.GroceryItem
        fields = '__all__'
        extra_fields = ['group']


class TagSerializer(CustomSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'


class SourceSerializer(CustomSerializer):
    class Meta:
        model = models.Source
        fields = '__all__'


class IngredientSerializer(CustomSerializer):
    class Meta:
        model = models.Ingredient
        fields = '__all__'


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
