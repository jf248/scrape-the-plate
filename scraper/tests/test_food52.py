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
            6
        )

    def test_prep_time(self):
        self.assertEqual(
            self.scraper_class.prep_time(),
            5
        )

    def test_cook_time(self):
        self.assertEqual(
            self.scraper_class.cook_time(),
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
    def test_notes(self):
        self.assertEqual(
            self.scraper_class.notes(),
            "Author Notes: I eat this not recipe throughout the summer when it’s so hot you can barely breathe and you have little to no appetite. I usually use a sesame (goma) dressing, but any nutty, soy-inflected dressing would work well."
        )

    def test_image(self):
        self.assertEqual(
            self.scraper_class.image(),
            'https://images.food52.com/r-s3gm-0dpxVdtcs3ie7cDs_qE0=/753x502/4432ed40-e013-4861-b98a-2aae169a8649--2018-0626_easy-summer-wraps_3x2_ty-mecham_001.jpg'
        )
