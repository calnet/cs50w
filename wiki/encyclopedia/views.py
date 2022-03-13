from django import forms

from django.http import HttpResponseRedirect
from django.shortcuts import render, reverse

from . import util

class NewPageForm(forms.Form):
    title = forms.CharField(label="Page Title")
    content = forms.CharField(widget=forms.Textarea)

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry(request, title):
    return render(request, "encyclopedia/entry.html", {
        "title": title,
        "entry": util.get_entry(title)
    })

def search(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':

        query = request.POST["q"]

        # If the query matches the name of an encyclopedia entry, the user should be redirected to that entry’s page.
        if util.get_entry(query):
            return HttpResponseRedirect(query)
        else:
            # If the query does not match the name of an encyclopedia entry, 
            # the user should instead be taken to a search results page that displays a list 
            # of all encyclopedia entries that have the query as a substring. 
            # For example, if the search query were ytho, then Python should appear in the search results.
            entries = util.list_entries()

            matches = []

            for result in entries:
                if str.casefold(query) in str.casefold(result):
                    matches.append(result)

            return render(request, "encyclopedia/search.html", {
                "matches": matches
            })

    # if a GET (or any other method) we'll redirect to home page
    else:
        return HttpResponseRedirect(reverse("index"))

def create_new_page(request):

    # Check if method is POST
    if request.method == "POST":

        # Take in the data the user submitted and save it as form
        form = NewPageForm(request.POST)

        # Check if form data is valid (server-side)
        if form.is_valid():

            # Isolate the title from the 'cleaned' version of form data
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]

            if util.get_entry(title):
                error_msg = "This entry already exists, please change the title and try again."

                return render(request, "encyclopedia/create_new_page.html", {
                    "form": NewPageForm(request.POST),
                    "error": error_msg
                })
            else:
                util.save_entry(title, content)

                return HttpResponseRedirect(title)

            return render(request, "encyclopedia/create_new_page.html", {
                    "form": NewPageForm(request.POST)
                })

        else:
            # If the form is invalid, re-render the page with existing information.
            return render(request, "encyclopedia/create_new_page.html", {
                "form": NewPageForm(request.POST)
            })

    return render(request, "encyclopedia/create_new_page.html", {
        "form": NewPageForm()
    })