from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class ImageSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Image
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.get('password', instance.password)
        instance.set_password(password)
        instance.save()
        return instance    
    
    class Meta:
        model = User
        exclude = ("last_login", "is_superuser", "is_staff", "is_active", "user_permissions", "groups")

class CurrencySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Currency
        fields = '__all__'

class BankSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Bank
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):

    user = UserSerializer()
 
    class Meta:
        model = Customer
        fields = '__all__'

class BankCardSerializer(serializers.ModelSerializer):

    bank = BankSerializer()
 
    class Meta:
        model = BankCard
        fields = '__all__'

class SingleAccountSerializer(serializers.ModelSerializer):

    bank_account = BankCardSerializer()
    customer = CustomerSerializer()
 
    class Meta:
        model = SingleAccount
        fields = '__all__'