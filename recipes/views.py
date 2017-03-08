from django.shortcuts import render, redirect, HttpResponse
from django.views.generic import TemplateView
from django.forms import inlineformset_factory
from .models import Recipe, RecipeIngredient, RecipeStep, Ingredient
from .forms import RecipeForm, IngredientForm


def index(request):
    recipes = Recipe.objects.all()

    return render(request, 'recipes/index.html', {
        'recipes': recipes
    })


def recipe_detail(request, slug):
    recipe = (
        Recipe.objects
        .prefetch_related('recipeingredient_set', 'recipestep_set')
        .get(slug=slug)
    )
    mark = is_marked(request, slug)

    return render(request, 'recipes/recipe_detail.html', {
        'recipe': recipe,
        'mark': mark
    })


def recipe_edit(request, slug):
    if slug is None:
        recipe = Recipe()
        new = True
    else:
        recipe = Recipe.objects.get(slug=slug)
        new = False
    RecipeIngredientInlineFormset = inlineformset_factory(
        Recipe, RecipeIngredient, fields=('ingredient', 'text',), extra=0
    )
    RecipeStepInlineFormset = inlineformset_factory(
        Recipe, RecipeStep, fields=('text',), extra=0
    )

    # if coming to this view from a submitted form
    if request.method == 'POST':
        form = RecipeForm(data=request.POST, instance=recipe)
        ri_formset = RecipeIngredientInlineFormset(
            request.POST, request.FILES, instance=recipe)
        rs_formset = RecipeStepInlineFormset(
            request.POST, request.FILES, instance=recipe)
        if form.is_valid() and ri_formset.is_valid() and \
                rs_formset.is_valid():
            # We need to generate slug field, so don't commit and use
            # Recipe's overridden save() method
            recipe = form.save(commit=False)
            recipe.save()
            ri_formset.save()
            rs_formset.save()
            return redirect('recipes:recipe_detail', slug=recipe.slug)
    else:
        form = RecipeForm(instance=recipe)
        ri_formset = RecipeIngredientInlineFormset(instance=recipe)
        rs_formset = RecipeStepInlineFormset(instance=recipe)
    return render(request, 'recipes/recipe_edit.html', {
            'recipe': recipe,
            'form': form,
            'ri_formset': ri_formset,
            'rs_formset': rs_formset,
            'new': new
    })


def recipe_mark(request, slug):
    toggle_mark(request, slug)
    return redirect('recipes:recipe_detail', slug=slug)


def is_marked(request, slug):
    if 'marks' not in request.session:
        request.session['marks'] = {}
        return False
    marks = request.session['marks']
    if slug in marks:
        return True
    else:
        return False


def toggle_mark(request, slug):
    if 'marks' not in request.session:
        request.session['marks'] = {}
    marks = request.session['marks']
    if slug in marks:
        del marks[slug]
    else:
        marks[slug] = True
    request.session['marks'] = marks





class AboutView(TemplateView):
    template_name = 'recipes/about.html'
