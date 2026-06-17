#!/bin/bash
set -e  # Exit on any error

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Create a superuser if not exists (optional, for development)
# echo "Creating superuser..."
# python manage.py createsuperuser --noinput --email admin@example.com --username admin || true

echo "Build process completed."