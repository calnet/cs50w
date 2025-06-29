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
def nominal_codes(request, nominal_code=None):
    if request.method == 'GET':
        if nominal_code:
            data = NominalCode.objects.filter(nominal_code=nominal_code)
        else:
            data = NominalCode.objects.all()

        if not data:
            return Response({"Records": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NominalCodesSerializer(data,
                                            context={'request': request},
                                            many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        if nominal_code:
            data = NominalCode.objects.update_or_create(
                nominal_code=nominal_code, defaults=request.data)
        else:
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
def coa_layout(request):
    if request.method == 'GET':
        """
        Retrieve a list of all CoaLayout objects, including layout and nominal type information.
        """
        try:
            # Fetch all CoaLayout objects from the database
            coa_layouts = CoaLayout.objects.all()

            # Serialize the CoaLayout data
            serializer = CoaLayoutSerializer(coa_layouts, many=True)

            # Return the serialized data as a Response
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CoaLayout.DoesNotExist:
            return Response({'error': 'CoaLayouts not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = CoaLayoutSerializer(data=request.data)
        if serializer.is_valid():
            coa_layout, created = CoaLayout.objects.update_or_create(
                id=request.data.get('id'),
                defaults={
                    'layout_id': request.data.get('layout'),
                    'nominal_type_id': request.data.get('nominal_type'),
                    'nominal_code_min': request.data.get('nominal_code_min'),
                    'nominal_code_max': request.data.get('nominal_code_max'),
                }
            )

            # Re-serialize to return the saved object
            response_serializer = CoaLayoutSerializer(coa_layout)
            if created:
                return Response({
                    "status": "success",
                    "message": "CoaLayout created successfully.",
                    "data": response_serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "status": "success",
                    "message": "CoaLayout updated successfully.",
                    "data": response_serializer.data
                }, status=status.HTTP_200_OK)
        else:
            return Response({
                "status": "error",
                "message": "There were errors in your request.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
