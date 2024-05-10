from django.urls import path

from . import views

urlpatterns = [
    path("add", views.AddBook),
    path("search/<str:title>", views.SearchBook),
]
