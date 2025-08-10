from django.core.management.base import BaseCommand
from ledgers.models import Layout, NominalCode, NominalType


class Command(BaseCommand):
    help = "Create sample nominal codes for the chart of accounts"

    def handle(self, *args, **options):
        # Create basic nominal codes for a standard chart of accounts
        nominal_codes_data = [
            # Assets
            {"code": "1000", "name": "Freehold Property", "type_name": "Fixed Assets"},
            {
                "code": "1001",
                "name": "Plant and Machinery",
                "type_name": "Fixed Assets",
            },
            {
                "code": "1100",
                "name": "Debtors Control Account",
                "type_name": "Current Assets",
            },
            {
                "code": "1200",
                "name": "Bank Current Account",
                "type_name": "Current Assets",
            },
            {
                "code": "1201",
                "name": "Bank Deposit Account",
                "type_name": "Current Assets",
            },
            {"code": "1230", "name": "Petty Cash", "type_name": "Current Assets"},
            # Liabilities
            {
                "code": "2100",
                "name": "Creditors Control Account",
                "type_name": "Current Liabilities",
            },
            {
                "code": "2200",
                "name": "Sales Tax Control Account",
                "type_name": "Current Liabilities",
            },
            {
                "code": "2201",
                "name": "Purchase Tax Control Account",
                "type_name": "Current Liabilities",
            },
            {"code": "2300", "name": "Loans", "type_name": "Long Term Liabilities"},
            # Equity
            {"code": "3000", "name": "Ordinary Shares", "type_name": "Share Capital"},
            {
                "code": "3200",
                "name": "Profit and Loss Account",
                "type_name": "Retained Earnings",
            },
            # Revenue
            {"code": "4000", "name": "Sales Type A", "type_name": "Sales"},
            {"code": "4001", "name": "Sales Type B", "type_name": "Sales"},
            {"code": "4002", "name": "Sales Type C", "type_name": "Sales"},
            # Cost of Sales
            {"code": "5000", "name": "Materials Purchased", "type_name": "Purchases"},
            {"code": "5001", "name": "Subcontract", "type_name": "Purchases"},
            # Operating Expenses
            {
                "code": "7000",
                "name": "Office Costs",
                "type_name": "Administrative Expenses",
            },
            {
                "code": "7001",
                "name": "Telephone",
                "type_name": "Administrative Expenses",
            },
            {"code": "7100", "name": "Rent", "type_name": "Administrative Expenses"},
            {"code": "7200", "name": "Marketing", "type_name": "Selling Expenses"},
            {"code": "7300", "name": "Travel", "type_name": "Administrative Expenses"},
        ]

        created_count = 0
        for nc_data in nominal_codes_data:
            # Get or create the nominal type
            try:
                nominal_type = NominalType.objects.get(type_name=nc_data["type_name"])
            except NominalType.DoesNotExist:
                self.stdout.write(
                    f"Warning: NominalType '{nc_data['type_name']}' not found, skipping {nc_data['code']}"
                )
                continue

            # Create nominal code
            layout = Layout.objects.first()  # Get the first layout
            if not layout:
                self.stdout.write(
                    "Error: No layout found. Please create a layout first."
                )
                return

            nominal_code, created = NominalCode.objects.get_or_create(
                nominal_code=nc_data["code"],
                defaults={
                    "nominal_name": nc_data["name"],
                    "nominal_type": nominal_type,
                    "layout": layout,
                },
            )

            if created:
                created_count += 1
                self.stdout.write(
                    f"✅ Created nominal code: {nominal_code.nominal_code} - {nominal_code.nominal_name}"
                )

        self.stdout.write(
            self.style.SUCCESS(f"Created {created_count} nominal codes successfully!")
        )
