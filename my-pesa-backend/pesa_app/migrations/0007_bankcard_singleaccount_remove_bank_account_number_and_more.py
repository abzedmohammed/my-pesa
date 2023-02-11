# Generated by Django 4.1.6 on 2023-02-11 21:01

from django.db import migrations, models
import django.db.models.deletion
import pesa_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('pesa_app', '0006_accountnumber_remove_bank_account_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BankCard',
            fields=[
                ('card', models.IntegerField(default=pesa_app.models.generate_credit_card, editable=False, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='SingleAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.IntegerField(blank=True, default=5000, null=True)),
                ('bank_account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='pesa_app.bankcard')),
            ],
        ),
        migrations.RemoveField(
            model_name='bank',
            name='account_number',
        ),
        migrations.RemoveField(
            model_name='bank',
            name='balance',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='bank',
        ),
        migrations.AlterField(
            model_name='customer',
            name='avatar',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pesa_app.image'),
        ),
        migrations.AlterField(
            model_name='image',
            name='file',
            field=models.FileField(blank=True, default='https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png', null=True, upload_to=pesa_app.models.file_generate_upload_path),
        ),
        migrations.DeleteModel(
            name='AccountNumber',
        ),
        migrations.AddField(
            model_name='singleaccount',
            name='customer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='pesa_app.customer'),
        ),
        migrations.AddField(
            model_name='bankcard',
            name='bank',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pesa_app.bank'),
        ),
    ]
