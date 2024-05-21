from django.urls import path

from . import views

urlpatterns = [
    path("", views.StudentsAPIView.as_view()),
    path("suggest", views.SuggestStudents.as_view()),
]
