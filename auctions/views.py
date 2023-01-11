from django.utils import timezone
from django.contrib.auth import authenticate, login, logout, get_user
from django.db import IntegrityError
from django.db.models import Max
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.core import exceptions

from .models import User, Listing, Bid, Comment, Watchlist, Category

def get_listing(listing_id):
	# Attempt to Get Listing and User Objects from the Database
	try:
		# Get Listing Object if one exists
		listing = get_object_or_404(Listing, id=listing_id)
	except Http404:
		# If either Listing or User Object does not exists then redirect browser to 'view_listings()' function
		return None
	
	return listing

def get_highest_bid(listing):
	# Initialise Current Price for Listing Object
	listing.current_price = listing.start_price
	# Get Bid Count for Listing
	listing.bid_count = Bid.objects.filter(listing_id=listing.id).count()
	# Set Current Highest Bid Price for Listing
	if listing.bid_count > 0:
		highest_bid = Bid.objects.filter(listing_id=listing.id).order_by('-amount')[0]
		if listing.start_price < highest_bid.amount:
			listing.current_price = highest_bid.amount
			listing.winning_user = highest_bid.user_id

	return listing

def get_highest_user_bid(user_id, listing):
	bids = listing.bid_set.all().filter(user_id=user_id).order_by('-amount')
	
	bid_count = bids.count()

	if bid_count > 0:
		listing.highest_user_bid = bids[0]
		listing.user_bid_count = bid_count
	else:
		listing.user_bid_count = bid_count

	return listing

def get_outbid_listings(request, listings):
	outbid_listings = []

	for listing in listings:
		if listing.user_bid_count > 0:
			if listing.winning_user != request.user.id:
				outbid_listings.append(listing)

	return outbid_listings

def winning_listings(request, listings):
	winning_listings = []

	for listing in listings:
		if listing.bid_count > 0:
			if listing.winning_user == request.user.id:
				winning_listings.append(listing)

	return winning_listings

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
			return HttpResponseRedirect(reverse("view_listings"))
		else:
			return render(request, "auctions/login.html", {
				"message": "Invalid username and/or password."
			})
	else:
		return render(request, "auctions/login.html")

def logout_view(request):
	logout(request)
	return HttpResponseRedirect(reverse("view_listings"))

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
		return HttpResponseRedirect(reverse("view_listings"))
	else:
		return render(request, "auctions/register.html")

def create_listing(request):
	user = get_user(request)

	date_created = timezone.now()

	if request.method == "POST":
		title = request.POST["create_listing_title"]
		description = request.POST["create_listing_description"]
		start_price = request.POST["create_listing_start_price"]
		categories = request.POST.getlist('create_listing_categories')

		# Check for thumbnail image file
		if len(request.FILES) > 0:
			image = request.FILES["create_listing_image"]
		else:
			image = ""

		active = True

		c = []

		if len(categories) > 0:
			for category in categories:
				obj = Category.objects.get_or_create(title=category)
				c.append(obj[0].id)
		else:
			categories=""

		try:
			listing = Listing.objects.create_listing(
				title, description, start_price, image, date_created, user.id, active)
			listing.save()

			listing.categories.set(c)
			return redirect('view_listing', listing.id)

		except IntegrityError:
			return render(request, "auctions/create_listing.html", {
				"message": "There was a problem."
			})

	# Check if authentication successful
	if user.is_authenticated:
		return render(request, "auctions/create_listing.html")
	else:
		return render(request, "auctions/login.html")

def view_listings(request, status=1):
	
	match status:
		case 0:
			active = 0
		case 1:
			active = 1
		case 2:
			active = 1
		case 3:
			active = 1
		case 4:
			active = 0
		case 5:
			active = 0
		case _:
			active = 1
	
	
	listings = Listing.objects.all().filter(active=active).order_by('id')

	for listing in listings:
		# Update the Current Price of Listing Object with the Highest Bid
		listing = get_highest_bid(listing)
		listing = get_highest_user_bid(request.user.id, listing)
		
	if status == 2 or status == 4:
		listings = winning_listings(request, listings)

	if status == 3 or status == 5:
		listings = get_outbid_listings(request, listings)

	return render(request, "auctions/index.html", {
		"listings": listings,
		"active": active,
		"status": status
	})

def get_users_watched_listings(user_id):
	try:
		# Get watchlists for the user
		queryset = Watchlist.objects.filter(user_id=user_id).order_by('listing_id')
		
		# Get the listings for the watchlists
		listings = []

		for watchlist in queryset:
			listings.append(watchlist.listing)
			
	except Watchlist.DoesNotExist:
		listings = []
	
	return listings

def add_to_watchlist(request, listing):
	# Get User Object for Authenticated User
	user = get_user(request)
	# Attempt to add item to the watchlist for the authenticated user
	try:
		watchlist = Watchlist.objects.add_watchlist(user.id, listing.id)
		watchlist.save()

	except:
		error = "There was a problem adding item listing to your watchlist."

		return render(request, "auctions/listing.html", {
			"listing": listing,
			"error": error
		})

def remove_from_watchlist(request, listing):
	# Attempt to remove item from the watchlist for the authenticated user
	try:
		Watchlist.delete(listing.watchlist)

	except IntegrityError:
		error = "There was a problem removing item listing from your watchlist."

		return render(request, "auctions/listing.html", {
			"listing": listing,
			"error": error
		})

def watched_listings(request):
	# Get user object for current user
	user = get_user(request)

	listings = get_users_watched_listings(user.id)

	return render(request, "auctions/watchlist.html", {
		"listings": listings
	})

