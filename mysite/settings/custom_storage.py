"""
Custom storage objects to allow static and media files to use same S3 bucket in
different folders.
"""

from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = getattr(settings, 'STATICFILES_LOCATION', '')


class MediaStorage(S3Boto3Storage):
    location = getattr(settings, 'MEDIAFILES_LOCATION', '')
