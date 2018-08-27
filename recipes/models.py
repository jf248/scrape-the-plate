from __future__ import unicode_literals
from recipes.utils import general
from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from recipes import ImageField
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


class AbstractModel(models.Model):
    def normalize(self):
        pass

    def save(self, *args, **kwargs):
        self.normalize()
        super().save(*args, **kwargs)

    @classmethod
    def filter_user(cls, user):
        if user:
            return cls.objects.filter(user=user.id)
        return cls.objects.filter(user=-1)

    @classmethod
    def filter_user_and_None(cls, user):
        if user:
            return cls.objects.filter(
                models.Q(user=user.id) | models.Q(user=None)
            )
        return cls.objects.filter(user=True)

    @classmethod
    def filter_user_and_public(cls, user):
        if user:
            return cls.objects.filter(
                models.Q(user=user.id) | models.Q(public=True)
            )
        return cls.objects.filter(public=True)

    @classmethod
    def get_all(cls):
        return list(cls.objects.all())

    class Meta:
        abstract = True


class User(AbstractUser, AbstractModel):
    def normalize(self):
        self.email = self.username


class Tag(AbstractModel):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        ordering = ['name']


class Source(AbstractModel):
    name = models.CharField(max_length=255, unique=True)
    domain_name = models.CharField(max_length=255,  blank=True)

    @classmethod
    def get_id_from_domain_name(cls, domain_name):
        try:
            source = cls.objects.get(domain_name=domain_name)
            return source.id
        except ObjectDoesNotExist:
            return None

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class GroceryGroup(AbstractModel):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class GroceryItem(AbstractModel):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )
    name = models.CharField(max_length=255, unique=True)
    group = models.ForeignKey(GroceryGroup, on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        # self.name = general.singular_lower_stripped(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class GroceryPhrase(AbstractModel):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )
    grocery_item = models.ForeignKey(GroceryItem, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        self.text = general.singular_lower_stripped(
            self.text, simple_only=True)
        super(GroceryPhrase, self).save(*args, **kwargs)

    def __str__(self):
        return self.text


class Ingredient(AbstractModel):
    grocery_item = models.ForeignKey(
        GroceryItem, on_delete=models.PROTECT, blank=True, null=True)
    text = models.CharField(max_length=255)
    # group = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.text


class Book(AbstractModel):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        ordering = ['title']


class Recipe(AbstractModel):
    public = models.BooleanField(default=False)
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, blank=True, null=True
    )
    title = models.CharField(max_length=255)
    slug = models.SlugField(editable=False, max_length=255)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    preparation = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    source = models.ForeignKey(
        Source, on_delete=models.PROTECT, null=True, blank=True
    )
    url = models.URLField(blank=True)
    book = models.ForeignKey(
        Book, on_delete=models.PROTECT, null=True, blank=True
    )
    page = models.IntegerField(null=True, blank=True)
    prep_time = models.IntegerField(null=True, blank=True)
    cook_time = models.IntegerField(null=True, blank=True)
    serves = models.IntegerField(blank=True, null=True)
    image = ImageField(
        upload_to=general.path_and_rename("images/recipes"),
        default="images/recipes/default.png",
        blank=True
    )

    def clean(self):
        self.normalize()
        if self._slug_exists():
            raise ValidationError(
                {'title': 'A recipe with that title already exists.'})

    def __str__(self):
        return self.slug

    class Meta:
        ordering = ['slug']

    def normalize(self):
        d = self.__dict__
        if 'title' in d:
            d['slug'] = slugify(self.title)

    def _slug_exists(self):
        qs = Recipe.objects.filter(slug=self.slug, user=self.user)
        if self.pk:
            qs = qs.exclude(pk=self.pk)
        return qs.exists()
