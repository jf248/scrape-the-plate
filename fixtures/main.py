#!/usr/bin/env python
"""
Utility for creating json fixtures from csv files.

Do '$ ./main.py [path]' to create a json fixture (default name:
initial_data.json) from csv files in path/csv/.

Run '$ ./manage.py loaddata initial_data.json' to load fixtures
"""

import sys

from fixtures.parseargs import parse_args
from fixtures.csv import CsvToFixtureFactory


def main():
    args = parse_args(sys.argv[1:])
    CsvToFixtureFactory(args.path).create_fixture()
    print(
        """
        Finished! Run "$ ./manage.py loaddata {path}initial_data.json" to load
        fixtures
        """.format(path=args.path)
    )


if __name__ == "__main__":
    main()
