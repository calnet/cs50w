from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class TransactionType(models.Model):
    """Define transaction types like Invoice, Payment, Credit Note, etc."""

    name = models.CharField(max_length=50, unique=True)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Transaction Types"


class Transaction(models.Model):
    """Main transaction model for all financial transactions"""

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("posted", "Posted"),
        ("cancelled", "Cancelled"),
        ("reversed", "Reversed"),
    ]

    transaction_number = models.CharField(max_length=20, unique=True)
    transaction_type = models.ForeignKey(TransactionType, on_delete=models.PROTECT)
    reference = models.CharField(max_length=100, blank=True)
    description = models.TextField()

    # Amounts
    gross_amount = models.DecimalField(max_digits=15, decimal_places=2)
    net_amount = models.DecimalField(max_digits=15, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    # Dates
    transaction_date = models.DateField()
    due_date = models.DateField(null=True, blank=True)

    # Related entities
    customer = models.ForeignKey(
        "customers.Customer", on_delete=models.PROTECT, null=True, blank=True
    )
    supplier = models.ForeignKey(
        "suppliers.Supplier", on_delete=models.PROTECT, null=True, blank=True
    )
    bank_account = models.ForeignKey(
        "banking.BankAccount", on_delete=models.PROTECT, null=True, blank=True
    )

    # Status and audit
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="created_transactions"
    )
    posted_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="posted_transactions",
    )
    posted_date = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.transaction_number} - {self.description}"

    @property
    def is_posted(self):
        return self.status == "posted"

    def get_balance_effect(self):
        """Calculate the effect on account balances"""
        if self.transaction_type.code in ["INV", "JNL"]:  # Invoice, Journal Entry
            return self.gross_amount
        elif self.transaction_type.code in ["PAY", "REC"]:  # Payment, Receipt
            return -self.gross_amount
        return 0

    class Meta:
        verbose_name_plural = "Transactions"
        ordering = ["-transaction_date", "-created_at"]


class TransactionLine(models.Model):
    """Individual line items for transactions (double-entry bookkeeping)"""

    ENTRY_TYPE_CHOICES = [
        ("debit", "Debit"),
        ("credit", "Credit"),
    ]

    transaction = models.ForeignKey(
        Transaction, on_delete=models.CASCADE, related_name="lines"
    )
    line_number = models.PositiveIntegerField()

    # Chart of Accounts reference
    nominal_code = models.ForeignKey("ledgers.NominalCode", on_delete=models.PROTECT)

    description = models.CharField(max_length=255)
    entry_type = models.CharField(max_length=10, choices=ENTRY_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=15, decimal_places=2)

    # Tax information
    tax_code = models.CharField(max_length=10, blank=True)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.transaction.transaction_number} - Line {self.line_number}"

    class Meta:
        verbose_name_plural = "Transaction Lines"
        ordering = ["line_number"]
        unique_together = ["transaction", "line_number"]


class PaymentMethod(models.Model):
    """Payment methods like Cash, Card, Bank Transfer, etc."""

    name = models.CharField(max_length=50, unique=True)
    code = models.CharField(max_length=10, unique=True)
    is_active = models.BooleanField(default=True)
    requires_reference = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Payment Methods"


class RecurringTransaction(models.Model):
    """Template for recurring transactions"""

    FREQUENCY_CHOICES = [
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("quarterly", "Quarterly"),
        ("annually", "Annually"),
    ]

    name = models.CharField(max_length=100)
    transaction_type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)

    # Template data
    description_template = models.TextField()
    amount = models.DecimalField(max_digits=15, decimal_places=2)

    # Schedule
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    next_due_date = models.DateField()

    # Related entities
    customer = models.ForeignKey(
        "customers.Customer", on_delete=models.CASCADE, null=True, blank=True
    )
    supplier = models.ForeignKey(
        "suppliers.Supplier", on_delete=models.CASCADE, null=True, blank=True
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.frequency})"

    class Meta:
        verbose_name_plural = "Recurring Transactions"
