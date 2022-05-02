from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import IntegerField, ModelForm
from numpy import integer


class User(AbstractUser):
    pass


class ListingManager(models.Manager):
    def create_listing(self, title, description, start_price, primary_category,
                       image, date_created, user_id):

        listing = self.create(title=title, description=description, start_price=start_price,
                              primary_category=primary_category, image=image,
                              date_created=date_created, user_id=user_id)

        return listing


class Listing(models.Model):
    user_id = models.IntegerField()
    date_created = models.DateTimeField()
    title = models.CharField(blank=False, null=False, max_length=64)
    description = models.CharField(blank=False, null=False, max_length=200)
    start_price = models.IntegerField(blank=False, null=False, default=0)
    primary_category = models.CharField(blank=True, null=True, max_length=64)
    image = models.ImageField(blank=True, null=True)

    # reserve_price = models.IntegerField()
    # listing_duration = models.IntegerField()
    # condition = models.CharField(max_length=64)
    # quantity = models.IntegerField()

    objects = ListingManager()


class Bid(models.Model):
    user_id = models.IntegerField()
    amount = models.IntegerField()
    bid_date = models.DateTimeField()


class Comment(models.Model):
    user_id = models.IntegerField()
    listing_id = models.IntegerField()
    comment_date = models.DateTimeField()
    comment = models.CharField(max_length=200)


class WatchlistManager(models.Manager):
    def add_watchlist(self, user_id, listing_id):

        watchlist = self.create(user_id=user_id, listing_id=listing_id)

        return watchlist


class Watchlist(models.Model):
    user_id = models.IntegerField()
    listing_id = models.IntegerField()

    def remove_watchlist(self, user_id, listing_id):

        watchlist = self.delete()

        return watchlist

    # origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="departures")
    # destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="arrivals")

    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="id")
    # listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="id")

    objects = WatchlistManager()


class ListingForm(ModelForm):
    class Meta:
        model: Listing
        fields: ['user_id', 'date_created', 'title', 'description',
                 'start_price', 'primary_category', 'image']
