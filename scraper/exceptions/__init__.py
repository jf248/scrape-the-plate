class URLError(Exception):
    '''Error for when request doesn't return a valid response.'''


class InvalidURLError(Exception):
    '''Error for when request doesn't return a valid response.'''


class RequestException(Exception):
    '''Error for when request doesn't return a valid response.'''


class WebsiteNotImplementedError(NotImplementedError):
    '''Error for when the website is not supported by this library.'''
