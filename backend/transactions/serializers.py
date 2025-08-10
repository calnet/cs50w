from rest_framework import serializers

from .models import (
    PaymentMethod,
    RecurringTransaction,
    Transaction,
    TransactionLine,
    TransactionType,
)


class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = "__all__"


class TransactionLineSerializer(serializers.ModelSerializer):
    nominal_code_name = serializers.CharField(
        source="nominal_code.code_name", read_only=True
    )

    class Meta:
        model = TransactionLine
        fields = [
            "id",
            "line_number",
            "nominal_code",
            "nominal_code_name",
            "description",
            "entry_type",
            "amount",
            "tax_code",
            "tax_rate",
            "tax_amount",
        ]


class TransactionSerializer(serializers.ModelSerializer):
    lines = TransactionLineSerializer(many=True, read_only=True)
    transaction_type_name = serializers.CharField(
        source="transaction_type.name", read_only=True
    )
    customer_name = serializers.CharField(
        source="customer.account_name", read_only=True
    )
    supplier_name = serializers.CharField(source="supplier.name", read_only=True)
    bank_account_name = serializers.CharField(
        source="bank_account.account_name", read_only=True
    )
    created_by_name = serializers.CharField(
        source="created_by.username", read_only=True
    )

    class Meta:
        model = Transaction
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"


class RecurringTransactionSerializer(serializers.ModelSerializer):
    transaction_type_name = serializers.CharField(
        source="transaction_type.name", read_only=True
    )
    customer_name = serializers.CharField(
        source="customer.account_name", read_only=True
    )
    supplier_name = serializers.CharField(source="supplier.name", read_only=True)

    class Meta:
        model = RecurringTransaction
        fields = "__all__"


class TransactionCreateSerializer(serializers.ModelSerializer):
    lines = TransactionLineSerializer(many=True)

    class Meta:
        model = Transaction
        fields = [
            "transaction_type",
            "reference",
            "description",
            "gross_amount",
            "net_amount",
            "tax_amount",
            "transaction_date",
            "due_date",
            "customer",
            "supplier",
            "bank_account",
            "lines",
        ]

    def create(self, validated_data):
        lines_data = validated_data.pop("lines")
        transaction = Transaction.objects.create(**validated_data)

        for line_data in lines_data:
            TransactionLine.objects.create(transaction=transaction, **line_data)

        return transaction
