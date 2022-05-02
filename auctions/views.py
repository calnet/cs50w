from email import message
from django.utils import timezone, datastructures
from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate, login, logout, get_user
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import NoReverseMatch, reverse
from django.core import exceptions
from numpy import integer

from .models import User, Listing, Bid, Comment, Watchlist, WatchlistManager


def index(request):
    return render(request, "auctions/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def create_listing(request):
    user = get_user(request)

    date_created = timezone.now()

    if request.method == "POST":
        title = request.POST["create_listing_title"]
        description = request.POST["create_listing_description"]
        start_price = request.POST["create_listing_start_price"]
        primary_category = request.POST["create_listing_primary_category"]

        if len(request.FILES) > 0:
            image = request.FILES["create_listing_image"]
        else:
            image = ""

        try:
            listing = Listing.objects.create_listing(
                title, description, start_price, primary_category, image, date_created, user.id)
            listing.save()
        except IntegrityError:
            return render(request, "auctions/create_listing.html", {
                "message": "There was a problem."
            })

    # Check if authentication successful
    if user.is_authenticated:
        return render(request, "auctions/create_listing.html")
    else:
        return render(request, "auctions/login.html", {
        })


def active_listing(request):
    user = get_user(request)
    listings = Listing.objects.filter(
        user_id=user.id).order_by('-date_created')

    return render(request, "auctions/index.html", {
        "listings": listings
    })


def view_listing(request, listing_id, toggle):
    toggle = int(toggle)
    listing_id = int(listing_id)

    try:
        # Get item listing from the database
        listing = Listing.objects.get(id=listing_id)
    except exceptions.ObjectDoesNotExist:
        # The item listing ID does not exist in the database
        return render(request, "auctions/listing.html", {
            "error": "The item listing requested, does not exist."
        })
    except ValueError:
        # The item listing ID is invalid
        return render(request, "auctions/listing.html", {
            "error": "You have provided an invalid item id. Only numeric ID's are valid!"
        })

    # Check if there is an authenticated user session
    if User.is_authenticated:
        # Get user object
        user = get_user(request)

        # Determine the current item watchlist status for the authenticated user
        try:
            # Check if item is on the watchlist for the authenticated
            q = Watchlist.objects.all().filter(user_id=user.id).get(listing_id=listing_id)

            # Item is on the watchlist for the authenticated user
            watching = True

        except exceptions.ObjectDoesNotExist:
            # Item is not on the watchlist for the authenticated user
            watching = False

        # Authenticated user has clicked on a link to toggle watchlist status
        if toggle:

            if watching:
                try:
                    # Attempt to remove item from the watchlist for the authenticated user
                    q = q.remove_watchlist(user.id,listing_id)
                    watching = False

                except IntegrityError:
                    return render(request, "auctions/listing.html", {
                        "item": listing,
                        "error": "There was a problem removing item listing from the watchlist.",
                        "watching": watching
                    })
            else:
                try:
                    # Attempt to add item to the watchlist for the authenticated user
                    q = Watchlist.objects.add_watchlist(user.id,listing_id)
                    q.save()
                    watching = True

                except:
                    return render(request, "auctions/listing.html", {
                        "item": listing,
                        "error": "There was a problem adding item listing to the watchlist.",
                        "watching": watching
                    })

        return render(request, "auctions/listing.html", {
            "item": listing,
            "error": False,
            "watching": watching
        })

    return render(request, "auctions/listing.html", {
        "item": listing,
        "error": False
    })
