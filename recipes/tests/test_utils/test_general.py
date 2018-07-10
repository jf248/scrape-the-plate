from django.test import TestCase
from unittest.mock import MagicMock
import re

from recipes.utils import general


class PathAndRenameTests(TestCase):

    def test_returns_correct_filename_slug(self):

        obj = general.path_and_rename('path')
        result = obj(MagicMock(slug='slug'), filename='file.png')

        pattern = r'path/slug-(\w{6})\.png'

        self.assertIsNotNone(
            re.match(pattern, result),
            msg='Should match pattern path/slug-XXXXXX.png'
        )

    def test_returns_correct_filename_no_slug(self):

        obj = general.path_and_rename('path')
        result = obj(MagicMock(slug=None), filename='file.png')

        pattern = r'path/(\w{4})-(\w{6})\.png'

        self.assertIsNotNone(
            re.match(pattern, result),
            msg='Should match pattern path/XXXX-XXXXXX.png'
        )


class GeneralTest(TestCase):

    def test_capitalize_correct(self):
        phrase = "   josh's toMatoes   "
        expected = "Josh's Tomatoes"

        self.assertEqual(general.capitalize_correct(phrase), expected)

    def test_singular_lower_stripped(self):
        phrase = "  Green Beans  "
        expected = "green bean"

        self.assertEqual(general.singular_lower_stripped(phrase), expected)
        self.assertEqual(general.singular_lower_stripped(phrase, True),
                         expected)

        phrase = " Loaves of bread   "
        expected = "loaves of bread"

        self.assertEqual(general.singular_lower_stripped(phrase, True),
                         expected)

    def test_textarea_to_list(self):
        textarea = "  line one \r\r\r  line two \r\r   "
        expected = ['line one', 'line two']

        self.assertEqual(general.textarea_to_list(textarea), expected)

        textarea = "line one"
        expected = ['line one']

        self.assertEqual(general.textarea_to_list(textarea), expected)

    def test_list_to_grouped_list(self):
        _list = [
            'first thing',
            '# Group 1',
            'second thing',
            'third thing',
        ]
        expected = [
            ['', 'first thing'],
            ['Group 1', 'second thing'],
            ['Group 1', 'third thing'],
        ]
        self.assertEqual(general.list_to_grouped_list(_list), expected)

    def test_grouped_list_to_list(self):
        grouped = [
            ['', 'first thing'],
            ['Group 1', 'second thing'],
            ['Group 1', 'third thing'],
        ]
        expected = [
            'first thing',
            '# Group 1',
            'second thing',
            'third thing',
        ]
        self.assertEqual(general.grouped_list_to_list(grouped), expected)

    def test_tuples_to_dict(self):
        tuples = [('a', 'Group 1'), ('b', 'Group 1'), ('c', 'Group 2')]
        expected = {'Group 1': ['a', 'b'], 'Group 2': ['c']}

        self.assertEqual(general.tuples_to_dict(tuples), expected)

    def test_group_dicts(self):
        dicts = [{'group': 'Group 1', 'name': 'a'},
                 {'group': 'Group 1', 'name': 'b'},
                 {'group': 'Group 2', 'name': 'c'}]
        expected = [
            ('Group 1', [
                {'group': 'Group 1', 'name': 'a'},
                {'group': 'Group 1', 'name': 'b'}
            ]),
            ('Group 2', [
                {'group': 'Group 2', 'name': 'c'}
            ])
        ]

        self.assertEqual(general.group_dicts(dicts, 'group'), expected)
