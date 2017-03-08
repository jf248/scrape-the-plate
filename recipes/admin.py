from django.contrib import admin
from recipes.models import Recipe, RecipeIngredient


# set up automated slug creation
class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    list_display = ('name',)
    prepopulated_fields = {'slug': ('name',)}

# and register it
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeIngredient)
