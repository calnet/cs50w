from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Supplier
from .serializers import SupplierSerializer


@api_view(['GET', 'POST'])
def suppliers_list(request):
    if request.method == 'GET':
        data = Supplier.objects.all()
        serializer = SupplierSerializer(data,
                                        context={'request': request},
                                        many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = Supplier.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
