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
    
    logo = ImageSerializer()
    
    class Meta:
        model = Bank
        fields = '__all__'


class BankCardSerializer(serializers.ModelSerializer):

    bank = BankSerializer(read_only=True)
    bank_id = serializers.PrimaryKeyRelatedField(queryset=Bank.objects.all(), source='bank')
 
    class Meta:
        model = BankCard
        fields = ('id', 'card', 'bank', 'bank_id')


class SingleAccountSerializer(serializers.ModelSerializer):

    bank_number = BankCardSerializer(read_only=True)
    bank_number_id = serializers.PrimaryKeyRelatedField(queryset=BankCard.objects.all(), source='bank_number')
 
    class Meta:
        model = SingleAccount
        fields = ('id', 'balance', 'bank_number', 'customer', 'bank_number_id')