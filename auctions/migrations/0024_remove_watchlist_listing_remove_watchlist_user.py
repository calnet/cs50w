# Generated by Django 4.0.5 on 2023-01-08 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0023_remove_watchlist_listings_watchlist_listing_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watchlist',
            name='listing',
        ),
        migrations.RemoveField(
            model_name='watchlist',
            name='user',
        ),
    ]
