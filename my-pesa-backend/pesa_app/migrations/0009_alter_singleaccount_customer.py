# Generated by Django 4.1.6 on 2023-02-11 21:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pesa_app', '0008_alter_bankcard_card'),
    ]

    operations = [
        migrations.AlterField(
            model_name='singleaccount',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pesa_app.customer'),
        ),
    ]