from recipes.utils import general
from recipes.models import ModelHelper, GroceryItem, GroceryPhrase


class GroceryMatcher(object):

    @staticmethod
    def match(ingredients):
        """
        Matches ingredients to grocery items. Finds longest matching common
        string in either GroceryItem names or GroceryPhrase texts.

        Args:
            ingredients: A string with individual ingredients seperated by new
            lines.

        Returns:
            List of dicts:
            [
            { 'group': <the ingredient's group>,
              'text': <the full ingredient text>,
              'grocery_item': GroceryItem or None,
              'grocery_phrase': a string or None},
             {...},
             ...
            ]
        """
        grocery_items = ModelHelper.get_all(GroceryItem)
        grocery_phrases = ModelHelper.get_all(GroceryPhrase)
        result = GroceryMatcherHelper.match(ingredients, grocery_items,
                                            grocery_phrases)

        return result


class GroceryMatcherHelper(object):

    @staticmethod
    def match(ingredients, grocery_items, grocery_phrases):
        """
        Functional core of GroceryMathcer.match().
        Matches ingredients to grocery items.
        """
        ingredients = general.textarea_to_list(ingredients)
        ingredients = general.list_to_grouped_list(ingredients)
        result = [{'group': x[0], 'text': x[1]} for x in ingredients]
        # Loop through each dictionary in result and match the ingrdient text
        for d in result:
            match = GroceryMatcherHelper._match(d['text'], grocery_items,
                                                grocery_phrases)
            d.update(match)
        return result

    @staticmethod
    def _longest_match(text, objects, field):
        # Finds the object in 'objects' that has the longest 'field' value
        # which is contained in 'text'
        match = None
        current_len = 0
        for obj in objects:
            value = getattr(obj, field).lower()
            if value in text and len(value) > current_len:
                match = obj
                current_len = len(value)
        return match

    @staticmethod
    def _match(text, grocery_items, grocery_phrases):
        text = text.lower()

        # Search for a match in 'name' field of grocery_items
        grocery_item = GroceryMatcherHelper._longest_match(
            text, grocery_items, 'name')

        # Search for a match in the 'text' field of grocery_phrases
        phrase = GroceryMatcherHelper._longest_match(
            text, grocery_phrases, 'text')

        # Use longest phrase or grocery_item
        len_phrase = len(getattr(phrase, 'text', ''))
        len_grocery_item = len(getattr(grocery_item, 'name', ''))
        if len_phrase > len_grocery_item:
            grocery_item = phrase.grocery_item
            phrase = phrase.text
        else:
            phrase = getattr(grocery_item, 'name', None)

        return {'grocery_item': grocery_item, 'grocery_phrase': phrase}

    @classmethod
    def get_grocery(cls, ingredients):
        """
        Takes a string (with ingredients seperated by new lines).
        Finds any GroceryItem or GroceryPhrase objects that match.
        Returns a list of dictionaries of each ingredient:
        [{'text':, 'grocery_item':, 'grocery_phrase':},]
        """
        ingredients = general.textarea_to_list(ingredients)
        result = [{'text': x} for x in ingredients]
        grocery_items, grocery_phrases = ModelHelper.get_all(
            models=[GroceryItem, GroceryPhrase])

        # Loop through each dictionary in result and match the ingredient text
        for d in result:
            match = cls._match(d['text'], grocery_items, grocery_phrases)
            d.update(match)

        return result
