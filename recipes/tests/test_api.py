from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from recipes import models
from mixer.backend.django import mixer


class RecipeTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up a user
        cls.user = models.User.objects.create_user(
            'joe', 'joe@blogg.com', 'password'
        )

    def setUp(self):
        # Force authenticate
        self.client.force_authenticate(user=self.user)

    def test_create_recipe(self):
        """
        Ensure we can create a new recipe object.
        """
        url = reverse('recipes-list')
        data = {'title': 'Foo'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Recipe.objects.count(), 1)
        self.assertEqual(models.Recipe.objects.get().title, 'Foo')

    def test_get_returns_403_if_not_public(self):
        """
        Ensure we can't access non-public recipes
        """
        recipe = mixer.blend(models.Recipe, user=None, public=False)
        url = reverse('recipes-detail', kwargs={'pk': recipe.pk})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_will_get_private_recipe_of_the_user(self):
        """
        Ensure we can get a private recipe
        """
        recipe = mixer.blend(models.Recipe, user=self.user, public=False)
        url = reverse('recipes-detail', kwargs={'pk': recipe.pk})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('title'), recipe.title)


class RecipeNestedTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up a user
        cls.user = models.User.objects.create_user(
            'joe', 'joe@blogg.com', 'password'
        )

    def setUp(self):
        # Force authenticate
        self.client.force_authenticate(user=self.user)

        # Set up a recipe > ingredient > grocery_item > grocery_group
        self.grocery_group = mixer.blend(models.GroceryGroup)
        self.grocery_items = mixer.cycle(2).blend(
            models.GroceryItem, grocery_group=mixer.SELECT
        )
        self.ingredient = mixer.blend(
            models.Ingredient, grocery_item=self.grocery_items[0]
        )
        self.recipe = mixer.blend(
            models.Recipe, user=self.user
        )
        self.recipe.ingredients.set((self.ingredient,))

    def test_update_ingredient_text(self):
        """
        Ensure we can update the nested parts of recipe
        """

        url = reverse('recipes-detail', kwargs={'pk': self.recipe.pk})

        data = {'ingredients': [{'id': self.ingredient.id, 'text': 'Bar'}]}
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            models.Recipe.objects.get().ingredients.all()[0].text,
            'Bar'
        )

    def test_update_grocery_item(self):
        """
        Ensure we can update the nested parts of recipe
        """
        url = reverse('recipes-detail', kwargs={'pk': self.recipe.pk})

        data = {
            'ingredients': [
                {
                    'id': self.ingredient.id,
                    'grocery_item': {
                        'id': self.grocery_items[1].id,
                        'group': {
                            'id': self.grocery_group.id,
                        }
                    }
                }
            ]
        }

        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(models.Recipe.objects.count(), 1)
        self.assertEqual(
            models.Recipe.objects.get().
            ingredients.all()[0].grocery_item,
            self.grocery_items[1]
        )
