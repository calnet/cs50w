from django.http import HttpResponseRedirect
from django.shortcuts import render, reverse

from . import util

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
                "matches": matches,
                "debug": query
            })

    # if a GET (or any other method) we'll redirect to home page
    else:
        return HttpResponseRedirect(reverse("index"))