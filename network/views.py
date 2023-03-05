import json
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout, get_user
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Post, User


def index(request):
    return render(request, "network/index.html")


# @login_required
def get_authenticated_user(request):

    if not request.user.is_authenticated:
        return JsonResponse({"message": "There is not a user logged in."},
                            status=204)
    else:
        user = get_user(request)

        return JsonResponse(user.serialize(), safe=False)


@csrf_exempt
@login_required
def new_post(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return redirect('login')
    else:
        user = get_user(request)
        # Composing a new post must be via POST
        if request.method != "POST":
            return JsonResponse({"error": "POST request required."}, status=400)

        # Get contents of post
        data = json.loads(request.body)
        body = data.get("body", "")

        post = Post(body=body, user=user)
        # Save new post to database
        post.save()

        return JsonResponse({"message": "Post submitted successfully."},
                            status=201)


@csrf_exempt
@login_required
def update_post(request):
    user = get_user(request)

    # Check if user is authenticated
    if not request.user.is_authenticated:
        return redirect('login')
    else:
        if request.method != "POST":
            return JsonResponse({"error": "POST request required."}, status=400)

        # Get contents of post update
        data = json.loads(request.body)
        post_id = int(data.get("post", ""))
        user_id = int(data.get("user", ""))
        body = data.get("body", "")

        post = Post.objects.get(id=post_id)

        if user.id == post.user_id == user_id:
            post.body = body
            # Save post update to database
            post.save()

            return JsonResponse({"message": "Post submitted successfully."},
                                status=201)
        else:
            return JsonResponse({"warning": "Unauthorised user, update failed."},
                                status=403)


@login_required
def user_posts(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    id = request.GET.get('id')

    if id == None:
        # Get User Object for Authenticated User
        user = get_user(request)
    else:
        user = User.objects.get(id=id)

    try:
        # posts = user.posts.all()
        posts = Post.objects.filter(user=user)
    except Post.DoesNotExist:
        return JsonResponse({"error", "Post not found."}, status=404)

    # Return posts in reverse chronologial order
    posts = posts.order_by("-timestamp").all()

    serialized_posts, page_info = paginate_posts(request, posts, 10)
    page_info['user_id'] = user.id
    page_info['route'] = 'user_posts'

    return JsonResponse([serialized_posts, page_info], safe=False)


def paginate_posts(request, posts, per_page):
    # Create the paginator
    paginator = Paginator(posts, per_page)  # Show 10 results per page

    # Get the page number from the query string
    page = request.GET.get('page')

    # Get the page object
    page_obj = paginator.get_page(page)

    # Get the page objects
    page_objects = page_obj.object_list

    serialized_posts = []
    for obj in page_objects:
        serialized_posts.append(obj.serialize())

    page_info = {
        'total_posts': paginator.count,
        'per_page': paginator.per_page,
        'num_pages': paginator.num_pages,
        # 'page_range': paginator.page_range,
        # 'page_obj': page_obj,
        'page_number': page_obj.number,
        'has_other_pages': page_obj.has_other_pages(),
        'start_index': page_obj.start_index(),
        'end_index': page_obj.end_index(),
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
    }

    return serialized_posts, page_info


@login_required
def followed_users_posts(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    # Get User Object for Authenticated User
    user = get_user(request)

    try:
        following = User.follow.through.objects.filter(
            from_user_id=user.id).order_by("-id")
    except User.DoesNotExist:
        return JsonResponse({"error", "User not found."}, status=404)

    u_id = []

    for follow in following:
        u_id.append(follow.to_user_id)

    posts = Post.objects.filter(user_id__in=u_id)

    # Return posts in reverse chronologial order
    posts = posts.order_by("-id")

    serialized_posts, page_info = paginate_posts(request, posts, 10)

    return JsonResponse([serialized_posts, page_info], safe=False)


def all_posts(request):
    try:
        posts = Post.objects.all()
    except Post.DoesNotExist:
        return JsonResponse({"error", "Post not found."}, status=404)

    # Return posts in reverse chronologial order
    posts = posts.order_by("-timestamp").all()

    serialized_posts, page_info = paginate_posts(request, posts, 10)
    page_info['route'] = 'all_posts'

    return JsonResponse([serialized_posts, page_info], safe=False)


@login_required
def user_profile(request, id):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    # Get User Object for Authenticated User
    user = get_user(request)

    try:
        profile = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({"error", "User not found."}, status=404)

    profile.post_count = profile.posts.count()

    # Get profiles this user is following
    try:
        following = User.follow.through.objects.filter(from_user_id=profile.id)
        # following = profile.follow.all()

        profile.following = {}

        for follows in following:
            profile.following[follows.to_user_id] = follows.to_user.serialize()

    except User.DoesNotExist:
        return JsonResponse({"error", "There was an error retrieving following users data."}, status=404)

    # Get profiles following this user
    try:
        followers = User.follow.through.objects.filter(to_user_id=profile.id)

        profile.followed_by = {}

        for follower in followers:
            profile.followed_by[follower.from_user_id] = follower.from_user.serialize(
            )

    except User.DoesNotExist:
        return JsonResponse({"error", "There was an error retrieving followed by user data."}, status=404)

    context = {
        'user':    profile.serialize(),
        'post_count': profile.post_count,
        'following':  profile.following,
        'followed_by':  profile.followed_by
    }

    return JsonResponse(context, safe=False)

    # return JsonResponse({'user': profile.serialize(), 'following': profile.following, 'followed_by': profile.followed_by}, safe=False)
    # return JsonResponse([profile.serialize(), profile.following, profile.followed_by], safe=False)


# @login_required
def update_like_post(request, id):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    # Get User Object for Authenticated User
    user = get_user(request)

    try:
        like = Post.likes.through.objects.get_or_create(
            post_id=id, user_id=user.id)

        if like[1] == False:
            like[0].delete()
            return JsonResponse({"message": f"Post: {id} unliked successfully by User: {user.username}"}, status=200)
        else:
            return JsonResponse({"message": f"Post: {id} liked successfully by User: {user.username}"}, status=200)
    except Post.DoesNotExist:
        return JsonResponse({"error", "Post not found."}, status=404)


@login_required
def follow_profile(request, id):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    # Get User Object for Authenticated User
    user = get_user(request)

    if user.id == id:
        return JsonResponse({"message": "Authenticated user can not follow their own profile."})

    try:
        follow = User.follow.through.objects.get_or_create(
            from_user_id=user.id, to_user_id=id)

        if follow[1] == False:
            follow[0].delete()
            return JsonResponse({"message": "Profile unfollowed successfully."},
                                status=200)
        else:
            return JsonResponse({"message": "Profile followed successfully."},
                                status=200)
    except User.DoesNotExist:
        return JsonResponse({"error", "User not found."}, status=404)


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
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        nickname = request.POST["nickname"]
        website = request.POST["website"]
        job_title = request.POST["job_title"]

        extra_fields = {
            'first_name': first_name,
            'last_name': last_name,
            'nickname': nickname,
            'website': website,
            'job_title': job_title
        }

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html",
                          {"message": "Passwords must match."})

        # Attempt to create new user
        try:
            user = User.objects.create_user(
                username, email, password, **extra_fields)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html",
                          {"message": "Username already taken."})
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
