from django.db import models
import pathlib
from uuid import uuid4
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from random import randint
import uuid
from rest_framework.authtoken.models import Token

def file_generate_name(original_file_name):
    extension = pathlib.Path(original_file_name).suffix

    return f"{uuid4().hex}{extension}"


def file_generate_upload_path(instance, filename):
    return f"files/{instance.file_name}"

def logo_path(instance, name):
    return f"files/{instance.name}"

def generate_credit_card():
    card = str(uuid.uuid4().int)[:16]
    # return '-'.join(card[i:i+4] for i in range(0, len(card), 4))
    int_card = int(card)
    return int_card



class Image(models.Model):
    file = models.FileField(
        upload_to=file_generate_upload_path,
        blank=True,
        null=True
    )
    file_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.file_name


class Currency(models.Model):
    country = models.CharField(max_length=3, blank=True, null=True)
    rate = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.country


class Bank(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ForeignKey(Image, on_delete=models.CASCADE, blank=True, null=True)
    # currency = models.ForeignKey(Currency, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BankCard(models.Model):
    card = models.BigIntegerField(unique=True, editable=False, default=generate_credit_card)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.id}"


class SingleAccount(models.Model):
    balance = models.IntegerField(null=True, blank=True, default=500)
    bank_number = models.OneToOneField(BankCard, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    

    def __str__(self):
        return f"{self.bank_number.bank.name} - KES {self.balance}"


# @receiver(post_save, sender=User)
# def create_customer_account(sender, instance, created, **kwargs):
#     if created:
#         Customer.objects.create(user=instance)
#         Token.objects.create(user=instance)

#     instance.customer.save()

# @receiver(post_save, sender=Bank)
# def create_account_number(sender, created, **kwargs):
#     account_digits = None
#     for i in range(16):
#         account_digits = randint(0,9)
#     if created:
#         AccountNumber.objects.create(account_number=account_digits)
#     instance.account.save()