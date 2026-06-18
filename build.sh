#!/bin/bash
set -e  # Exit on any error

# Activate virtual environment if exists
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
fi

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Build frontend
echo "Building frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build
cd ..

# Copy frontend index.html to Django templates
mkdir -p backend/templates
cp frontend/dist/index.html backend/templates/index.html

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