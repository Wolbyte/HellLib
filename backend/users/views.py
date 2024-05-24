from rest_framework.generics import ListCreateAPIView
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Student, Book, BorrowRecord
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


class BorrowBookAPIView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        book_id = self.request.data.get('id')
        book = Book.objects.get(id=book_id)
        if book.copies > 0:
            book.copies -= 1
            book.save()
            serializer.save(book=book)

class RepossessBookAPIView(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        book = instance.book
        book.copies += 1
        book.save()
        instance.delete()