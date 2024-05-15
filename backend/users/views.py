from rest_framework.generics import ListCreateAPIView
from rest_framework.request import Request
from rest_framework import generics, mixins

from .models import Student, BorrowRecord
from .serializers import StudentSerializer, BorrowRecordSerializer


class StudentsAPIView(ListCreateAPIView):
    serializer_class = StudentSerializer

    def perform_create(self, serializer: serializer_class):
        first_name = serializer.validated_data["first_name"]
        last_name = serializer.validated_data["last_name"]
        class_number = serializer.validated_data["class_number"]
        national_code = serializer.validated_data["national_code"]

        student = Student.objects.filter(
            first_name=first_name,
            last_name=last_name,
            class_number=class_number,
            national_code=national_code,
        ).first()

        if student is not None:
            return

        return serializer.save()

    def get_queryset(self):
        return Student.objects.all()
    
class BorrowApiView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer

    def get(self, request: Request):
        return self.list(request)
    
    def post(self, request: Request):
        return self.create(request)