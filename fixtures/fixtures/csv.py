import os
import json
import csv
import ast


class CsvToFixtureFactory(object):
    """
    Utility for converting initial data in CSV data into JSON format.

    Execute the classmethod create_fixture(path) to create json file in path
    from the csv files stored in path/csv/
    Do '$ ./fixtures.py [path]' to create a json fixture (default name:
    initial_data.json).

    Run 'manage.py loaddata initial_data.json' to load fixtures
    """

    def __init__(self, path):
        self.path = path

    @staticmethod
    def _get_csv_files(path):
        CSV_DIR = 'csv/'
        csv_path = os.path.join(path, CSV_DIR)

        if not os.path.exists(csv_path):
            raise ValueError('No "./csv/" directory in {}'.format(path))

        return sorted(
            [csv_path + f for f in os.listdir(csv_path) if '.csv' in f]
        )

    @staticmethod
    def _read_csv(csv_filepath):
        with open(csv_filepath, 'rt') as csv_file:
            reader = csv.DictReader(csv_file)
            data = [row for row in reader]
        if not data:
            raise ValueError(
                'CSV file, "{}", has no data'.format(csv_filepath))
        return data

    @staticmethod
    def _format_data(data, csv_filepath):
        # Takes a list of dicts.
        # Changes each dict to:
        # {'model':'', 'pk':'', 'fields': {...}}

        # Check for 'model' and 'pk' fields
        dict_ = data[0]
        if 'model' not in dict_ or 'pk' not in dict_:
            raise ValueError(
                'CSV file, "{}", doesn''t have'
                'model" or "pk" in the first row'.format(csv_filepath))

        def _format_dict(dict_):
            # Convert strings to integers
            for f in dict_:
                try:
                    dict_[f] = ast.literal_eval(dict_[f])
                except (SyntaxError, ValueError):
                    pass

            # Group extra fields
            new_dict = {'fields': {}}
            for f in dict_:
                if f == 'model' or f == 'pk':
                    new_dict[f] = dict_[f]
                else:
                    new_dict['fields'][f] = dict_[f]

            return new_dict

        return [_format_dict(d) for d in data]

    def create_fixture(self, json_file='initial_data.json'):

        list_ = []

        csv_files = self._get_csv_files(self.path)
        for csv_file in csv_files:
            data = self._read_csv(csv_file)
            data = self._format_data(data, csv_file)
            list_.extend(data)

        json_file = os.path.join(self.path, json_file)
        with open(json_file, 'w') as json_file:
            # Dump to JSON
            json.dump(list_, json_file, sort_keys=True, indent=4)
