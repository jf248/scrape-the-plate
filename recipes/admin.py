from django.apps import apps
from django.contrib import admin
from recipes.models import Recipe, User
from django.contrib.auth.admin import UserAdmin

# Register all models except those in SPECIAL which are registered below.
app = apps.get_app_config('recipes')
SPECIAL = ['recipe', 'user']
for model_name, model in app.models.items():
    if model_name not in SPECIAL:
        admin.site.register(model)


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe
    # list_display = ('name',)
    # prepopulated_fields = {'slug': ('name',)}


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(User, UserAdmin)
