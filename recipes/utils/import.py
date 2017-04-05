import csv
import json
import ast

CSV_FILES = [
    '../../initial_data/ingredientgroup.csv',
    '../../initial_data/ingredient.csv',
]
JSON_FILE = '../../initial_data/file.json'

list_ = []

for csv_file in CSV_FILES:
    with open(csv_file, 'r') as c:
        reader = csv.reader(c)

        field_names = []


        # Loop through rows.
        for i, row in enumerate(reader):

            if i == 0:
                # Check first two headers are model and pk
                if not row[0:2] == ["model", "pk"]:
                    raise ValueError(
                        "First two headers are %s. Should be ['model', "
                        "'pk'].")

                # Get field names. First two columns are model and pk, all the rest are
                # field names
                field_names = row[2:]

            else:
                # Create new object
                instance = dict()

                # Add model and pk
                instance['model'] = row[0]
                instance['pk'] = ast.literal_eval(row[1])

                # Create fields object
                fields = instance['fields'] = dict()
                for j, field in enumerate(row[2:]):
                    try:
                        fields[field_names[j]] = ast.literal_eval(field)
                    except:
                        fields[field_names[j]] = field
                list_.append(instance)

with open(JSON_FILE, 'w') as json_file:
    # Dump to JSON
    json.dump(list_, json_file, sort_keys=True, indent = 4)
