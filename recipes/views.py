import io
import requests

from django.core.files import File
from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views.generic import CreateView, DetailView, TemplateView
from .forms import IngredientForm, Scrape01Form, Scrape02Form
from .forms import Scrape03Formset, Scrape03FormsetHelper
from .models import Ingredient, Recipe, RecipeIngredient
from .models import IngredientPhrase
from .utils.scraper import get_scraper
from .utils.storage import SessionStorage
from .utils.general import list_from_textarea
from .utils.parse import parse_ingredient_text


# todo: search filter and pagination
def index(request):
    recipes = Recipe.objects.all()
    return render(request, 'recipes/index.html', {'recipes': recipes})


class AboutView(TemplateView):
    template_name = 'recipes/about.html'


class IngredientViews:

    @staticmethod
    def urls():
        from django.conf.urls import url
        urlpatterns = [
            url(r'^add/$', IngredientViews.IngredientCreate.as_view(),
                name='ingredient_add'),
        ]
        return urlpatterns

    class IngredientCreate(CreateView):
        model = Ingredient
        form_class = IngredientForm
        success_url = 'success'  # need to set, but not used as form_valid
        # overridden

        def form_valid(self, form):
            response = super(IngredientViews.IngredientCreate, self).form_valid(form)
            if self.request.is_ajax():
                data = {
                    'pk': self.object.pk,
                    'name': self.object.name,
                }
                return JsonResponse(data)
            else:
                # not used only ajax
                return response


class RecipeDetail(DetailView):
    model = Recipe
    context_object_name = "recipe"
    template_name = "recipes/recipe_detail.html"


# def recipe_detail(request, slug):
#
#     def is_marked(request, slug):
#         if 'marks' not in request.session:
#             request.session['marks'] = {}
#             return False
#         marks = request.session['marks']
#         return slug in marks
#
#     recipe = (
#         Recipe.objects
#         .prefetch_related('recipeingredient_set', 'recipestep_set')
#         .get(slug=slug)
#     )
#     mark = is_marked(request, slug)
#
#     return render(request, 'recipes/recipe_detail.html', {
#         'recipe': recipe,
#         'mark': mark
#     })


def recipe_mark(request, slug):

    def toggle_mark(request, slug):
        if 'marks' not in request.session:
            request.session['marks'] = {}
        marks = request.session['marks']
        if slug in marks:
            del marks[slug]
        else:
            marks[slug] = True
        request.session.modified = True

    toggle_mark(request, slug)


def scrape_view(request, step='1', context=None):

    last_step = '3'
    steps = ['1', '2', '3']
    template = 'recipes/scrape/scrape_0' + step + '.html'

    if step not in steps:
        raise ValueError("step=%s. Valid values are %s" % (step, steps))

    # initialise storage and context
    storage = SessionStorage('scrape2', request, step)
    if context is None:
        context = {}

    if request.method == 'POST':

        if step == '1':
            data = request.POST.copy()
            if data["scrape_or_manual"] == "manual":
                data["url"] = ""
            form = Scrape01Form(data)
            context['form'] = form

        elif step == '2':
            form = Scrape02Form(request.POST, request.FILES)
            context['form'] = form

        else:
            form = Scrape03Formset(request.POST)
            context['formset'] = form
            context['helper'] = Scrape03FormsetHelper()

        if form.is_valid():

            # Store data
            storage.set_step_data(step, form.data)

            # Store files
            if request.FILES:
                print("request.FILES:", request.FILES)
                storage.set_step_files(step, form.files)
            else:
                # check for any '*-clear' fields
                for field, field_value in form.data.items():
                    i = field.find("-clear")
                    if i != -1:
                        file_field = field[:i]
                        storage.delete_file(step, file_field)

            # clear any pre-existing data from higher steps
            storage.del_higher_steps(step)

            # If last_step done, else redirect to next step (clearing context)
            if step == last_step:
                # Scrape complete.

                # Get step 2 data for new recipe
                data = storage.get_step_data('2')
                files = storage.get_step_files('2')

                # Save either scraped image or uploaded image
                url = data['scraped_image_url']
                if url and not (files and 'image' in files):
                    r = requests.get(url, stream=True)
                    if r.status_code == 200:
                        b = io.BytesIO()
                        for chunk in r:
                            b.write(chunk)
                        b.seek(0)
                        files['image'] = File(b.read())

                # Save new recipe instance
                recipe = Scrape02Form(data, files).save()

                # Create new RecipeIngredients and IngredientPhrase
                recipe_ingredients = []
                data = storage.get_step_data('3')
                formset = Scrape03Formset(data)
                for form in formset:
                    ingredient = form.cleaned_data['ingredient']
                    recipe_ingredients.append(RecipeIngredient(
                        recipe=recipe,
                        ingredient=ingredient,
                        text=form.cleaned_data['text']))
                    text = form.cleaned_data['ingredient_phrase']
                    ing_phrase, created = \
                        IngredientPhrase.objects.get_or_create(
                            text=text, ingredient=ingredient)
                    if created:
                        ing_phrase.save()
                RecipeIngredient.objects.bulk_create(recipe_ingredients)

                # Delete session data
                storage.delete()

                # Finished, go to the new recipe
                return redirect(recipe.get_absolute_url())

            else:
                step = str(int(step) + 1)
                return redirect('recipes:scrape', step=step)
        else:
            return render(request, template, context)

    else:
        steps_completed = storage.steps_completed()

        # Redirect if trying to skip a step
        if int(step) > steps_completed + 1:
            step = str(steps_completed + 1)
            return redirect('recipes:scrape', step=step)

        # If returning to a completed step, populate context from storage
        elif int(step) <= steps_completed:
                context['form'] = Scrape01Form(
                    initial=storage.get_step_data(step),
                    files=storage.get_step_files(step))

        # step = steps_completed + 1.
        # i.e. first time on this step, generate context from previous step
        # data
        else:
            if step == '1':
                context['form'] = Scrape01Form()
            elif step == '2':
                form1 = Scrape01Form(data=storage.get_step_data('1'))
                form1.is_valid()
                url = form1.cleaned_data['url']
                data = None
                if url:
                    source = form1.cleaned_data['source']
                    scraper = get_scraper(url, source.base_url)
                    data = scraper.data
                context['form'] = Scrape02Form(initial=data)
            else:
                form2 = Scrape02Form(data=storage.get_step_data('2'))
                form2.is_valid()
                ingredients = form2.cleaned_data['ingredients']
                ing_texts = list_from_textarea(ingredients)
                data = [{'text': x} for x in ing_texts]
                ingredients = Ingredient.objects.all()
                phrases = IngredientPhrase.objects.all()
                for dict_ in data:
                    dict_['ingredient'], dict_['ingredient_phrase'] = \
                        parse_ingredient_text(
                            dict_['text'], ingredients,
                            phrases, 'ingredient')
                context['form'] = Scrape03Formset(initial=data)
                context['helper'] = Scrape03FormsetHelper()

        response = render(request, template, context)
        storage.update_response(response)
        return response

