# A utility for creating Django json fixture from csv files

## Usage
To create a json fixture (called initial_data.json) from csv files in path/csv/:
```
$ python ./main.py [path]
```

To load the fixture to the database:
```
$ ./manage.py loaddata initial_data.json
```
