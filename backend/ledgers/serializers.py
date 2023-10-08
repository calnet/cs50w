from rest_framework import serializers
from .models import CoaCategory, CoaLayout, NominalCode, NominalType


class CoaLayoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoaLayout
        fields = '__all__'


class CoaCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoaCategory
        fields = '__all__'


class NominalTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NominalType
        fields = '__all__'


class NominalCodesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NominalCode
        fields = '__all__'
