# flake8: noqa
import os
import unittest

from scraper.seriouseats import SeriousEats


class TestSeriousEats(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(
            path,
            'test_data',
            'seriouseats.testhtml'
        )) as file_opened:
            self.scraper_class = SeriousEats(file_opened, test=True)

    def test_domain(self):
        self.assertEqual(
            self.scraper_class.domain(),
            'seriouseats.com'
        )

    def test_title(self):
        self.assertEqual(
            self.scraper_class.title(),
            "Basic New York-Style Pizza Dough Recipe"
        )

    def test_serves(self):
        self.assertEqual(
            self.scraper_class.serves(),
            12
        )

    def test_prep_time(self):
        self.assertEqual(
            self.scraper_class.prep_time(),
            30
        )

    def test_cook_time(self):
        self.assertEqual(
            self.scraper_class.cook_time(),
            1440
        )

    def test_notes(self):
        self.assertEqual(
            self.scraper_class.notes(),
            ''
        )

    def test_ingredients(self):
        self.assertEqual(
            self.scraper_class.ingredients(),
            [
                {'text': '22.5 ounces (about 4 1/2 cups) bread flour, plus more for dusting'},
                {'text': '.5 ounces (about 1 1/2 tablespoons) sugar'},
                {'text': '.35 ounces kosher salt (about 1 tablespoon)'},
                {'text': '.35 ounces (about 2 teaspoons) instant yeast, such as SAF Instant Yeast'},
                {'text': '1.125 ounces Extra Virgin olive oil (about 3 tablespoons)'},
                {'text': '15 ounces lukewarm water'},
            ]
        )

    def test_preparation(self):
        return self.assertEqual(
            self.scraper_class.preparation(),
            [
                "Combine flour, sugar, salt, and yeast in bowl of food processor. Pulse 3 to 4 times until incorporated. Add olive oil and water. Run food processor until mixture forms ball that rides around the bowl above the blade, about 15 seconds. Continue processing 15 seconds longer.",
                "Transfer dough ball to lightly floured surface and knead once or twice by hand until smooth ball is formed. It should pass the windowpane test. Divide dough into three even parts and place each in a covered quart-sized deli container or in a zipper-lock freezer bag. Place in refrigerator and allow to rise at least 1 day, and up to 5. Remove from refrigerator, shape into balls, and allow to rest at room temperature for at least 2 hours before baking.",
            ]
        )

    def test_image(self):
        return self.assertEqual(
            self.scraper_class.image(),
            'https://www.seriouseats.com/recipes/images/2012/07/20110708-new-york-pizza-dough.jpeg'
        )
