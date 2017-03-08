from django.forms import ModelForm
from recipes.models import Recipe, Ingredient


class RecipeForm(ModelForm):

    class Meta:
        model = Recipe
        fields = ('name',)


class IngredientForm(ModelForm):

    class Meta:
        model = Ingredient
        fields = ('name',)
