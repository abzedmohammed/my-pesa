# Generated by Django 4.1.6 on 2023-02-11 19:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pesa_app', '0005_alter_customer_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_account', models.IntegerField(blank=True, null=True, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='bank',
            name='account',
        ),
        migrations.AlterField(
            model_name='customer',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='bank',
            name='account_number',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='account', to='pesa_app.accountnumber'),
        ),
    ]
