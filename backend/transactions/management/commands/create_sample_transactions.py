from datetime import date
from decimal import Decimal

from customers.models import Customer
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from transactions.models import Transaction, TransactionType

User = get_user_model()


class Command(BaseCommand):
    help = "Create sample transactions for demo"

    def handle(self, *args, **options):
        # Get required objects
        user = User.objects.first()
        transaction_type = TransactionType.objects.filter(
            code="SI"
        ).first()  # Sales Invoice
        customer = Customer.objects.first()

        if transaction_type and customer and user:
            # Create a sample transaction
            transaction = Transaction.objects.create(
                transaction_number="INV-2025-001",
                transaction_type=transaction_type,
                reference="Sample Invoice",
                description="Professional services for January 2025",
                gross_amount=Decimal("1250.00"),
                net_amount=Decimal("1000.00"),
                tax_amount=Decimal("250.00"),
                transaction_date=date.today(),
                customer=customer,
                status="draft",
                created_by=user,
            )
            self.stdout.write(
                f"✅ Created transaction: {transaction.transaction_number}"
            )

            # Create another one
            transaction2 = Transaction.objects.create(
                transaction_number="INV-2025-002",
                transaction_type=transaction_type,
                reference="Sample Invoice 2",
                description="Consulting services for project management",
                gross_amount=Decimal("750.00"),
                net_amount=Decimal("600.00"),
                tax_amount=Decimal("150.00"),
                transaction_date=date.today(),
                customer=Customer.objects.last(),
                status="posted",
                created_by=user,
            )
            self.stdout.write(
                f"✅ Created transaction: {transaction2.transaction_number}"
            )
        else:
            self.stdout.write("❌ Missing required objects")
