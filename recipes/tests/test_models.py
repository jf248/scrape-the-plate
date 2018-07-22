"""
Only testing custom functionality not (re-)testing django model framework.

Uses tests.utils.ModelTesterMixin to patch out model save() methods to make
unit tests that avoid slow calls to database when testing custom save methods
on models.
"""

from django.test import TestCase, override_settings
from mixer.backend.django import Mixer
from unittest.mock import patch
from os import path
from tempfile import TemporaryDirectory

from recipes import models
from recipes.models import models as dj_models, ValidationError
from recipes.tests.utils import TestHelper, ModelTesterMixin


class SavePatcherMixin(object):
    """
    Mixin for patching out save() method so that tests don't hit database and
    can unit test custom save() methods.
    """

    @classmethod
    def setUpTestData(cls):
        # create a mixer that doesn't hit the database
        cls.mixer = Mixer(commit=False)

    def setUp(self):
        self._add_patch_save()

    def _add_patch_save(self):
        # For testing custom model save mthods.
        # Patch's the model's inherited save method (e.g. super().save()),
        # to avoid hitting database.

        self.patch_save = patch.object(dj_models.Model, 'save', autospec=True)
        self.addCleanup(self.patch_save.stop)
        self.mock_save = self.patch_save.start()


class TagTests(SavePatcherMixin, ModelTesterMixin, TestCase):

    def test_save_corrects_name(self):
        tag = self.mixer.blend(models.Tag, name=' tests ')
        tag.save()

        self.mock_save.assert_called_with(tag)
        self.assertEqual(tag.name, 'test')

    def test_meta(self):
        self.assertMeta(
            model_cls=models.Tag,
            required_fields=[],
            unique_fields=['name'],
            ordering=['name']
        )


class SourceTests(SavePatcherMixin, ModelTesterMixin, TestCase):
    model_cls = models.Source

    def test_meta(self):
        self.assertMeta(
            model_cls=self.model_cls,
            required_fields=[],
            unique_fields=['name'],
            ordering=['name']
        )

    def test_get_id_from_domain_name(self):
        self.doCleanups()       # stop patches so can save to database
        mixer = Mixer(commit=True)
        source = mixer.blend(self.model_cls)
        domain_name = source.domain_name
        self.assertEqual(
            models.Source.get_id_from_domain_name(domain_name),
            source.id
        )

    def test_get_id_from_domain_name_returns_None_if_no_match(self):
        domain_name = 'foo'
        self.assertEqual(
            self.model_cls.get_id_from_domain_name(domain_name),
            None
        )


class RecipeTests(SavePatcherMixin, ModelTesterMixin, TestCase):
    model_cls = models.Recipe

    def test_meta(self):
        self.assertMeta(
            model_cls=self.model_cls,
            required_fields=['title', 'slug'],
            unique_fields=[],
            ordering=['slug']
        )

    def test_clean_raises_if_slug_exists(self):
        self.doCleanups()
        mixer = Mixer(commit=True)
        recipe1 = mixer.blend(self.model_cls)
        recipe2 = self.model_cls(title=recipe1.title)
        with self.assertRaises(ValidationError):
            recipe2.clean()

    @override_settings(MEDIA_ROOT=TemporaryDirectory().name)
    def test_recipe_image_upload(self):
        self.doCleanups()       # stop patch so can save to database
        mixer = Mixer(commit=True)
        image = TestHelper.get_image_file()
        recipe = mixer.blend(self.model_cls, image=image)
        image_path = path.split(recipe.image.name)[0]
        self.assertEqual(image_path, 'images/recipes')


class GroceryGroupTests(SavePatcherMixin, ModelTesterMixin, TestCase):

    def test_meta(self):
        self.assertMeta(models.GroceryGroup,
                        required_fields=['name'],
                        unique_fields=['name'],
                        ordering=['name'])


class GroceryItemTests(SavePatcherMixin, ModelTesterMixin, TestCase):

    def test_save_corrects_name(self):
        gi = self.mixer.blend(models.GroceryItem, name='  tests  ')
        gi.save()

        self.mock_save.assert_called_with(gi)
        self.assertEqual(gi.name, 'test')

    def test_meta(self):
        self.assertMeta(models.GroceryItem,
                        required_fields=['name', 'group'],
                        unique_fields=['name'],
                        ordering=['name'])


class IngredientTests(SavePatcherMixin, ModelTesterMixin, TestCase):

    def test_meta(self):
        self.assertMeta(models.Ingredient,
                        required_fields=['text'],
                        unique_fields=[],
                        ordering=[])


class GroceryPhraseTests(SavePatcherMixin, ModelTesterMixin, TestCase):

    def test_save_corrects_text(self):
        gp = self.mixer.blend(models.GroceryPhrase, text='  tests  ')
        gp.save()

        self.mock_save.assert_called_with(gp)
        self.assertEqual(gp.text, 'test')

    def test_meta(self):
        self.assertMeta(models.GroceryPhrase,
                        required_fields=['grocery_item', 'text'],
                        unique_fields=['text'],
                        ordering=[])


class ModelHelperTests(TestCase):

    def test_get_all_returns_list_of_all_objects(self):
        mixer = Mixer(commit=True)
        phrases = mixer.cycle(3).blend(models.GroceryPhrase)

        expected = phrases
        result = models.ModelHelper.get_all(models.GroceryPhrase)

        self.assertEqual(result, expected)
