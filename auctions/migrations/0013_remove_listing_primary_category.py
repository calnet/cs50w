# Generated by Django 4.0.5 on 2022-12-29 17:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0012_alter_listing_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='primary_category',
        ),
    ]