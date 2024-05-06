from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import BookSerializer
from .models import Book
from rest_framework.decorators import api_view
from rest_framework import status
import unicodedata
from django.contrib.postgres.search import TrigramSimilarity


@api_view(['POST'])
def AddBook(request : Request):
    serializer = BookSerializer(data = request.data)

    title = serializer.initial_data['title']
    publisher = serializer.initial_data['publisher']
    author = serializer.initial_data['author']
    copies = serializer.initial_data['copies']

    book = Book.objects.filter(title = title, publisher = publisher, author = author).first()

    if serializer.is_valid() and book == None:
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    else:
        book.copies += copies
        book.save()
        return Response(serializer.data, status.HTTP_202_ACCEPTED)
    





@api_view(['GET'])
def SearchBook(request : Request, title:str):
    try:
        books = Book.objects.annotate(
            similarity=TrigramSimilarity("title", title),
        ).filter(
            similarity__gt=0.3
        ).order_by('-similarity')
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookSerializer(books, many=True)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)