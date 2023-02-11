from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Image)
admin.site.register(Bank)
admin.site.register(Currency)
admin.site.register(Customer)
admin.site.register(BankCard)
admin.site.register(SingleAccount)