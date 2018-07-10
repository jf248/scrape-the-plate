import re

from .exceptions import InvalidURLError, WebsiteNotImplementedError
from .food52 import Food52
from .seriouseats import SeriousEats


SCRAPERS = {
    Food52.domain(): Food52,
    SeriousEats.domain(): SeriousEats,
}


def _url_path_to_dict(path):
    pattern = (r'^'
               r'((?P<schema>.+?)://)'
               r'((?P<user>.+?)(:(?P<password>.*?))?@)?'
               r'(?:www.)?'
               r'(?P<domain>.*?)'
               r'(:(?P<port>\d+?))?'
               r'(?P<path>/.*?)'
               r'(?P<query>[?].*?)?'
               r'$'
               )
    regex = re.compile(pattern)
    matches = regex.match(path)
    url_dict = matches.groupdict() if matches is not None else None

    return url_dict


# TODO: change to test=False for production
def scrape(url_path, test=True):
    _dict = _url_path_to_dict(url_path)
    if _dict is None:
        raise InvalidURLError('Not a valid URL.')
    domain = _dict['domain']
    try:
        scraper = SCRAPERS[domain]
    except KeyError:
        raise WebsiteNotImplementedError(
            "Website ({}) is not supported".format(domain))

    return scraper(url_path, test).to_dict()


__all__ = ['scrape']
