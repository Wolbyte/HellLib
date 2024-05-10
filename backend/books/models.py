from django.db import models


class Book(models.Model):
    isbn = models.CharField(max_length=13)
    title = models.CharField(max_length=120)
    publisher = models.CharField(max_length=100)
    author = models.CharField(max_length=150)
    copies = models.IntegerField()
    borrowable = models.BooleanField()

    def __str__(self):
        return str(self.title)
