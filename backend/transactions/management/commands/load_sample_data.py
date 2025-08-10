from banking.models import BankAccount
from customers.models import Customer
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from ledgers.models import CoaCategory, Layout, NominalType
from suppliers.models import Supplier

from transactions.models import PaymentMethod, TransactionType

User = get_user_model()


class Command(BaseCommand):
    help = "Load sample data for the Sage-style accounting system"

    def handle(self, *args, **options):
        self.stdout.write("Creating sample data...")

        # Create superuser if not exists
        if not User.objects.filter(email="admin@example.com").exists():
            User.objects.create_superuser(
                email="admin@example.com", password="admin123"
            )
            self.stdout.write("Created admin user")

        # Create Transaction Types
        transaction_types = [
            {
                "name": "Sales Invoice",
                "code": "SI",
                "description": "Customer sales invoice",
            },
            {
                "name": "Purchase Invoice",
                "code": "PI",
                "description": "Supplier purchase invoice",
            },
            {
                "name": "Customer Payment",
                "code": "CP",
                "description": "Payment received from customer",
            },
            {
                "name": "Supplier Payment",
                "code": "SP",
                "description": "Payment made to supplier",
            },
            {
                "name": "Bank Transfer",
                "code": "BT",
                "description": "Transfer between bank accounts",
            },
            {
                "name": "Journal Entry",
                "code": "JE",
                "description": "Manual journal entry",
            },
            {
                "name": "Credit Note",
                "code": "CN",
                "description": "Customer credit note",
            },
            {"name": "Debit Note", "code": "DN", "description": "Supplier debit note"},
        ]

        for tt_data in transaction_types:
            TransactionType.objects.get_or_create(
                code=tt_data["code"], defaults=tt_data
            )
        self.stdout.write("Created transaction types")

        # Create Payment Methods
        payment_methods = [
            {"name": "Cash", "code": "CASH", "requires_reference": False},
            {"name": "Bank Transfer", "code": "BACS", "requires_reference": True},
            {"name": "Credit Card", "code": "CARD", "requires_reference": True},
            {"name": "Cheque", "code": "CHQ", "requires_reference": True},
            {"name": "Direct Debit", "code": "DD", "requires_reference": True},
            {"name": "Standing Order", "code": "SO", "requires_reference": True},
        ]

        for pm_data in payment_methods:
            PaymentMethod.objects.get_or_create(code=pm_data["code"], defaults=pm_data)
        self.stdout.write("Created payment methods")

        # Create Sample Customers
        customers_data = [
            {
                "account_reference": "CUST001",
                "account_name": "ABC Electronics Ltd",
                "contact_name": "John Smith",
                "telephone_number": "01234 567890",
                "account_status": "active",
                "balance": 1250.00,
                "credit_limit": 5000.00,
            },
            {
                "account_reference": "CUST002",
                "account_name": "XYZ Manufacturing",
                "contact_name": "Sarah Johnson",
                "telephone_number": "01234 567891",
                "account_status": "active",
                "balance": 750.00,
                "credit_limit": 3000.00,
            },
            {
                "account_reference": "CUST003",
                "account_name": "Tech Solutions Inc",
                "contact_name": "Mike Brown",
                "telephone_number": "01234 567892",
                "account_status": "active",
                "balance": 2100.00,
                "credit_limit": 7500.00,
            },
        ]

        for customer_data in customers_data:
            Customer.objects.get_or_create(
                account_reference=customer_data["account_reference"],
                defaults=customer_data,
            )
        self.stdout.write("Created sample customers")

        # Create Sample Suppliers
        suppliers_data = [
            {
                "account_reference": "SUP001",
                "account_name": "Office Supplies Direct",
                "contact_name": "Emma Wilson",
                "telephone_number": "01234 567893",
                "account_status": "active",
                "balance": -850.00,
                "credit_limit": 2000.00,
            },
            {
                "account_reference": "SUP002",
                "account_name": "Computer Hardware Ltd",
                "contact_name": "David Lee",
                "telephone_number": "01234 567894",
                "account_status": "active",
                "balance": -1200.00,
                "credit_limit": 3000.00,
            },
            {
                "account_reference": "SUP003",
                "account_name": "Utilities Company",
                "contact_name": "Lisa Taylor",
                "telephone_number": "01234 567895",
                "account_status": "active",
                "balance": -300.00,
                "credit_limit": 1000.00,
            },
        ]

        for supplier_data in suppliers_data:
            Supplier.objects.get_or_create(
                account_reference=supplier_data["account_reference"],
                defaults=supplier_data,
            )
        self.stdout.write("Created sample suppliers")

        # Create Sample Bank Accounts
        bank_accounts_data = [
            {
                "account_type": "Current",
                "account_name": "Main Current Account",
                "account_number": 12345678,
                "account_sort_code": "12-34-56",
                "account_status": "active",
                "balance": 15750.00,
                "credit_limit": 0.00,
                "currency": "GBP",
                "opening_balance": 10000.00,
                "opening_balance_date": "2024-01-01 00:00:00",
            },
            {
                "account_type": "Savings",
                "account_name": "Business Savings",
                "account_number": 87654321,
                "account_sort_code": "12-34-56",
                "account_status": "active",
                "balance": 25000.00,
                "credit_limit": 0.00,
                "currency": "GBP",
                "opening_balance": 20000.00,
                "opening_balance_date": "2024-01-01 00:00:00",
            },
        ]

        for bank_data in bank_accounts_data:
            BankAccount.objects.get_or_create(
                account_number=bank_data["account_number"], defaults=bank_data
            )
        self.stdout.write("Created sample bank accounts")

        # Create Chart of Accounts Structure
        # Create Layout
        layout, created = Layout.objects.get_or_create(
            layout_name="Standard UK Chart of Accounts",
            defaults={"description": "Standard chart of accounts for UK businesses"},
        )

        # Create CoA Categories
        categories_data = [
            "Assets",
            "Liabilities",
            "Equity",
            "Revenue",
            "Cost of Sales",
            "Operating Expenses",
            "Other Income",
            "Other Expenses",
        ]

        categories = {}
        for cat_name in categories_data:
            category, created = CoaCategory.objects.get_or_create(
                category_name=cat_name
            )
            categories[cat_name] = category

        # Create Nominal Types
        nominal_types_data = [
            {"type_name": "Fixed Assets", "category": "Assets"},
            {"type_name": "Current Assets", "category": "Assets"},
            {"type_name": "Current Liabilities", "category": "Liabilities"},
            {"type_name": "Long Term Liabilities", "category": "Liabilities"},
            {"type_name": "Share Capital", "category": "Equity"},
            {"type_name": "Retained Earnings", "category": "Equity"},
            {"type_name": "Sales", "category": "Revenue"},
            {"type_name": "Purchases", "category": "Cost of Sales"},
            {"type_name": "Administrative Expenses", "category": "Operating Expenses"},
            {"type_name": "Selling Expenses", "category": "Operating Expenses"},
        ]

        nominal_types = {}
        for nt_data in nominal_types_data:
            nominal_type, created = NominalType.objects.get_or_create(
                type_name=nt_data["type_name"],
                defaults={"coa_category": categories[nt_data["category"]]},
            )
            nominal_types[nt_data["type_name"]] = nominal_type

        self.stdout.write("Created chart of accounts structure")
        self.stdout.write(self.style.SUCCESS("Sample data created successfully!"))
        self.stdout.write(
            "You can now log in with email: admin@example.com, password: admin123"
        )
