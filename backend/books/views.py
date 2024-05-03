<<<<<<< HEAD
from django.shortcuts import render

# Create your views here.
=======
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import BookSerializer
from .models import Book
from rest_framework.decorators import api_view
from rest_framework import status


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
>>>>>>> b90f601564e416e34b0c54a53d16b0e1e9274b3d
