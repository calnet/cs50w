from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("get_authenticated_user", views.get_authenticated_user, name="get_authenticated_user"),
    path("new_post", views.new_post, name="new_post"),
    path("update_post", views.update_post, name="update_post"),
    path("update_like_post/<int:id>", views.update_like_post, name="update_like_post"),
    path("user_posts", views.user_posts, name="user_posts"),
    path("user_posts/<int:id>", views.user_posts, name="user_posts"),
    path("all_posts", views.all_posts, name="all_posts"),
    path("followed_users_posts", views.followed_users_posts, name="followed_users_posts"),
    path("user_profile/<int:id>", views.user_profile, name="user_profile"),
    path("follow_profile/<int:id>", views.follow_profile, name="follow_profile"),
]
