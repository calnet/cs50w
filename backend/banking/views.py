from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import BankAccount
from .serializers import BankingSerializer


# Create your views here.


@api_view(['GET', 'POST'])
def banking_account_list(request):
    if request.method == 'GET':
        data = BankAccount.objects.all()

        serializer = BankingSerializer(data,
                                       context={'request': request},
                                       many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BankingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
