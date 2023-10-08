from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CoaLayout, CoaCategory, NominalType, NominalCode
from .serializers import CoaLayoutsSerializer, CoaCategoriesSerializer, NominalTypesSerializer, NominalCodesSerializer


# Create your views here.
@api_view(['GET', 'POST'])
def coa_layouts(request):
    if request.method == 'GET':
        data = CoaLayout.objects.all()

        serializer = CoaLayoutsSerializer(data,
                                          context={'request': request},
                                          many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CoaLayoutsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def coa_categories(request):
    if request.method == 'GET':
        data = CoaCategory.objects.all()

        serializer = CoaCategoriesSerializer(data,
                                             context={'request': request},
                                             many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CoaCategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def nominal_types(request):
    if request.method == 'GET':
        data = NominalType.objects.all()

        serializer = NominalTypesSerializer(data,
                                            context={'request': request},
                                            many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NominalTypesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def nominal_codes(request):
    if request.method == 'GET':
        data = NominalCode.objects.all()

        serializer = NominalCodesSerializer(data,
                                            context={'request': request},
                                            many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NominalCodesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
