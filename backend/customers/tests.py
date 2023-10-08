from django.test import TestCase
from .models import Customer

# Create your tests here.


class CustomerTestCase(TestCase):
    def setUp(self):
        Customer.objects.create(
            account_reference='123456789',
            account_name='Test Account',
            account_status='Active',
            balance='100.00',
            contact_name='Test Contact',
            credit_limit='1000.00',
            telephone_number='0123456789',
        )
