from mixer.backend.django import Mixer
from unittest.mock import patch, call
from unittest import TestCase

from recipes.models import GroceryItem, GroceryPhrase
from recipes.utils.match import GroceryMatcherHelper, GroceryMatcher


class GroceryMatcherHelperTests(TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up a mixer that doesn't hit database
        mixer = Mixer(commit=False)
        names = ['onion', 'red onion', 'milk']
        cls.grocery_items = mixer.cycle(3).blend(
            GroceryItem, name=(name for name in names)
        )
        cls.grocery_phrases = mixer.cycle(3).blend(GroceryPhrase)
        cls.grocery_phrases[1].text = 'cow milk'
        cls.grocery_phrases[1].grocery_item = cls.grocery_items[2]

    def test_match_can_match_grocery_item(self):
        text = '100g red onions chopped'
        expected = [{
            'group': '',
            'text': text,
            'grocery_item': self.grocery_items[1],
            'grocery_phrase': 'red onion'
        }]

        result = GroceryMatcherHelper.match(
            text, self.grocery_items, self.grocery_phrases)

        self.assertEqual(result, expected)

    def test_match_can_match_grocery_phrase(self):
        text = '100ml cow milk, warmed'

        expected = [{
            'group': '',
            'text': text,
            'grocery_item': self.grocery_items[2],
            'grocery_phrase': 'cow milk'}]

        result = GroceryMatcherHelper.match(text, self.grocery_items,
                                            self.grocery_phrases)

        self.assertEqual(result, expected)

    def test_match_returns_none_if_no_match(self):
        expected = [{
            'group': '',
            'text': 'test',
            'grocery_item': None,
            'grocery_phrase': None}]
        result = GroceryMatcherHelper.match('test', [], [])

        self.assertEqual(result, expected)


class GroceryMatcherTests(TestCase):

    @patch('recipes.utils.match.ModelHelper', autospec=True)
    @patch('recipes.utils.match.GroceryMatcherHelper', autospec=True)
    def test_match(self, m_matcher, m_helper):
        m_helper.get_all.return_value = 'all'
        m_matcher.match.return_value = 'result'

        result = GroceryMatcher.match('ingredients')

        self.assertEqual(result, 'result')
        calls = [call(GroceryItem), call(GroceryPhrase)]
        m_helper.get_all.assert_has_calls(calls)
        m_matcher.match.assert_called_with('ingredients', 'all', 'all')

    # def test_match_returns_list_of_dicts(self):
    #     """
    #     Integration test
    #     """
    #     ingredients = ' 100g red onions chopped \n\n Water \n\n'

    #     mixer = Mixer(commit=True)
    #     grocery_items = mixer.cycle(1).blend(GroceryItem)
    #     texts = ['onion', 'red onion', 'milk']
    #     grocery_phrases = mixer.cycle(3).blend(
    #         GroceryPhrase, text=(text for text in texts))
    #     grocery_phrase = grocery_phrases[1]
    #     grocery_phrase.grocery_item = grocery_items[0]
    #     grocery_phrase.save()

    #     expected = [
    #         {'text': '100g red onions chopped',
    #          'grocery_item': grocery_items[0],
    #          'grocery_phrase': 'red onion'},
    #         {'text': 'Water',
    #          'grocery_item': None,
    #          'grocery_phrase': None},
    #     ]

    #     result = GroceryMatcher.match(ingredients)

    #     self.assertEqual(result, expected)
