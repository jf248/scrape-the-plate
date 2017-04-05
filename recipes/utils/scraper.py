import io

from bs4 import BeautifulSoup
import requests
import re
import os
from django.conf import settings

FILE = ''

def get_scraper(url, base_url):
    if base_url == "https://food52.com":
        return ScraperFood52(url)


class ScraperBase:

    data = dict()
    image = dict()

    def __init__(self, url):
        if FILE:
            with open(FILE, 'r') as f:
                page = f.read()
        else:
            page = requests.get(url)
            page = page.content
        self.soup = BeautifulSoup(page, 'html.parser')

    # def get_image(self, url):
    #     r = requests.get(url, stream=True)
    #     if r.status_code == 200:
    #         b = io.BytesIO()
    #         for chunk in r:
    #             b.write(chunk)
    #         b.seek(0)
    #         self.image['file'] = b
    #         i = url.rfind("/")
    #         if i == -1:
    #             self.image['name'] = url
    #         else:
    #             self.image['name'] = url[i + 1:]

    @staticmethod
    def tidy(text):
        text = text.strip()
        text = re.sub('\n', ' ', text)
        text = re.sub(' +', ' ', text)
        return text


class ScraperFood52(ScraperBase):

    def __init__(self, url):
        super(ScraperFood52, self).__init__(url)
        soup = self.soup

        # xpath '//*[@class="article-header-title"][1]/text()'
        name = soup.find(class_="article-header-title")
        if name:
            name = self.tidy(name.text)
            self.data['name'] = name

        # xpath '//li[@itemprop="ingredients"]'
        ingredients = soup.find_all('li', itemprop="ingredients")
        if ingredients:
            ingredients = [self.tidy(x.text) for x in ingredients]
            self.data['ingredients'] = '\n'.join(ingredients)

        # xpath '//li[@itemprop="recipeInstructions"]/text()'
        preparation = soup.find_all('li', itemprop="recipeInstructions")
        if preparation:
            preparation = [self.tidy(x.text) for x in preparation]
            self.data['preparation'] = '\n\n'.join(preparation)

        # xpath '//*[@itemprop="recipeYield"][1]/*/text()'
        serves = soup.find(itemprop="recipeYield")
        if serves:
            self.data['serves'] = int(re.search(r'\d+', serves.text)[0])

        # No prep_time

        # image
        url = soup.find(id="recipe-gallery-frame").find('img')['src']
        if url:
            self.data['scraped_image_url'] = url

if __name__ == '__main__':
    RECIPE_URL = 'https://food52.com/recipes/65423-baked-penne-with-butternut-sage-sauce'
    FILE = 'food52.html'
    scraper = ScraperFood52(FILE)
    print(
        scraper
    )