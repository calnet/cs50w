from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Layout, CoaCategory, NominalType, NominalCode, CoaLayout
from .serializers import LayoutsSerializer, CoaCategoriesSerializer, NominalTypesSerializer, NominalCodesSerializer, CoaLayoutSerializer


@api_view(['GET', 'POST'])
def layouts(request):
    if request.method == 'GET':
        data = Layout.objects.all()
        serializer = LayoutsSerializer(data,
                                       context={'request': request},
                                       many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = Layout.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = LayoutsSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def coa_categories(request):
    if request.method == 'GET':
        data = CoaCategory.objects.all()
        serializer = CoaCategoriesSerializer(data,
                                             context={'request': request},
                                             many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = CoaCategory.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = CoaCategoriesSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def nominal_types(request, id=None):
    if request.method == 'GET':
        if id:
            data = NominalType.objects.filter(id=id)
        else:
            data = NominalType.objects.all()
        if not data:
            return Response({"Records": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NominalTypesSerializer(data,
                                            context={'request': request},
                                            many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = NominalType.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = NominalTypesSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def nominal_type(request, id):
    if request.method == 'GET':
        data = NominalType.objects.filter(
            id=id
        )
        serializer = NominalTypesSerializer(data,
                                            context={'request': request},
                                            many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def nominal_codes(request):
    if request.method == 'GET':
        data = NominalCode.objects.all()
        serializer = NominalCodesSerializer(data,
                                            context={'request': request},
                                            many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = NominalCode.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = NominalCodesSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def nominal_code(request, nominal_code):
    if request.method == 'GET':
        data = NominalCode.objects.filter(
            nominal_code=nominal_code
        )
        serializer = NominalCodesSerializer(data,
                                            context={'request': request},
                                            many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = NominalCode.objects.update_or_create(
            id=request.data['nominal_code'], defaults=request.data)
        serializer = NominalCodesSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def coa_layout(request):
    if request.method == 'GET':
        data = CoaLayout.objects.all()
        serializer = CoaLayoutSerializer(data,
                                         context={'request': request},
                                         many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = CoaLayout.objects.update_or_create(
            id=request.data['id'], defaults=request.data)
        serializer = CoaLayoutSerializer(data=request.data)
        if serializer.is_valid():
            if data[1] is True:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
