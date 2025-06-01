from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer


@api_view(['GET', 'POST'])
def customers_list(request):
    if request.method == 'GET':
        data = Customer.objects.all()
        serializer = CustomerSerializer(data,
                                        context={'request': request},
                                        many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = Customer.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
