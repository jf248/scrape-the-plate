"""
Utility functions and mixins used in tests.
"""

from PIL import Image
from django.contrib.sessions.backends.base import SessionBase
from django.core.files import File
from django.test import RequestFactory
from django.urls import resolve
from io import BytesIO
from unittest.mock import MagicMock


class RouteTesterMixin(object):
    """
    Mixin for testing urls resolve correctly
    """

    def route_test(self, url, view, name=None, kwargs={}):
        response = resolve(url)

        # view may be a function or class-based view
        if hasattr(response.func, 'view_class'):
            self.assertEqual(response.func.view_class, view)
        else:
            self.assertEqual(response.func, view)

        if name:
            self.assertEqual(response.view_name, name)

        if kwargs:
            self.assertEqual(response.kwargs, kwargs)


class TestHelper(object):

    @staticmethod
    def get_image_file(
            name='test.png', ext='png',
            size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return File(file_obj, name=name)


class FormTesterMixin(object):
    """
    Mixin for testing form's generate expected errors.
    """

    def assertFormError(self, form_cls, expected_error_name,
                        expected_error_msg, data):

        test_form = form_cls(data=data)
        self.assertFalse(test_form.is_valid())

        self.assertEquals(
            test_form.errors[expected_error_name],
            expected_error_msg,
        )


class SessionFactory(object):
    """
    Factory class for creating mock session objects. Use instead of mocking
    with a simple to mock session attributes e.g. session.modified.
    """

    def _getitem(self, name):
        return self.dict_[name]

    def _setitem(self, name, val):
        self.dict_[name] = val

    def create_session(self, spec=SessionBase):
        session = MagicMock(spec=spec)
        self.dict_ = {}
        session.__getitem__.side_effect = self._getitem
        session.__setitem__.side_effect = self._setitem
        return session


class ViewTesterMixin(object):
    """
    Mixin to be used with a django.tests.TestCase object.
    """

    @staticmethod
    def setup_generic_view(view, request, *args, **kwargs):
        """
        Helper function to allow unit testing of class-based views.
        Mimic as_view() returned callable, but returns view instance.
        args and kwargs are the same as you would pass to reverse()
        http://tech.novapost.fr/django-unit-test-your-views-en.html
        """
        view.request = request
        view.args = args
        view.kwargs = kwargs
        return view

    def assertCorrectResponse(self, view_func, kwargs={},
                              expected_text_list=[], status_code=200,
                              html=False):
        """
        Wrapper round assertContains. Sets up a request and gets a response for
        the view_func and test that all items in expected_text_list are present
        in the reponse.
        """

        request = RequestFactory().get('')
        request.session = SessionFactory().create_session()
        response = view_func(request, **kwargs)

        # Force the reponse to be rendered. Will produce error if e.g. template
        # doesn't exist
        response.render()

        if expected_text_list:
            for expected_text in expected_text_list:
                self.assertContains(response, expected_text,
                                    status_code=status_code, html=html)
        else:
            # Just test status code
            self.assertEqual(response.status_code, status_code)


class ModelTesterMixin:
    """
    Mixin for model testing.
    """

    def assertMeta(self, model_cls, required_fields, unique_fields, ordering):
        """
        Tests on model meta to ensure not changed accidentally.
        """

        # (Note: Set up lists to be checked rather than loops that
        # fail-on-first.)

        # Required fields
        required_fields_with_blank_true = [
            f for f in required_fields
            if model_cls._meta.get_field(f).blank
        ]

        self.assertEqual(required_fields_with_blank_true, [],
                         'Required fields don''t match')

        # Unique fields
        unique_fields_with_unique_false = [
            f for f in unique_fields
            if not model_cls._meta.get_field(f).unique
        ]

        self.assertEqual(unique_fields_with_unique_false, [],
                         'Unique fields don''t match')

        # Ordering
        self.assertEqual(model_cls._meta.ordering, ordering,
                         'Ordering doesn''t match')
