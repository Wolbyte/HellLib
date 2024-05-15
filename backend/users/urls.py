from django.urls import path

from . import views

urlpatterns = [
    path("", views.StudentsAPIView.as_view()),
    path("borrow/", views.BorrowApiView.as_view()),
]
