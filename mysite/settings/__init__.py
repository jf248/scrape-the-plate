# If no settings module specified in the environment variable, Django defaults
# to import this module settings/__init__.py. This __init__ module therefore
# imports the development settings found in settings/dev.py

from .dev import *  # noqa: F403, F401
