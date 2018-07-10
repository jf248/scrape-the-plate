from ._abstract import AbstractScraper
from ._utils import normalize_string, get_minutes, get_serves


class SeriousEats(AbstractScraper):

    @staticmethod
    def domain():
        return 'seriouseats.com'

    def title(self):
        text = self.soup.find(itemprop="name").get_text()
        return normalize_string(text)

    def ingredients(self):
        ingredients = self.soup.findAll(
            'li',
            {'itemprop': 'recipeIngredient'}
        )

        return [
            {'text': normalize_string(ingredient.get_text())}
            for ingredient in ingredients
        ]

    def preparation(self):
        prep_steps = self.soup.findAll(
            'div',
            {'class': "recipe-procedure-text"}
        )

        return [
            normalize_string(prep_step.get_text())
            for prep_step in prep_steps
        ]

    def serves(self):
        raw_serves = self.soup.find(
            'span',
            {'itemprop': 'recipeYield'}
        )
        return get_serves(raw_serves.get_text())

    def image(self):
        return self.soup.find(
            'img',
            {'itemprop': 'image'}
        )['src']

    def prep_time(self):
        raw_prep_time = self.soup.find(text='Active time:').findNext(
            'span',
            {'class': 'info'}
        )
        return get_minutes(raw_prep_time.get_text())

    def cook_time(self):
        raw_cook_time = self.soup.find(text='Total time:').findNext(
            'span',
            {'class': 'info'}
        )
        return get_minutes(raw_cook_time.get_text())

    def notes(self):
        raw_notes = self.soup.find(
            'div',
            {'class': 'recipe-introduction-body'}
        )
        return normalize_string(raw_notes.get_text())
