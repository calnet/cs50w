from rest_framework import serializers
from .models import Supplier


class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ['id', 'name', 'address', 'phone',
                  'email', 'created_at', 'updated_at']
