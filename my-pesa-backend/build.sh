#!/usr/bin/env bash
# exit on error
set -o errexit

pip install django
pip install boto3
pip install django-storages
pip install djangorestframework
pip install Pillow
pip install python-decouple
pip install python-dotenv
pip install gunicorn
pip install django-cors-headers
pip install psycopg2

python manage.py collectstatic --no-input
