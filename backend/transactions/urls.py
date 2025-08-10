from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    PaymentMethodViewSet,
    RecurringTransactionViewSet,
    TransactionTypeViewSet,
    TransactionViewSet,
)

router = DefaultRouter()
router.register(r"transactions", TransactionViewSet)
router.register(r"transaction-types", TransactionTypeViewSet)
router.register(r"payment-methods", PaymentMethodViewSet)
router.register(r"recurring-transactions", RecurringTransactionViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
