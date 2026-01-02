#!/bin/bash
# Run Django admin server on localhost with full static files support

cd "$(dirname "$0")" || exit 1

# Create necessary directories
mkdir -p staticfiles

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

# Run development server
echo "Starting Django admin on http://localhost:8000"
echo "Login with: sudo / Cowboys@123"
echo ""
python manage.py runserver 0.0.0.0:8000
