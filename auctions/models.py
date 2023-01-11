from typing_extensions import Required
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.forms import IntegerField, ModelForm
from numpy import integer

class User(AbstractUser):
    pass

class CategoryManager(models.Manager):
    def add_category(self, title):
        category = self.create(title=title)

        return category

class Category(models.Model):
    title = models.CharField(max_length=50)

    objects = CategoryManager()

    class Meta:
        verbose_name_plural = "categories"
        indexes = [
            models.Index(fields=['title'], name='category_title_idx'),
        ]
    
    def __str__(self):
        return f"{self.id} - {self.title}"

class CommentManager(models.Manager):
    def add_comment(self, user_id, listing_id, comment_date, text):

        comment = self.create(user_id=user_id, listing_id=listing_id, 
                              comment_date=comment_date, text=text)

        return comment

class Comment(models.Model):
    comment_date = models.DateTimeField()
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    text = models.TextField()

    objects = CommentManager()

    def __str__(self):
        return f"{self.user} / {self.listing.title} / {self.text}"

class ListingManager(models.Manager):
    def create_listing(self, title, description, start_price,
                       image, date_created, user_id, active):

        listing = self.create(
                            title=title, 
                            description=description,
                            start_price=start_price,
                            image=image, 
                            date_created=date_created, 
                            user_id=user_id, 
                            active=active
        )

        return listing

class Listing(models.Model):
    date_created = models.DateTimeField()
    title = models.CharField(blank=False, null=False, max_length=64)
    description = models.CharField(blank=False, null=True, max_length=200)
    image = models.ImageField(blank=True, null=True)
    active = models.BooleanField(default=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    start_price = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    
    categories = models.ManyToManyField(Category, related_name='listings')

    # reserve_price = models.IntegerField()
    # listing_duration = models.IntegerField()
    # condition = models.CharField(max_length=64)
    # quantity = models.IntegerField()

    objects = ListingManager()

    class Meta:
        indexes = [
            models.Index(fields=['title'], name='listing_title_idx'),
        ]

    def __str__(self):
        return f"{self.id} - {self.title} / £{self.start_price}"

class BidManager(models.Manager):
    def create_bid(self, user_id, listing_id, amount, bid_date):
        bid = self.create(
                        user_id=user_id, 
                        listing_id=listing_id, 
                        amount=amount, 
                        bid_date=bid_date
        )

        return bid
        
class Bid(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    bid_date = models.DateTimeField()
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    objects = BidManager()

    def __str__(self):
        return f"{self.user} / {self.listing.id} - {self.listing.title} / £{self.amount}"
    
class WatchlistManager(models.Manager):
    def add_watchlist(self, user_id, listing_id):
        watchlist = self.create(user_id=user_id, listing_id=listing_id)

        return watchlist

class Watchlist(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=False)
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE, null=False)

    objects = WatchlistManager()

    def __str__(self):
        return f"{self.user} / {self.listing.id} - {self.listing.title}"
