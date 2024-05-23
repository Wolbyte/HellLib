from django.contrib.postgres.search import TrigramSimilarity
from rest_framework import status
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.response import Response
from users.models import BorrowRecord
from users.serializers import BorrowRecordSerializer

from .models import Book
from .serializers import BookSerializer


class BooksAPIView(ListCreateAPIView):
    serializer_class = BookSerializer

    def perform_create(self, serializer: serializer_class):
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
