import os
import dj_database_url
from .base import *

# Override specific settings for Railway deployment
DEBUG = False

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',
    '.up.railway.app',
    '*',  # Temporary - remove this later for security
]

# Ensure ROOT_URLCONF is set (this should come from base.py, but let's be explicit)
ROOT_URLCONF = 'djecommerce.urls'

# Database - Railway provides PostgreSQL
DATABASES = {
    'default': dj_database_url.parse(
        os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3')
    )
}

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static_in_env')]

# Add WhiteNoise middleware for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# Environment variables
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key-change-this')
STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY', '')
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY', '')

# Remove debug toolbar from production
try:
    INSTALLED_APPS.remove('debug_toolbar')
except ValueError:
    pass

try:
    MIDDLEWARE.remove('debug_toolbar.middleware.DebugToolbarMiddleware')
except ValueError:
    pass

# Ensure WSGI application is set
WSGI_APPLICATION = 'djecommerce.wsgi.application'

# Default auto field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'