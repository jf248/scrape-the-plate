import os
import dj_database_url

from .default import *  # noqa: F403


DEBUG = False
ALLOWED_HOSTS = ['.scrape-the-plate.herokuapp.com']

# Add storages app
INSTALLED_APPS += ['storages']  # noqa: F405


# React
# --------------------------------------------------------
REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')  # noqa: F405
STATICFILES_DIRS = [
    ('frontend', os.path.join(REACT_APP_DIR, 'build')),
]

# Static files settings
# --------------------------------------------------------
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')


STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

STATICFILES_STORAGE = 'mysite.settings.custom_storage.StaticStorage'
DEFAULT_FILE_STORAGE = 'mysite.settings.custom_storage.MediaStorage'

STATIC_URL = (
    'http://' + AWS_STORAGE_BUCKET_NAME + '.s3.amazonaws.com/static/'
)
MEDIA_URL = 'http://' + AWS_STORAGE_BUCKET_NAME + '.s3.amazonaws.com/media/'


# Heroku database settings
# --------------------------------------------------------
# Update database configuration with $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)  # noqa: F405


# HTTP Routing settings
# --------------------------------------------------------
# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
