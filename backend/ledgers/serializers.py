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
        fields = '__all__'


class NominalTypesSerializer(serializers.ModelSerializer):
    # Create a custom field for category_name
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = NominalType
        fields = '__all__'

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
        fields = '__all__'

    def get_layout_name(self, obj):
        # Retrieve the layout_name from the related CoaLayout
        return obj.layout.layout_name

    def get_type_name(self, obj):
        # Retrieve the type_name from the related NominalType
        return obj.nominal_type.type_name


class CoaLayoutSerializer(serializers.ModelSerializer):
    layout_name = serializers.CharField(
        source='layout.layout_name', read_only=True)
    nominal_type_name = serializers.CharField(
        source='nominal_type.type_name', read_only=True)

    class Meta:
        model = CoaLayout
        # Specify the fields to be serialized
        # Ensure to include the ForeignKey fields for proper serialization
        # 'layout_id' and 'nominal_type_id' are ForeignKey fields
        # 'layout_name' and 'nominal_type_name' are custom fields
        # that retrieve the names from the related models
        fields = [
            'id', 'layout', 'layout_name', 'nominal_type',
            'nominal_type_name', 'nominal_code_min', 'nominal_code_max',
            'created_at', 'updated_at'
        ]

    def validate(self, data):
        """
        Custom validation for the CoaLayout model.
        """
        nominal_code_min = data.get('nominal_code_min')
        nominal_code_max = data.get('nominal_code_max')

        if nominal_code_min and nominal_code_max and nominal_code_min >= nominal_code_max:
            raise serializers.ValidationError(
                {"nominal_code_min": [
                    "The minimum nominal code must be less than the maximum nominal code."]}
            )

        return data
