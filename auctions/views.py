from django.utils import timezone
from django.contrib.auth import authenticate, login, logout, get_user
from django.db import IntegrityError
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.core import exceptions

from .models import User, Listing, Bid, Comment, Watchlist


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

		active = True

		try:
			listing = Listing.objects.create_listing(
				title, description, start_price, primary_category, image, date_created, user.id, active)
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
	queryset = Listing.objects.all().filter(active=True).order_by('-date_created')
	
	for listing in queryset:
		bid_count = Bid.objects.filter(listing_id=listing.id).count()
		
		if bid_count > 0:
			highest_bid = Bid.objects.filter(listing_id=listing.id).order_by('-amount')[0]
			listing.start_price = highest_bid.amount

	return render(request, "auctions/index.html", {
		"listings": queryset
	})


def closed_listings(request):
	queryset = Listing.objects.all().filter(active=False).order_by('-date_created')
	
	for listing in queryset:
		bid_count = Bid.objects.filter(listing_id=listing.id).count()
		
		if bid_count > 0:
			highest_bid = Bid.objects.filter(listing_id=listing.id).order_by('-amount')[0]
			listing.start_price = highest_bid.amount

	return render(request, "auctions/index.html", {
		"listings": queryset
	})

def watched_listings(request):
	# Get user object for current user
	user = get_user(request)
	
	listings = Listing.objects.all().filter(active=True).order_by('-date_created')
	watchlist = Watchlist.objects.all()

	
	
	queryset = Watchlist.objects.select_related('listing').filter(user_id=user.id).order_by('listing_id')
	# queryset = Watchlist.objects.select_related('listing')
	
	msg = str(queryset.query)
	
	return render(request, "auctions/watchlist.html", {
		"listings": queryset
	})


def view_listing(request, listing_id, toggle=0):
	error = False
	toggle = int(toggle)
	listing_id = int(listing_id)

	# Attempt to Get item listing from the database
	listing = get_object_or_404(Listing, id=listing_id)

	# Get user object for listing
	auction_user = get_object_or_404(User, id=listing.user_id)
	
	# Get user object for current user
	user = get_user(request)

	bid_count = Bid.objects.filter(listing_id=listing_id).count()
	
	if bid_count > 0:
		highest_bid = Bid.objects.filter(listing_id=listing_id).order_by('-amount')[0]
	else:
		highest_bid = Bid()
		highest_bid.amount = listing.start_price

	# Check if there is an authenticated user session
	if user.is_authenticated:
		# Determine the current item watchlist status for the authenticated user
		try:
			# Item is on the watchlist for the authenticated user
			obj = Watchlist.objects.all().filter(user_id=user.id).get(listing_id=listing_id)
			watching = True
		# Item is not on the watchlist for the authenticated user
		except exceptions.ObjectDoesNotExist:
			watching = False

		# Retrieve comments for the current listing
		comments = Comment.objects.all().filter(listing_id=listing_id).order_by('-comment_date')

		# Authenticated user has clicked on a link to toggle watchlist status
		if toggle:
			if watching:
				# Attempt to remove item from the watchlist for the authenticated user
				try:
					# obj = Watchlist.objects.remove_watchlist(user.id,listing_id)
					Watchlist.delete(obj)
					# obj = obj.remove_watchlist(user.id,listing_id)
					watching = False

					return redirect('view_listing', listing_id=listing_id)
				except IntegrityError:
					return render(request, "auctions/listing.html", {
						"item": listing,
						"auction_user": auction_user,
						"bid_count": bid_count,
						"highest_bid": highest_bid,
						"watching": watching,
						"error": "There was a problem removing item listing from the watchlist."
					})
			else:
				# Attempt to add item to the watchlist for the authenticated user
				try:
					obj = Watchlist.objects.add_watchlist(user.id,listing_id)
					obj.save()
					watching = True

					return redirect('view_listing', listing_id=listing_id)
				except:
					error = "There was a problem adding item listing to the watchlist."

					return render(request, "auctions/listing.html", {
						"item": listing,
						"auction_user": auction_user,
						"bid_count": bid_count,
						"highest_bid": highest_bid,
						"watching": watching,
						"error": error
					})

		# Check if the user submitted a bid
		if request.method == "POST":
			watching = request.POST["watching"]
			highest_bid_amount = float(request.POST["highest_bid_amount"])
			amount = float(request.POST["amount"])
			user_id = int(request.POST["user_id"])
			listing_id = int(request.POST["listing_id"])
			bid_date = timezone.now()

			# Check if bid is greater than the current auction amount
			if highest_bid_amount < amount:
				try:
					bid = Bid.objects.create_bid(user_id, listing_id, amount, bid_date)
					bid.save()
					bid_count = bid_count + 1
				except IntegrityError:
					error = "There was a problem placing your bid!"

					return render(request, "auctions/listing.html", {
						"item": listing,
						"auction_user": auction_user,
						"bid_count": bid_count,
						"highest_bid": highest_bid,
						"watching": watching,
						"error": error
					})
			else:
				error = "Your bid is too low, please enter a higher amount."
		
		if bid_count > 0:
			highest_bid = Bid.objects.filter(listing_id=listing_id).order_by('-amount')[0]
		else:
			highest_bid = Bid()
			highest_bid.amount = listing.start_price
		
		return render(request, "auctions/listing.html", {
			"item": listing,
			"auction_user": auction_user,
			"bid_count": bid_count,
			"highest_bid": highest_bid,
			"watching": watching,
			"comments": comments,
			"error": error
		})

	return render(request, "auctions/listing.html", {
		"item": listing,
		"highest_bid": highest_bid,
		"auction_user": auction_user,
		"error": error
	})


def end_listing(request, listing_id, toggle):
	user = get_user(request)
	
	# Check if authenticated user matches listing creator
	if user.is_authenticated:

		if request.method == "POST":
			listing_id = request.POST["listing_id"]
			winning_bid = request.POST["highest_bid_amount"]
			winning_user = request.POST["user_id"]

			obj = get_object_or_404(Listing, id=listing_id)

			obj.active = False
			obj.save()
			
			try:
				watching = Watchlist.objects.get(listing=listing_id)
				watching.delete()
			except Watchlist.DoesNotExist:
				exit
				

			return render(request, "auctions/listing.html", {
			"item": obj
		})

	else:
		return render(request, "auctions/login.html", {
	})

def add_comment(request, listing_id):
	user = get_user(request)

	listing = get_object_or_404(Listing, id=listing_id)

	date_created = timezone.now()

	# Check if authenticated user matches listing creator
	if user.is_authenticated:

		if request.method == "POST":
			listing_id = request.POST["listing_id"]
			comment_text = request.POST["listingCommentTextarea"]
			comment_user = request.POST["user_id"]

			try:
				comment = Comment.objects.add_comment(comment_user, listing_id, date_created, comment_text)
				comment.save()
			except IntegrityError:
				return render(request, "auctions/listing.html", {
					"message": "There was a problem adding your comment."
			})

	else:
		return render(request, "auctions/login.html", {
	})
	
	return redirect('view_listing', listing_id=listing_id)
	# return render(request, "auctions/listing.html", {
	# 	"item": listing
	# })