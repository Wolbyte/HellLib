from django.urls import path

from . import views

urlpatterns = [
    path("", views.StudentsAPIView.as_view()),
]
