from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import BankAccount
from .serializers import BankingSerializer

# Create your views here.


@api_view(['GET', 'POST', 'PUT'])
def banking_account_list(request):
    if request.method == 'GET':
        data = BankAccount.objects.all()

        serializer = BankingSerializer(data,
                                       context={'request': request},
                                       many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':

        data = BankAccount.objects.update_or_create(
            id=request.data['id'], defaults=request.data)

        serializer = BankingSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        serializer = BankingSerializer(data=request.data)
        if serializer.is_valid():
            bankAccount = BankAccount.objects.get(id=request.data['id'])
            serializer.update(bankAccount, serializer.data)
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
