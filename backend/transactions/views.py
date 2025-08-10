from django.db.models import Sum
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    PaymentMethod,
    RecurringTransaction,
    Transaction,
    TransactionLine,
    TransactionType,
)
from .serializers import (
    PaymentMethodSerializer,
    RecurringTransactionSerializer,
    TransactionCreateSerializer,
    TransactionSerializer,
    TransactionTypeSerializer,
)


class TransactionTypeViewSet(viewsets.ModelViewSet):
    queryset = TransactionType.objects.all()
    serializer_class = TransactionTypeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name", "code", "description"]
    filterset_fields = ["is_active"]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.select_related(
        "transaction_type", "customer", "supplier", "bank_account", "created_by"
    ).prefetch_related("lines__nominal_code")
    serializer_class = TransactionSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["transaction_number", "reference", "description"]
    filterset_fields = ["status", "transaction_type", "customer", "supplier"]
    ordering_fields = ["transaction_date", "created_at", "gross_amount"]
    ordering = ["-transaction_date"]

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return TransactionCreateSerializer
        return TransactionSerializer

    def perform_create(self, serializer):
        # Generate transaction number
        import uuid

        transaction_number = f"TXN-{uuid.uuid4().hex[:8].upper()}"

        # Save with required fields
        serializer.save(
            transaction_number=transaction_number, created_by=self.request.user
        )

    def update(self, request, *args, **kwargs):
        """Custom update method to handle transaction lines"""
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Extract lines data before saving
        lines_data = serializer.validated_data.pop("lines", [])

        # Update the transaction
        self.perform_update(serializer)

        # Clear existing lines and create new ones
        instance.lines.all().delete()
        for line_data in lines_data:
            TransactionLine.objects.create(transaction=instance, **line_data)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def post_transaction(self, request, pk=None):
        """Post a transaction to make it final"""
        transaction = self.get_object()
        if transaction.status != "draft":
            return Response(
                {"error": "Only draft transactions can be posted"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        transaction.status = "posted"
        transaction.posted_by = request.user
        transaction.posted_date = timezone.now()
        transaction.save()

        return Response({"message": "Transaction posted successfully"})

    @action(detail=False, methods=["get"])
    def dashboard_summary(self, request):
        """Get summary data for dashboard"""
        queryset = self.filter_queryset(self.get_queryset())

        summary = {
            "total_transactions": queryset.count(),
            "draft_transactions": queryset.filter(status="draft").count(),
            "posted_transactions": queryset.filter(status="posted").count(),
            "total_value": queryset.aggregate(total=Sum("gross_amount"))["total"] or 0,
            "recent_transactions": TransactionSerializer(
                queryset[:5], many=True, context={"request": request}
            ).data,
        }

        return Response(summary)


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "code"]


class RecurringTransactionViewSet(viewsets.ModelViewSet):
    queryset = RecurringTransaction.objects.select_related(
        "transaction_type", "customer", "supplier"
    )
    serializer_class = RecurringTransactionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name", "description_template"]
    filterset_fields = ["is_active", "frequency", "transaction_type"]
