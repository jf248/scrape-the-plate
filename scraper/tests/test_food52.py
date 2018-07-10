# flake8: noqa
import os
import unittest

from scraper.food52 import Food52


class TestFood52(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(
            path,
            'test_data',
            'food52.testhtml'
        )) as file_opened:
            self.scraper_class = Food52(file_opened, test=True)

    def test_domain(self):
        self.assertEqual(
            'food52.com',
            self.scraper_class.domain()
        )

    def test_title(self):
        self.assertEqual(
            self.scraper_class.title(),
            "Easy Vegetable Nori Wraps"
        )

    def test_serves(self):
        self.assertEqual(
            self.scraper_class.serves(),
            None
        )

    def test_total_time(self):
        self.assertEqual(
            self.scraper_class.total_time(),
            None
        )

    def test_ingredients(self):
        self.assertEqual(
            [
                {'text': "6 unseasoned nori sheets"},
                {'text': "1 bag bagged baby spinach, rinsed and drained"},
            ],
            self.scraper_class.ingredients()
        )

    def test_preparation(self):
        return self.assertEqual(
            [
                "On a cutting board, lay a nori sheet down with the long, horizontal side towards you. The “dull” (not “shiny”) side of the nori sheet should be facing up.",
                "Lay all of the ingredients on the lower third of the nori sheet (I like to do it in the order in which ingredients are listed above ^^). Drizzle generously with your favorite goma/nutty dressing. Roll it up, and enjoy! Easy peasy.",
            ],
            self.scraper_class.preparation()
        )
