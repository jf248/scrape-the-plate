from ._abstract import AbstractScraper
from ._utils import normalize_string, get_minutes, get_serves
import re


class Food52(AbstractScraper):

    @staticmethod
    def domain():
        return 'food52.com'

    def title(self):
        text = self.soup.find(class_="article-header-title").get_text()
        return normalize_string(text)

    def ingredients(self):
        ingredients = self.soup.find(
            'ul',
            {'class': 'recipe-list'}
        ).findAll('li')

        return [
            {'text': normalize_string(ingredient.get_text())}
            for ingredient in ingredients
        ]

    def preparation(self):
        prep_steps = self.soup.find(
            'ol'
        ).findAll(
            'li'
        )

        return [
            normalize_string(prep_step.get_text())
            for prep_step in prep_steps
        ]

    def serves(self):
        raw_serves = self.soup.find(text=re.compile('Makes:'))
        return get_serves(raw_serves)

    def image(self):
        return self.soup.find(id="recipe-gallery-frame").find('img')['src']

    def prep_time(self):
        raw_prep_time = self.soup.find(text=re.compile('Prep time'))
        return get_minutes(raw_prep_time)

    def cook_time(self):
        return None

    def notes(self):
        raw_note = self.soup.find('span', {'class': 'recipe-note'})
        return normalize_string(raw_note.get_text())
