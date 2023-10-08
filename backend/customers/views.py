from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer


# Create your views here.
@api_view(['GET', 'POST'])
def customers_list(request):
    if request.method == 'GET':
        data = Customer.objects.all()

        serializer = CustomerSerializer(data,
                                        context={'request': request},
                                        many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
