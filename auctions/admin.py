from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Bid, Comment, Listing, User, Watchlist

# Register your models here.
admin.site.register(Bid)
admin.site.register(Comment)
admin.site.register(Listing)
admin.site.register(User, UserAdmin)
admin.site.register(Watchlist)
