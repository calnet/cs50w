from rest_framework import serializers
from .models import BankAccount


class BankingSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankAccount
        fields = '__all__'
