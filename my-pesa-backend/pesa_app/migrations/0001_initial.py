# Generated by Django 4.1.6 on 2023-02-11 10:03

from django.db import migrations, models
import pesa_app.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=pesa_app.models.file_generate_upload_path)),
                ('upload_finished_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
