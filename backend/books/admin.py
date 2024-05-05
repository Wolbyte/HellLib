from django.contrib import admin
from .models import Book



class Book_Details_Admin(admin.ModelAdmin):
    list_display = ["isbn", "title", "publisher", "author", "copies", "borrowable"]

admin.site.register(Book, Book_Details_Admin)