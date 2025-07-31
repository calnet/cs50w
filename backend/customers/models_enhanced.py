from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal


class TimestampedModel(models.Model):
    """
    Abstract base class that provides created_at and updated_at timestamps
    """
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    
    class Meta:
        abstract = True


class Customer(TimestampedModel):
    """Enhanced Customer model with better validation and indexing"""
    
    ACCOUNT_STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
        ('SUSPENDED', 'Suspended'),
        ('CLOSED', 'Closed'),
    ]
    
    account_reference = models.CharField(
        max_length=50, 
        unique=True, 
        db_index=True,
        help_text="Unique customer reference code"
    )
    account_name = models.CharField(
        max_length=255,
        db_index=True,
        help_text="Customer company or individual name"
    )
    account_status = models.CharField(
        max_length=20,
        choices=ACCOUNT_STATUS_CHOICES,
        default='ACTIVE',
        db_index=True
    )
    balance = models.DecimalField(
        'current balance', 
        max_digits=12, 
        decimal_places=2,
        default=Decimal('0.00'),
        help_text="Current account balance"
    )
    contact_name = models.CharField(
        max_length=255,
        help_text="Primary contact person name"
    )
    credit_limit = models.DecimalField(
        'credit limit', 
        max_digits=12, 
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        help_text="Maximum credit allowed"
    )
    telephone_number = models.CharField(
        max_length=50,
        blank=True,
        help_text="Primary contact telephone number"
    )
    email = models.EmailField(
        blank=True,
        help_text="Primary contact email address"
    )
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True, default='United Kingdom')
    
    # Payment terms in days
    payment_terms = models.PositiveIntegerField(
        default=30,
        validators=[MinValueValidator(1), MaxValueValidator(365)],
        help_text="Payment terms in days"
    )
    
    # Soft delete functionality
    is_active = models.BooleanField(default=True, db_index=True)
    
    class Meta:
        verbose_name_plural = "Customers"
        ordering = ['account_reference']
        indexes = [
            models.Index(fields=['account_reference', 'account_status']),
            models.Index(fields=['account_name', 'is_active']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.account_reference} - {self.account_name}"
    
    @property
    def is_over_credit_limit(self):
        """Check if customer is over their credit limit"""
        return self.balance > self.credit_limit
    
    @property
    def available_credit(self):
        """Calculate available credit"""
        return max(Decimal('0.00'), self.credit_limit - self.balance)
    
    def soft_delete(self):
        """Soft delete the customer"""
        self.is_active = False
        self.account_status = 'CLOSED'
        self.save()
    
    def clean(self):
        """Custom validation"""
        from django.core.exceptions import ValidationError
        
        if self.credit_limit < 0:
            raise ValidationError({'credit_limit': 'Credit limit cannot be negative'})
        
        if self.account_reference:
            self.account_reference = self.account_reference.upper().strip()


class CustomerTransaction(TimestampedModel):
    """Track customer transactions for audit purposes"""
    
    TRANSACTION_TYPES = [
        ('INVOICE', 'Invoice'),
        ('PAYMENT', 'Payment'),
        ('CREDIT_NOTE', 'Credit Note'),
        ('ADJUSTMENT', 'Adjustment'),
    ]
    
    customer = models.ForeignKey(
        Customer, 
        on_delete=models.CASCADE, 
        related_name='transactions'
    )
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField()
    reference = models.CharField(max_length=100, db_index=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['customer', 'transaction_type']),
            models.Index(fields=['reference']),
        ]
    
    def __str__(self):
        return f"{self.customer.account_reference} - {self.transaction_type} - {self.amount}"
