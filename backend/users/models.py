from books.models import Book
from django.db import models



class Student(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    class_number = models.IntegerField()
    national_code = models.IntegerField()
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class BorrowRecord(models.Model):
    # is_returned = models.BooleanField(default=False)
    book = models.OneToOneField(Book, on_delete=models.CASCADE, primary_key=True)
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    return_date = models.DateField()