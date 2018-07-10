from unittest import TestCase
from ..fixtures.csv import CsvToFixtureFactory as Factory
from ..fixtures.parseargs import parse_args
import os


class ParseArgsTests(TestCase):

    def test_no_args_return_cwd(self):
        args = []
        cwd = os.getcwd()

        args = parse_args(args)

        self.assertEqual(args.path, cwd)

    def test_passes_path(self):
        args = ['/path/']

        args = parse_args(args)

        self.assertEqual(args.path, '/path/')


class CsvToFixturerTests(TestCase):

    def setUp(self):
        self.raw_data = [
            {'model': 'app.model', 'pk': '1', 'name': 'name1', 'group': '1'},
            {'model': 'app.model', 'pk': '2', 'name': 'name 2', 'group': '1'},
        ]
        self.formatted_data = [
            {'model': 'app.model', 'pk': 1,
             'fields': {'name': 'name1', 'group': 1}},
            {'model': 'app.model', 'pk': 2,
             'fields': {'name': 'name 2', 'group': 1}},
        ]

    def test_create_fixture_writes_to_json_file(self):
        path = os.path.dirname(os.path.abspath(__file__))

        Factory(path + '/test_data').create_fixture(json_file='temp.json')

        filename = os.path.join(path, 'test_data', 'temp.json')
        with open(filename) as f:
            result = f.read()

        self.addCleanup(os.remove, filename)

        filename = os.path.join(path, 'test_data', 'initial_data.json')
        with open(filename) as f:
            expected = f.read()

        self.assertEqual(result, expected)
