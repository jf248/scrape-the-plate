from django.contrib import admin
from recipes.models import Recipe, RecipeIngredient
from django.apps import apps

# Register all models except those in SPECIAL which are registered below.
app = apps.get_app_config('recipes')
SPECIAL = ['recipe']
for model_name, model in app.models.items():
    if model_name not in SPECIAL:
        admin.site.register(model)


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    fk_name = 'recipe'
    extra = 1


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    # list_display = ('name',)
    # prepopulated_fields = {'slug': ('name',)}
    inlines = [RecipeIngredientInline,]


admin.site.register(Recipe, RecipeAdmin)
