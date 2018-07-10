import requests
from bs4 import BeautifulSoup

from ._utils import on_exception_return
from .exceptions import URLError, RequestException

# some sites close their content for 'bots', so user-agent must be supplied
HEADERS = {
    'User-Agent': ('Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7'
                   ') Gecko/2009021910 Firefox/3.0.7')
}


class AbstractScraper():

    def __getattribute__(self, name):
        """
        Decorate custom methods to handle exceptions as we want and as we
        specify in the "on_exception_return" method decorator
        """
        to_return = None
        decorated_methods = [
            'image',
            'ingredients',
            'links',
            'preparation',
            'serves',
            'title',
            'total_time',
        ]
        if name in decorated_methods:
            return on_exception_return(to_return)(
                object.__getattribute__(self, name))

        return object.__getattribute__(self, name)

    def __init__(self, url, test=False):
        if test:  # when testing, we load a file
            with url:
                self.soup = BeautifulSoup(
                    url.read(),
                    "html.parser"
                )
        else:
            self.soup = BeautifulSoup(
                self._request(url),
                "html.parser"
            )
        self.url = url

    @staticmethod
    def _request(url):
        try:
            r = requests.get(url, headers=HEADERS)
        except requests.exceptions.RequestException:
            raise RequestException("Unable to make the request.")

        if not r.ok:
            raise URLError(
                "Can't scrape the url. Check it's valid and try again."
            )

        return r.text

    def url(self):
        return self.url

    @staticmethod
    def domain():
        """ get the host of the url, so we can use the correct scraper """
        raise NotImplementedError("This should be implemented.")

    def title(self):
        raise NotImplementedError("This should be implemented.")

    def total_time(self):
        """ total time it takes to preparate the recipe in minutes """
        raise NotImplementedError("This should be implemented.")

    def ingredients(self):
        raise NotImplementedError("This should be implemented.")

    def preparation(self):
        raise NotImplementedError("This should be implemented.")

    def image(self):
        raise NotImplementedError("This should be implemented.")

    def links(self):
        invalid_href = ('#', '')
        links_html = self.soup.findAll('a', href=True)

        return [
            link.attrs
            for link in links_html
            if link['href'] not in invalid_href
        ]

    def to_dict(self):
        dict_ = {}
        methods = [
            'domain',
            'image',
            'ingredients',
            'preparation',
            'serves',
            'title',
            'total_time',
        ]
        for method in methods:
            try:
                result = getattr(self, method)()
                if result is not None:
                    dict_[method] = getattr(self, method)()
            except NotImplementedError:
                pass
        dict_['url'] = self.url
        return dict_
