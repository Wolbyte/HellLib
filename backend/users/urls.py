from django.urls import path

from . import views

urlpatterns = [
    path("", views.StudentsAPIView.as_view()),
    path("borrow/", views.BorrowBookAPIView.as_view()),
    path("repossess/", views.RepossessBookAPIView.as_view()),
]
