from django.contrib.postgres.search import TrigramSimilarity
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     ListCreateAPIView)
from rest_framework.response import Response
from users.models import BorrowRecord
from users.serializers import (BorrowRecordSerializer,
                               BorrowRecordSerializerPost)

from .models import Book
from .serializers import BookSerializer


class BooksAPIView(ListCreateAPIView):
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        book = Book.objects.filter(
            title=serializer.validated_data["title"],
            publisher=serializer.validated_data["publisher"],
            author=serializer.validated_data["author"],
        ).first()

        if book is not None:
            return serializer.update(book, serializer.validated_data)

        return serializer.save()

    def get_queryset(self):
        return Book.objects.all()


class BorrowAPIView(CreateAPIView):
    serializer_class = BorrowRecordSerializerPost

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        record_exists = BorrowRecord.objects.filter(
            student=serializer.validated_data["student"],
            book=serializer.validated_data["book"],
            is_returned=False,
        ).exists()

        if record_exists:
            return Response(
                {"record": "already exists"},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        if serializer.validated_data["book"].copies == 0:
            return Response(
                {"book": "there are no copies left"},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        serializer.validated_data["book"].copies -= 1
        serializer.validated_data["book"].save()

        serializer.save()

        return Response(status=status.HTTP_201_CREATED)


@api_view(["GET"])
def RepossessBook(_, pk: int):
    try:
        record = BorrowRecord.objects.get(id=pk)
    except BorrowRecord.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    record.is_returned = True
    record.save()

    record.book.copies += 1
    record.book.save()

    return Response(status=status.HTTP_200_OK)


class ActiveBorrowRecords(ListAPIView):
    serializer_class = BorrowRecordSerializer
    queryset = BorrowRecord.objects.filter(is_returned=False)


class SearchBooks(ListAPIView):
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        queryset = (
            Book.objects.annotate(
                similarity=TrigramSimilarity("title", kwargs["title"]),
            )
            .filter(similarity__gt=0.2)
            .order_by("-similarity")
        )

        serializer = self.serializer_class(queryset, many=True)

        for book in serializer.data:
            history_queryset = BorrowRecord.objects.filter(
                is_returned=False, book=book["id"]
            )

            history_serializer = BorrowRecordSerializer(
                history_queryset,
                many=True,
            )

            book["active_history"] = history_serializer.data

        return Response({"books": serializer.data}, status=status.HTTP_200_OK)
