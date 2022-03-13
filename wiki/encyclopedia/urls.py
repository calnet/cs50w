from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("create_new_page", views.create_new_page, name="create_new_page"),
    path("<str:title>", views.entry, name="entry")
]
