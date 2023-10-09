from rest_framework import serializers
from .models import CoaCategory, Layout, NominalCode, NominalType, CoaLayout


class LayoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layout
        fields = ['id', 'layout_name', 'description',
                  'created_at', 'updated_at']


class CoaCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoaCategory
        fields = ['id', 'category_name', 'created_at', 'updated_at']


class NominalTypesSerializer(serializers.ModelSerializer):
    # Create a custom field for category_name
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = NominalType
        fields = ['id', 'type_name', 'category_name',
                  'created_at', 'updated_at']

    def get_category_name(self, obj):
        # Retrieve the category_name from the related CoaCategory
        return obj.coa_category.category_name


class NominalCodesSerializer(serializers.ModelSerializer):
    # Create a custom field for layout_name
    layout_name = serializers.SerializerMethodField()

    # Create a custom field for category_name
    type_name = serializers.SerializerMethodField()

    class Meta:
        model = NominalCode
        fields = ['id', 'layout_name', 'nominal_code', 'type_name',
                  'nominal_name', 'created_at', 'updated_at']

    def get_layout_name(self, obj):
        # Retrieve the layout_name from the related CoaLayout
        return obj.layout.layout_name

    def get_type_name(self, obj):
        # Retrieve the type_name from the related NominalType
        return obj.nominal_type.type_name


class CoaLayoutSerializer(serializers.ModelSerializer):
    # Create a custom field for layout_name
    layout_name = serializers.SerializerMethodField()

    # Create a custom field for type_name
    type_name = serializers.SerializerMethodField()

    class Meta:
        model = CoaLayout
        fields = ['id', 'layout_name', 'type_name', 'nominal_code_min',
                  'nominal_code_max', 'created_at', 'updated_at']

    def get_layout_name(self, obj):
        # Retrieve the layout_name from the related CoaLayout
        return obj.layout.layout_name

    def get_type_name(self, obj):
        # Retrieve the type_name from the related NominalType
        return obj.nominal_type.type_name
