from django.db import models


class BankAccount(models.Model):

    account_type = models.CharField(max_length=255)
    account_name = models.CharField(max_length=255)
    account_number = models.DecimalField(
        'account number', max_digits=10, decimal_places=0)
    account_sort_code = models.CharField(max_length=255)
    account_status = models.CharField(max_length=255)
    balance = models.DecimalField(
        'balance', max_digits=10, decimal_places=2)
    credit_limit = models.DecimalField(
        'credit limit', max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=255)
    opening_balance = models.DecimalField(
        'opening balance', max_digits=10, decimal_places=2)
    opening_balance_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.account_name

    class Meta:
        verbose_name_plural = "Bank Accounts"
