run:
	python manage.py runserver localhost:8000

make:
	python manage.py makemigrations pesa_app

migrate:
	python manage.py migrate

freeze:
	pip freeze > requirements.txt

drop:
	dropdb my_pesa

create:
	createdb my_pesa

admin:
	python manage.py createsuperuser --username admin --email admin@admin.com

env:
	source virtual/Scripts/activate
