from .default import *  # noqa: F403


DEBUG = True
ALLOWED_HOSTS = []
MIDDLEWARE.append('mysite.middleware.dev_cors_middleware')  # noqa: F405

"""
LOGGING = {
    'version': 1,
    'disable_existing_handlers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
    },
}
"""
