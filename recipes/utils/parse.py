from recipes.models import Ingredient, IngredientPhrase


def parse_ingredient_text(ingredient_text, model_objects, phrase_objects,
                          foreign_key):
    """
    Takes an ingredient_text, e.g. '10 ounces red onion, chopped'.
    Finds the longest phrase that matches a model_object.name or
    phrase_object.text. i.e. will match 'red onion' not, the shorter,
    'onion'.
    foreign_key is the models.ForeignKey field that relates the
    phrase_objects to model_objects, e.g. 'ingredient' for IngredientPhrase.
    Returns an Ingredient object and IngredientPhrase.text
    """
    ing = None
    phrase = ''

    def match(ingredient_text, search_list):
        # Find the longest phrase in phrases list that is contained in 'text'
        current_match = ''
        current_len = 0
        for s in search_list:
            if s in ingredient_text and len(s) > current_len:
                current_match = s
                current_len = len(current_match)
        return current_match

    # Search for a match in 'name' field of model_objects
    model_object_names = model_objects.values_list('name', flat=True)
    match_name = match(ingredient_text, model_object_names)

    # Search for a match in 'text' field of phrase_objects
    phrases = IngredientPhrase.objects.values_list(
        'text', flat=True)
    match_phrase = match(ingredient_text, phrases)

    if len(match_phrase) > len(match_name):
        phrase_object = phrase_objects.get(text=match_phrase)
        ing = getattr(phrase_object, foreign_key)
        phrase = match_phrase
    elif match_name != '':
        ing = model_objects.get(name=match_name)
        phrase = match_name

    return ing, phrase
