# Generated by Django 4.0.5 on 2022-12-19 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0004_listing_active_alter_bid_amount'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Watchlist',
        ),
        migrations.AlterField(
            model_name='comment',
            name='comment',
            field=models.CharField(max_length=500),
        ),
    ]