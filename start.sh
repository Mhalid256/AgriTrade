#!/bin/bash
echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
gunicorn djecommerce.wsgi:application --bind 0.0.0.0:8080

# Temporary change to force Git commit
