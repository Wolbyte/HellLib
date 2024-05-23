from django.urls import path

from . import views

urlpatterns = [
    path("", views.BooksAPIView.as_view()),
    path("borrow", views.BorrowAPIView.as_view()),
    path("repossess/<int:pk>", views.RepossessBook),
    path("search/<str:title>", views.SearchBooks.as_view()),
]
