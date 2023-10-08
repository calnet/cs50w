from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Supplier
from .serializers import SupplierSerializer


# Create your views here.


@api_view(['GET', 'POST'])
def suppliers_list(request):
    if request.method == 'GET':
        data = Supplier.objects.all()

        serializer = SupplierSerializer(data,
                                        context={'request': request},
                                        many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
