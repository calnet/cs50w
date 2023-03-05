from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # pass
    follow = models.ManyToManyField('self')
    nickname = models.CharField(blank=True, null=True, max_length=150)
    website = models.CharField(blank=True, null=True, max_length=150)
    job_title = models.CharField(blank=True, null=True, max_length=150)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "nickname": self.nickname,
            "website": self.website,
            "job_title": self.job_title,
            "date_joined": self.date_joined.strftime("%b %d %Y, %I:%M %p"),
            "last_login": self.last_login.strftime("%b %d %Y, %I:%M %p"),
            "is_active": self.is_active,
            "is_staff": self.is_staff,
            "is_superuser": self.is_superuser,
            # "following": self.following
        }


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    body = models.TextField(blank=True)
    likes = models.ManyToManyField(User, related_name="likes")
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "username": self.user.username,
            "body": self.body,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "likes_count": self.likes.count(),
        }
