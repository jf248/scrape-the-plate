import inflect
import os
from uuid import uuid4
from django.utils.deconstruct import deconstructible


@deconstructible
class path_and_rename(object):
    """
    Callable for models.FileField.upload_to. Takes a path and saves to
    path with random file name.
    http://stackoverflow.com/questions/15140942/django-imagefield-change-file-name-on-upload
    """

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # get filename (random string)
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.sub_path, filename)

def capitalize_correct(phrase):
    """
    Capitalizes words in a string, avoiding possessives being capitalized
    """
    phrase = phrase.strip()
    return " ".join(w.capitalize() for w in phrase.split())


def singular_lower_stripped(phrase, simple_only=False):
    """
    Takes a string, strips whitespaces, puts into lower case and makes it
    singular. E.g. " Green Beans " would return "green bean".

    Setting simple_only=True leaves plurals such as "loaves", where the
    singular "loaf" is not a sub-string, as is.
    """
    phrase = phrase.lower()
    phrase = phrase.strip()
    p = inflect.engine()
    singular = p.singular_noun(phrase) or phrase
    if simple_only and phrase not in singular:
            singular = phrase
    return singular


def list_from_textarea(textarea):
    """
    Takes a string and returns list of lines, skipping blank lines
    """
    l = textarea.splitlines()
    return [x.strip() for x in l if x != '']









