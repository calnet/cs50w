# Generated by Django 4.0.5 on 2022-12-29 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0011_category_delete_categories_listing_categories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='categories',
            field=models.ManyToManyField(related_name='listings', to='auctions.category'),
        ),
    ]