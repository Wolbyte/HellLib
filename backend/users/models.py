from django.db import models
from books.models import Book


class Student(models.Model):
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 20)
    class_number = models.IntegerField()
    national_code = models.IntegerField()
    borrowed_book = models.ForeignKey(Book, on_delete = models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"