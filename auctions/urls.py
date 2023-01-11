from django.urls import include, path

from . import views

urlpatterns = [
    path('__debug__/', include('debug_toolbar.urls')),
    
    path("", views.view_listings, name="view_listings"),
    path("<int:status>", views.view_listings, name="view_listings"),
    
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    path("create_listing", views.create_listing, name="create_listing"),
    path("add_comment/<int:listing_id>", views.add_comment, name="add_comment"),
    
    path("view_categories", views.view_categories, name="view_categories"),
    path("view_categories/<int:category_id>", views.view_categories, name="view_categories"),
    
    path("place_bid", views.place_bid, name="place_bid"),

    path("view_listing/", views.view_listing, name="view_listing"),
    path("view_listing/<int:listing_id>/", views.view_listing, name="view_listing"),
    path("view_listing/<int:listing_id>/<toggle>/", views.view_listing, name="view_listing"),
    # path("view_listing/<int:listing_id>/<toggle>/<str:error>", views.view_listing, name="view_listing"),
    
    path("watched_listings", views.watched_listings, name="watched_listings"),
    
    path("end_listing/", views.end_listing, name="end_listing"),
    path("end_listing/<int:listing_id>/", views.end_listing, name="end_listing"),
    path("end_listing/<int:listing_id>/<toggle>", views.end_listing, name="end_listing"),

    path("resume_listing/", views.resume_listing, name="resume_listing"),
    path("resume_listing/<int:listing_id>/", views.resume_listing, name="resume_listing"),
    path("resume_listing/<int:listing_id>/<toggle>", views.resume_listing, name="resume_listing"),
]
