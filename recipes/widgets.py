from django import forms
from django.forms import CheckboxInput
from django.forms import ClearableFileInput
from django.template.loader import render_to_string
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe


class IngredientWidget(forms.Select):
    template = 'recipes/ingredient_widget.html'

    def render(self, name, value, *args, **kwargs):
        widget = super(IngredientWidget, self).render(name, value, attrs=None)
        return mark_safe(render_to_string(self.template,
                                          context={'widget': widget,
                                                   'name': name}))


class SessionClearableFileInput(ClearableFileInput):

    template_with_session = (
        '<strong>%(initial_text)s: </strong>%(initial)s '
        '%(clear_template)s<br /><strong>%(input_text)s: </strong>%(input)s'
    )

    def render(self, name, value, attrs=None):


        substitutions = {
            'initial_text': self.initial_text,
            'input_text': self.input_text,
            'clear_template': '',
            'clear_checkbox_label': self.clear_checkbox_label,
        }
        template = '%(input)s'
        substitutions['input'] = super(ClearableFileInput, self).render(name, value, attrs)

        check_required = True
        if self.is_initial(value):
            template = self.template_with_initial
            substitutions.update(self.get_template_substitution_values(value))
        elif not self.is_initial(value) and hasattr(value, name):
            template = self.template_with_session
            substitutions.update({'initial': conditional_escape(value.name)})
        else:
            check_required = False

        if check_required and self.is_required:
            checkbox_name = self.clear_checkbox_name(name)
            checkbox_id = self.clear_checkbox_id(checkbox_name)
            substitutions['clear_checkbox_name'] = conditional_escape(checkbox_name)
            substitutions['clear_checkbox_id'] = conditional_escape(checkbox_id)
            substitutions['clear'] = CheckboxInput().render(checkbox_name, False, attrs={'id': checkbox_id})
            substitutions['clear_template'] = self.template_with_clear % substitutions

        return mark_safe(template % substitutions)




