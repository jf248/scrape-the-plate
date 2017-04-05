from __future__ import unicode_literals
import os
from uuid import uuid4
from django.db import models
from django.template.defaultfilters import slugify
from .utils.general import capitalize_correct, singular_lower_stripped, \
    path_and_rename


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        self.name = singular_lower_stripped(self.name)
        super(Tag, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Source(models.Model):
    name = models.CharField(max_length=255, unique=True)
    base_url = models.URLField(verbose_name="Source URL")

    def save(self, *args, **kwargs):
        self.name = capitalize_correct(self.name)
        super(Source, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, editable=False)
    preparation = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    source = models.ForeignKey(Source, on_delete=models.PROTECT, null=True,
                               blank=True)
    url = models.URLField(blank=True)
    prep_time = models.IntegerField(verbose_name="Preparation Time",
                                    null=True, blank=True)
    serves = models.IntegerField(default=4)
    image = models.ImageField(
        upload_to=path_and_rename("images/recipes"),
        default="images/recipes/default.jpg",
        blank=True)

    def save(self, *args, **kwargs):
        self.name = capitalize_correct(self.name)
        self.slug = slugify(self.name)
        super(Recipe, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return "/recipes/%s/" % self.slug

    class Meta:
        ordering = ['slug']


class IngredientGroup(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        self.name = self.name.capitalize()
        super(IngredientGroup, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)
    group = models.ForeignKey(IngredientGroup, on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        self.name = singular_lower_stripped(self.name)
        super(Ingredient, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.PROTECT
    )
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class IngredientPhrase(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        self.text = singular_lower_stripped(self.text, simple_only=True)
        super(IngredientPhrase, self).save(*args, **kwargs)

    def __str__(self):
        return self.text
