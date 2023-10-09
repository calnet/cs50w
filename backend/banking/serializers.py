from rest_framework import serializers
from .models import BankAccount


class BankingSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankAccount
        fields = ['id', 'account_name', 'account_number', 'sort_code',
                  'created_at', 'updated_at']
