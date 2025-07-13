"""
Enhanced API views with better error handling, validation, and features
"""
from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import transaction
from django.core.exceptions import ValidationError
from django.db.models import Q
import logging

from .models import Customer
from .serializers import CustomerSerializer

logger = logging.getLogger(__name__)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def customers_list_enhanced(request):
    """
    Enhanced customers endpoint with pagination, search, and better error handling
    """
    if request.method == 'GET':
        # Get query parameters
        search = request.GET.get('search', '')
        status_filter = request.GET.get('status', '')
        ordering = request.GET.get('ordering', 'account_reference')
        
        # Base queryset
        queryset = Customer.objects.all()
        
        # Apply search filter
        if search:
            queryset = queryset.filter(
                Q(account_reference__icontains=search) |
                Q(account_name__icontains=search) |
                Q(contact_name__icontains=search)
            )
        
        # Apply status filter
        if status_filter:
            queryset = queryset.filter(account_status=status_filter)
        
        # Apply ordering
        if ordering:
            queryset = queryset.order_by(ordering)
        
        # Paginate results
        paginator = StandardResultsSetPagination()
        page = paginator.paginate_queryset(queryset, request)
        
        if page is not None:
            serializer = CustomerSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = CustomerSerializer(queryset, many=True)
        return Response({
            'status': 'success',
            'data': serializer.data,
            'count': queryset.count()
        }, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        try:
            with transaction.atomic():
                # Validate required fields
                required_fields = ['account_reference', 'account_name', 'account_status']
                for field in required_fields:
                    if field not in request.data or not request.data[field]:
                        return Response({
                            'status': 'error',
                            'message': f'{field} is required',
                            'errors': {field: ['This field is required.']}
                        }, status=status.HTTP_400_BAD_REQUEST)
                
                # Check for duplicate account reference
                if Customer.objects.filter(
                    account_reference=request.data.get('account_reference')
                ).exists():
                    return Response({
                        'status': 'error',
                        'message': 'Customer with this account reference already exists',
                        'errors': {'account_reference': ['This field must be unique.']}
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                serializer = CustomerSerializer(data=request.data)
                if serializer.is_valid():
                    customer = serializer.save()
                    logger.info(f"Customer created: {customer.account_reference}")
                    
                    return Response({
                        'status': 'success',
                        'message': 'Customer created successfully',
                        'data': serializer.data
                    }, status=status.HTTP_201_CREATED)
                else:
                    return Response({
                        'status': 'error',
                        'message': 'Validation failed',
                        'errors': serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
        except ValidationError as e:
            logger.error(f"Validation error creating customer: {e}")
            return Response({
                'status': 'error',
                'message': 'Validation error',
                'errors': {'detail': str(e)}
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Unexpected error creating customer: {e}")
            return Response({
                'status': 'error',
                'message': 'An unexpected error occurred',
                'errors': {'detail': 'Please try again later'}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def customer_detail(request, pk):
    """
    Enhanced customer detail endpoint with full CRUD operations
    """
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Customer not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return Response({
            'status': 'success',
            'data': serializer.data
        })
    
    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        
        try:
            with transaction.atomic():
                serializer = CustomerSerializer(
                    customer, 
                    data=request.data, 
                    partial=partial
                )
                
                if serializer.is_valid():
                    customer = serializer.save()
                    logger.info(f"Customer updated: {customer.account_reference}")
                    
                    return Response({
                        'status': 'success',
                        'message': 'Customer updated successfully',
                        'data': serializer.data
                    })
                else:
                    return Response({
                        'status': 'error',
                        'message': 'Validation failed',
                        'errors': serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
        except Exception as e:
            logger.error(f"Error updating customer {pk}: {e}")
            return Response({
                'status': 'error',
                'message': 'Failed to update customer'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    elif request.method == 'DELETE':
        try:
            with transaction.atomic():
                customer_ref = customer.account_reference
                customer.delete()
                logger.info(f"Customer deleted: {customer_ref}")
                
                return Response({
                    'status': 'success',
                    'message': 'Customer deleted successfully'
                }, status=status.HTTP_204_NO_CONTENT)
                
        except Exception as e:
            logger.error(f"Error deleting customer {pk}: {e}")
            return Response({
                'status': 'error',
                'message': 'Failed to delete customer'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
