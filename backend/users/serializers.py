from books.serializers import BookSerializer
from rest_framework import serializers

from .models import BorrowRecord, Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class BorrowRecordSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    book = BookSerializer(read_only=True)

    class Meta:
        model = BorrowRecord
        fields = "__all__"


class BorrowRecordSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = BorrowRecord
        exclude = ["is_returned"]
