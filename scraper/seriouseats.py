from ._abstract import AbstractScraper
from ._utils import normalize_string


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
        return None

    def image(self):
        return self.soup.find(id="recipe-gallery-frame").find('img')['src']

    def total_time(self):
        return None
