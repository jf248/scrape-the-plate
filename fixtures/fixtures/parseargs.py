import argparse
import os


def parse_args(args):

    # Get the current working directory
    cwd = os.getcwd()

    parser = argparse.ArgumentParser(
        description='Convert csv files to a json fixture file.')
    parser.add_argument(
        'path', default=cwd, nargs='?',
        help="""
                Directory where JSON fixture will be saved.
                Should have a './csv/' directory inside with the csv files to
                import.
                JSON fixure will be saved as './initial_data.json'.
                Leave blank for current working directory.
            """
    )
    return parser.parse_args(args)
