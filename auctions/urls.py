from django.urls import path

from . import views

urlpatterns = [
    # path("", views.index, name="index"),
    path("", views.active_listing, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_listing", views.create_listing, name="create_listing"),
    path("add_comment/<int:listing_id>", views.add_comment, name="add_comment"),
    path("view_listing/<int:listing_id>", views.view_listing, name="view_listing"),
    path("view_listing/<int:listing_id>/<toggle>", views.view_listing, name="view_listing"),
    path("closed_listings", views.closed_listings, name="closed_listings"),
    path("end_listing/<int:listing_id>/<toggle>", views.end_listing, name="end_listing")
]
