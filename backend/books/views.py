from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import BookSerializer
from rest_framework.decorators import api_view
from rest_framework import status



@api_view(['POST'])
def AddBook(request : Request):
    serializer = BookSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    else:
        return Response(None, status.HTTP_400_BAD_REQUEST)