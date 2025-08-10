import json

import requests

# API Base URL
BASE_URL = "http://localhost:8000"


def get_auth_token():
    """Get JWT token for authentication"""
    url = f"{BASE_URL}/api/auth/token/"
    data = {"email": "admin@example.com", "password": "admin123"}

    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json()["access"]
    else:
        print(f"Authentication failed: {response.text}")
        return None


def create_sample_transaction(token):
    """Create a sample sales invoice transaction"""
    url = f"{BASE_URL}/api/transactions/"

    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    # Get a customer and transaction type first
    customers_response = requests.get(f"{BASE_URL}/api/customers/", headers=headers)
    transaction_types_response = requests.get(
        f"{BASE_URL}/api/transaction-types/", headers=headers
    )

    if (
        customers_response.status_code == 200
        and transaction_types_response.status_code == 200
    ):
        customers_data = customers_response.json()
        transaction_types_data = transaction_types_response.json()

        # Handle different response formats
        if isinstance(customers_data, dict) and "results" in customers_data:
            customers = customers_data["results"]
        else:
            customers = customers_data if isinstance(customers_data, list) else []

        if (
            isinstance(transaction_types_data, dict)
            and "results" in transaction_types_data
        ):
            transaction_types = transaction_types_data["results"]
        else:
            transaction_types = (
                transaction_types_data
                if isinstance(transaction_types_data, list)
                else []
            )

        # Find sales invoice transaction type
        sales_invoice_type = None
        for tt in transaction_types:
            if tt.get("code") == "SI":
                sales_invoice_type = tt
                break

        if customers and sales_invoice_type:
            customer = customers[0]

            transaction_data = {
                "transaction_type": sales_invoice_type["id"],
                "reference": "INV-2025-001",
                "date": "2025-01-31",
                "description": "Sales invoice for professional services",
                "customer": customer["id"],
                "total_amount": 1250.00,
                "tax_amount": 250.00,
                "net_amount": 1000.00,
                "status": "pending",
            }

            response = requests.post(url, json=transaction_data, headers=headers)
            if response.status_code == 201:
                print("✅ Sample transaction created successfully!")
                print(json.dumps(response.json(), indent=2))
                return response.json()
            else:
                print(f"❌ Failed to create transaction: {response.text}")
        else:
            print(
                f"❌ No customers ({len(customers)}) or transaction types ({len(transaction_types)}) found"
            )
    else:
        print(
            f"❌ Failed to fetch required data: customers={customers_response.status_code}, types={transaction_types_response.status_code}"
        )

    return None


def get_dashboard_data(token):
    """Get dashboard summary data"""
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    print("\n📊 Dashboard Summary:")
    print("=" * 50)

    # Get transactions
    transactions_response = requests.get(
        f"{BASE_URL}/api/transactions/", headers=headers
    )
    if transactions_response.status_code == 200:
        transactions = transactions_response.json()
        if isinstance(transactions, dict) and "count" in transactions:
            print(f"💼 Total Transactions: {transactions['count']}")
        else:
            print(
                f"💼 Total Transactions: {len(transactions) if isinstance(transactions, list) else 0}"
            )

    # Get customers
    customers_response = requests.get(f"{BASE_URL}/api/customers/", headers=headers)
    if customers_response.status_code == 200:
        customers_data = customers_response.json()
        if isinstance(customers_data, dict) and "results" in customers_data:
            customers = customers_data["results"]
        else:
            customers = customers_data if isinstance(customers_data, list) else []

        total_customer_balance = sum(float(c["balance"]) for c in customers)
        print(f"👥 Customers: {len(customers)}")
        print(f"💰 Total Customer Balance: £{total_customer_balance:,.2f}")

    # Get suppliers
    suppliers_response = requests.get(f"{BASE_URL}/api/suppliers/", headers=headers)
    if suppliers_response.status_code == 200:
        suppliers_data = suppliers_response.json()
        if isinstance(suppliers_data, dict) and "results" in suppliers_data:
            suppliers = suppliers_data["results"]
        else:
            suppliers = suppliers_data if isinstance(suppliers_data, list) else []

        total_supplier_balance = sum(float(s["balance"]) for s in suppliers)
        print(f"🏪 Suppliers: {len(suppliers)}")
        print(f"💸 Total Supplier Balance: £{total_supplier_balance:,.2f}")

    # Get bank accounts
    banking_response = requests.get(f"{BASE_URL}/api/banking/", headers=headers)
    if banking_response.status_code == 200:
        banking_data = banking_response.json()
        if isinstance(banking_data, dict) and "results" in banking_data:
            bank_accounts = banking_data["results"]
        else:
            bank_accounts = banking_data if isinstance(banking_data, list) else []

        total_bank_balance = sum(float(b["balance"]) for b in bank_accounts)
        print(f"🏦 Bank Accounts: {len(bank_accounts)}")
        print(f"💵 Total Bank Balance: £{total_bank_balance:,.2f}")


if __name__ == "__main__":
    print("🚀 Testing Sage-Style Accounting System API")
    print("=" * 50)

    # Get authentication token
    print("🔐 Authenticating...")
    token = get_auth_token()

    if token:
        print("✅ Authentication successful!")

        # Get dashboard data
        get_dashboard_data(token)

        # Create a sample transaction
        print("\n📝 Creating sample transaction...")
        create_sample_transaction(token)

        print("\n🎉 API test completed!")
        print("🌐 Frontend available at: http://localhost:5173")
        print("🔧 Backend API at: http://localhost:8000")
        print("👤 Login with: admin@example.com / admin123")
    else:
        print("❌ Authentication failed")
