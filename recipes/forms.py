from django import forms
from django.forms import formset_factory
from recipes.models import Recipe, Ingredient, RecipeIngredient, Source
from django.template.defaultfilters import slugify
from recipes.widgets import IngredientWidget, SessionClearableFileInput
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Div, Field, HTML
from crispy_forms.bootstrap import StrictButton, FormActions, FieldWithButtons
from recipes.utils.general import singular_lower_stripped

LABEL_CLASS = 'col-sm-2'
FIELD_CLASS = 'col-sm-10'


class IngredientForm(forms.ModelForm):

    class Meta:
        model = Ingredient
        fields = ('group', 'name')

    def __init__(self, *args, **kwargs):
        super(IngredientForm, self).__init__(*args, **kwargs)
        self.fields['group'].required = False

        # crispy-forms
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal form-modal'
        self.helper.label_class = 'col-sm-2'
        self.helper.field_class = 'col-sm-10'
        self.helper.layout = Layout(
            Div(
                'group',
                'name',
                css_class="modal-body"
            ),
            Div(
                StrictButton('Add Ingredient',
                             css_id='add-ingredient',
                             css_class='btn-primary'),
                css_class="modal-footer"
            ),
        )

    def clean_name(self):
        name = self.cleaned_data['name']
        return singular_lower_stripped(name)


class Scrape01Form(forms.Form):
    url = forms.URLField(required=False)
    source = forms.ModelChoiceField(
        Source.objects.all(),
        required=False,
        widget=forms.HiddenInput)

    def clean(self):
        url = self.cleaned_data.get('url')
        if url:
            base_urls = Source.objects.values_list('base_url', flat=True)
            match = ''
            for base_url in base_urls:
                if base_url in url:
                    match = base_url
            if match:
                print("match:", match)
                source = Source.objects.get(base_url=match)
                print("source:", source)
                self.cleaned_data['source'] = source
                print("cleaned_source:", self.cleaned_data['source'])
                return self.cleaned_data
            else:
                self.add_error('url', 'Site not recognised. Sorry.')

    def __init__(self, *args, **kwargs):
        super(Scrape01Form, self).__init__(*args, **kwargs)
        self.fields['url'].label = ''
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            FieldWithButtons(
                Field('url', placeholder="url"),
                Submit('scrape_or_manual', 'scrape')
            ),
            'source'
        )


class Scrape02Form(forms.ModelForm):

    class Meta:
        model = Recipe
        fields = ('name', 'image', 'serves', 'prep_time')
        widgets = {'image': SessionClearableFileInput}

    ingredients = forms.CharField(widget=forms.Textarea())
    preparation = forms.CharField(widget=forms.Textarea())
    scraped_image_url = forms.CharField(widget=forms.HiddenInput,
                                        required=False)

    def __init__(self, *args, **kwargs):
        super(Scrape02Form, self).__init__(*args, **kwargs)

        # crispy-forms
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = LABEL_CLASS
        self.helper.field_class = FIELD_CLASS
        self.helper.layout = Layout(
            'scraped_image_url',
            Field('name', placeholder="Recipe name"),
            HTML(
                '<div class="form-group">'
                '<label for="" class="control-label ' + LABEL_CLASS + '">'
                'Scraped Image'
                '</label>'
                '<div class="controls ' + FIELD_CLASS + '"'
                ' style="padding-top:7px">'
                '<img src="{{ form.scraped_image_url.value }}"'
                ' alt="Recipe image" class="img-rounded center-cropped"'
                ' style="height: 140px; width: 140px; margin-bottom: 5px;'
                ' display: block;" >'
                '<a data-toggle="collapse" href="#div_id_image"'
                ' aria-expanded="false" aria-controls="div_id_image"'
                ' style="display: block;">'
                'Upload a different image</a>'
                '</div></div>'
            ),
            Field('image', wrapper_class="collapse"),
            Field('serves', placeholder="Serves"),
            Field('prep_time', placeholder="Number of minutes"),
            Field('ingredients', placeholder="Dump all the ingredients here"),
            Field('preparation', placeholder="Dump all the preparation "
                                             "instructions here"),
            FormActions(
                Submit('next', 'Next')
            )
        )

        # if no scraped_image_url remove from layout
        scraped_image_url = (
            self.initial.get('scraped_image_url', '')
            or self.data.get('scraped_image_url', '')
            or '')
        if not scraped_image_url:
            layout = self.helper.layout
            layout[3] = Field('image')
            layout.pop(2)

    def clean_name(self):
        name = self.cleaned_data['name']
        slug = slugify(name)
        if Recipe.objects.filter(slug=slug).exists():
            raise forms.ValidationError("Recipe with that name already exists")
        return " ".join(w.capitalize() for w in name.split())


class Scrape03Form(forms.ModelForm):

    class Meta:
        model = RecipeIngredient
        fields = ('ingredient', 'text')
        widgets = {
            'text': forms.HiddenInput,
            'ingredient': IngredientWidget}

    ingredient_phrase = forms.CharField(widget=forms.TextInput())

    def __init__(self, *args, **kwargs):
        super(Scrape03Form, self).__init__(*args, **kwargs)
        self.fields['ingredient_phrase'].label = "Ingredient phrase"
        self.helper = FormHelper()

Scrape03Formset = formset_factory(Scrape03Form, extra=0, can_delete=True,)


class Scrape03FormsetHelper(FormHelper):

    def __init__(self, *args, **kwargs):
        super(Scrape03FormsetHelper, self).__init__(*args, **kwargs)
        # No form_tag, instead put <form... in template with submit button
        self.form_tag = False
        self.form_method = 'post'
        self.layout = Layout(
            Div(
                Div(
                    Div(
                        css_class="ingredient-text-container",
                        css_id="ingredient-text-container-"
                               "{{ forloop.counter }}"
                    ),
                    Div(
                        Div(
                          Field("ingredient_phrase",
                                placeholder="Highlight phrase in the"
                                            " expression above",
                                readonly=True,
                                css_class="recipes-ingredient-phrase"),
                          css_class="col-sm-8"
                        ),
                        Div(
                            Field("ingredient", css_class="combobox"),
                            css_class="col-sm-4"
                        ),
                        css_class="row"
                    ),
                    css_class="panel-body",
                ),
                css_class="panel panel-default ingredient-form-container",
            )
        )
