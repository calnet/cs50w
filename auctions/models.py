from typing_extensions import Required
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.forms import IntegerField, ModelForm
from numpy import integer

class User(AbstractUser):
    pass

class ListingManager(models.Manager):
    def create_listing(self, title, description, start_price, primary_category,
                       image, date_created, user_id, active):

        listing = self.create(title=title, description=description, start_price=start_price,
                              primary_category=primary_category, image=image,
                              date_created=date_created, user_id=user_id, active=active)

        return listing

class Listing(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    date_created = models.DateTimeField()
    title = models.CharField(blank=False, null=False, max_length=64)
    description = models.CharField(blank=False, null=False, max_length=200)
    start_price = models.IntegerField(blank=False, null=False, default=0)
    primary_category = models.CharField(blank=True, null=True, max_length=64)
    image = models.ImageField(blank=True, null=True)
    active = models.BooleanField(default=True)

    # reserve_price = models.IntegerField()
    # listing_duration = models.IntegerField()
    # condition = models.CharField(max_length=64)
    # quantity = models.IntegerField()

    objects = ListingManager()

    def __str__(self):
        return f"{self.title} / £{self.start_price}"

class BidManager(models.Manager):
    def create_bid(self, user_id, listing_id, amount, bid_date):
        bid = self.create(user_id=user_id, listing_id=listing_id, amount=amount, bid_date=bid_date)

        return bid
        
class Bid(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    bid_date = models.DateTimeField()

    objects = BidManager()

    def __str__(self):
        return f"{self.user} / {self.listing.id} - {self.listing.title} / £{self.amount}"

class CommentManager(models.Manager):
    def add_comment(self, user_id, listing_id, comment_date, comment):

        comment = self.create(user_id=user_id, listing_id=listing_id, 
                              comment_date=comment_date, comment=comment)

        return comment

class Comment(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    comment_date = models.DateTimeField()
    comment = models.CharField(max_length=500)

    objects = CommentManager()

    def __str__(self):
        return f"{self.user} / {self.listing.title} / {self.comment}"
    


class WatchlistManager(models.Manager):
    def add_watchlist(self, user_id, listing_id):
        watchlist = self.create(user_id=user_id, listing_id=listing_id)

        return watchlist

class Watchlist(models.Model):
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    objects = WatchlistManager()

    def __str__(self):
        return f"{self.user} / {self.listing.id} - {self.listing.title}"
