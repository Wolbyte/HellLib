from rest_framework import serializers

from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.copies += validated_data.get("copies", 0)
        instance.save()
        return instance
