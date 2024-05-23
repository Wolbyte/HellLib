from django.contrib import admin

from .models import BorrowRecord, Student

admin.site.register(BorrowRecord)
admin.site.register(Student)
