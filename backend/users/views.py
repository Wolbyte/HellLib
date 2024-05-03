from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import StudentSerializer
from .models import Student
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['POST'])
def AddStudent(request : Request):
    serializer = StudentSerializer(data = request.data)

    first_name = serializer.initial_data['first_name']
    last_name = serializer.initial_data['last_name']
    class_number = serializer.initial_data['class_number']
    national_code = serializer.initial_data['national_code']

    student = Student.objects.filter(first_name = first_name, last_name = last_name, class_number = class_number, national_code = national_code).first()

    if serializer.is_valid() and student == None:
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    else:
        return Response(None, status.HTTP_400_BAD_REQUEST)