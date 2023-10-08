from django.db import models


class Supplier(models.Model):
    account_reference = models.CharField(max_length=255)
    account_name = models.CharField(max_length=255)
    account_status = models.CharField(max_length=255)
    balance = models.DecimalField(
        'balance', max_digits=10, decimal_places=2)
    contact_name = models.CharField(max_length=255)
    credit_limit = models.DecimalField(
        'credit limit', max_digits=10, decimal_places=2)
    telephone_number = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.account_reference
