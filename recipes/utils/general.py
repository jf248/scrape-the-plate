from django.utils.deconstruct import deconstructible
from uuid import uuid4
import inflect
import os
import itertools


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
        u = uuid4().hex
        slug = getattr(instance, 'slug', None)
        filename = (slug or u[:4]) + '-' + u[:6]
        filename = '{}.{}'.format(filename, ext)
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
    if simple_only and singular not in phrase:
        singular = phrase
    return singular


def textarea_to_list(textarea):
    """
    Takes a string and returns list of lines, skipping blank lines
    """
    list_ = textarea.splitlines()
    return [x.strip() for x in list_ if x.strip() != '']


def list_to_grouped_list(list_):
    """
    Takes a list of strings. Groups by items starting with a #
    """
    result = []
    group = ''
    for item in list_:
        if item[0] == '#':
            group = item[1:]
            group = group.strip()
        else:
            result.append([group, item])
    return result


def grouped_list_to_list(grouped):
    """
    Takes a list of form [['group', 'item'], ...]
    Returns ['# group', 'item', ...]
    """
    result = []
    group = ''
    for pair in grouped:
        if not pair[0] == group:
            group = pair[0]
            result.append('# ' + group)
        result.append(pair[1])
    return result


def tuples_to_dict(tuples):
    """
    Takes a list of tuples with group names as the second item.
    Returns a dictionary of lists.
    """
    result = {}
    groups = itertools.groupby(tuples, lambda x: x[1])
    for group in groups:
        name = group[0]
        result[name] = [x[0] for x in group[1]]
    return result


def group_dicts(dicts, group_key):
    result = []
    groups = itertools.groupby(dicts, lambda x: x[group_key])
    for group in groups:
        name = group[0]
        tuple_ = (name, list(group[1]))
        result.append(tuple_)
    return result

# def uuid_with_slugify(text, remove=False):
#     """
#     Generates a slug and adds first few characters of a UUID to start.
#     If remove is True, reverses yielding the raw slug.
#     """
#     uuid_characters = 4
#     if remove:
#         return text[uuid_characters + 2:]
#     else:
#         slug = slugify(text, allow_unicode=False)
#         u = uuid4().hex
#         slug = u[:uuid_characters] + '-' + slug
#         return slug
