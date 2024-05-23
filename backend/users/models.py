from books.models import Book
from django.db import models


class Student(models.Model):
    national_code = models.CharField(max_length=10, primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    class_number = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class BorrowRecord(models.Model):
    is_returned = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    return_date = models.DateField()

    def __str__(self):
        return f"{str(self.book)} - {str(self.student)} - {str(self.return_date)}"
