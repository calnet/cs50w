from django.urls import path

from . import views

urlpatterns = [
    # path("", views.index, name="index"),
    path("", views.active_listing, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_listing", views.create_listing, name="create_listing"),
    path("view_listing/<listing_id>/<toggle>", views.view_listing, name="view_listing")
]
