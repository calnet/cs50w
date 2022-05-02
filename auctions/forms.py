from django.forms import ModelForm
from auctions.models import Listing


class CreateListingForm(ModelForm):
    class Meta:
        model: Listing
        fields: ['user_id', 'date_created', 'title', 'description',
                 'start_price', 'primary_category', 'image']