def view_categories(request, category_id=None):
	if category_id:
		categories = Category.objects.get(id=category_id)
		count_categories = 1
		listings = Listing.objects.filter(categories=category_id).order_by('id')

		return render(request, "auctions/categories.html", {
		"categories": categories,
		"count_categories": count_categories,
		"listings": listings
	})
	else:
		categories = Category.objects.all().order_by('title')
		count_categories = len(categories)


	return render(request, "auctions/categories.html", {
		"categories": categories,
		"count_categories": count_categories
	})

def view_listing(request, listing_id=None, toggle=0, error=None):
	toggle = int(toggle)
	
	if listing_id:
		listing_id = int(listing_id)
	else:
		return redirect('view_listings')
	
	# Get User Object for Authenticated User
	user = get_user(request)

	# Attempt to Get Listing and User Objects from the Database
	try:
		# Get Listing Object if one exists
		listing = get_listing(listing_id)
		listing.toggle = toggle
	except Http404:
		# If either Listing or User Object does not exists then redirect browser to 'view_listings()' function
		return redirect('view_listings')

	# Update the Current Price of Listing Object with the Highest Bid
	listing = get_highest_bid(listing)

	# Retrieve comments for the current listing
	listing.comments = listing.comment_set.all().order_by('-comment_date')
	
	# Check if there is an authenticated user session
	if user.is_authenticated:
		# Determine the current item watchlist status for the authenticated user
		try:
			# Item is on the watchlist for the authenticated user
			listing.watchlist = get_object_or_404(Watchlist, user_id=user.id, listing_id=listing_id)
			listing.watched = True
		# Item is not on the watchlist for the authenticated user
		except Http404:
			listing.watched = False

		# Authenticated user has clicked on a link to toggle watchlist status
		if listing.toggle:
			if listing.watched:
				remove_from_watchlist(request, listing)
			else:
				add_to_watchlist(request, listing)

			return redirect('view_listing', listing_id)

		return render(request, "auctions/listing.html", {
			"listing": listing,
			"error": error
		})
	else:
		return render(request, "auctions/listing.html", {
			"listing": listing,
			"error": error
		})

def end_listing(request, listing_id=None, toggle=0):
	user = get_user(request)
	
	# Check if authenticated user matches listing creator
	if user.is_authenticated:

		if request.method == "POST":
			listing_id = request.POST["listing_id"]

			listing = get_object_or_404(Listing, id=listing_id)
			listing.active = False
			listing.save()
			
			# try:
			# 	listing.watched = Watchlist.objects.get(listing=listing_id)
			# 	listing.watched.delete()
			# except Watchlist.DoesNotExist:
			# 	pass
				
			return redirect('view_listing', listing_id)
		else:
			if listing_id is not None:
				return redirect('view_listing', listing_id)
			else:
				return redirect('view_listings')
	else:
		return render(request, "auctions/login.html")

def resume_listing(request, listing_id=None, toggle=0):
	user = get_user(request)
	
	# Check if authenticated user matches listing creator
	if user.is_authenticated:

		if request.method == "POST":
			listing_id = request.POST["listing_id"]

			listing = get_object_or_404(Listing, id=listing_id)
			listing.active = True
			listing.save()

			return redirect('view_listing', listing_id)
		else:
			if listing_id is not None:
				return redirect('view_listing', listing_id)
			else:
				return redirect('view_listings')
	else:
		return render(request, "auctions/login.html")

def add_comment(request, listing_id):
	user = get_user(request)

	# Check if authenticated user matches listing creator
	if user.is_authenticated:

		if request.method == "POST":
			listing_id = request.POST["listing_id"]
			text = request.POST["comment_text"]
			comment_user = request.POST["user_id"]
			
			comment_date = timezone.now()

			try:
				comment = Comment.objects.add_comment(comment_user, listing_id, comment_date, text)
				comment.save()
			except IntegrityError:
				return render(request, "auctions/listing.html", {
					"message": "There was a problem adding your comment."
			})

	else:
		return render(request, "auctions/login.html", {
	})
	
	return redirect('view_listing', listing_id)

def place_bid(request):
	# Check if the user submitted a bid
	if request.method == "POST":
		listing_id = int(request.POST["listing_id"])
		listing = get_listing(listing_id)
		listing = get_highest_bid(listing)

		if request.POST["bid_amount"] == '':
			error = "Invalid amount entered, please enter a valid bid amount and try again."
			
			return render(request, "auctions/listing.html", {
				"listing": listing,
				"error": error
			})
		else:
			bid_amount = float(request.POST["bid_amount"])
		
		user_id = int(request.POST["user_id"])
		bid_date = timezone.now()

		# Check if bid is greater than the current auction amount
		if listing.current_price < bid_amount:
			if listing.bid_count > 0:
				if user_id == listing.winning_user:

					return render(request, "auctions/listing.html", {
						"listing": listing,
						"error": "You are already the highest bidder, your bid will be ignored."
					})
			
			
			try:
				bid = Bid.objects.create_bid(user_id, listing_id, bid_amount, bid_date)
				bid.save()
			except IntegrityError:
				error = "There was a problem when placing your bid, please try again."

				return render(request, "auctions/listing.html", {
					"listing": listing,
					"error": error
				})

			return redirect('view_listing', listing_id)
		else:
			error = "Your bid is too low, please enter a higher amount."
			
			return render(request, "auctions/listing.html", {
				"listing": listing,
				"error": error
			})
	
	return redirect('view_listings')