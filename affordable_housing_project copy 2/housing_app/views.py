# housing_app/views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Listing
from .forms import ListingForm

# Helper check functions for roles
def is_volunteer(user):
    return user.groups.filter(name='Volunteer').exists() or user.is_superuser

def is_social_worker(user):
    return user.groups.filter(name='Social Worker').exists() or user.is_superuser

def is_admin(user):
    return user.is_superuser

@login_required  # <-- NEW: Require login to view the listing_list
def listing_list(request):
    """
    Shows all listings with optional filtering.
    Requires the user to be logged in.
    """
    qs = Listing.objects.all()

    # Grab filter params from request.GET
    bedrooms = request.GET.get('bedrooms')
    bathrooms = request.GET.get('bathrooms')
    property_type = request.GET.get('property_type')
    pets_allowed = request.GET.get('pets_allowed')
    ada_accessible = request.GET.get('ada_accessible')
    past_eviction_allowed = request.GET.get('past_eviction_allowed')
    sex_offender_allowed = request.GET.get('sex_offender_allowed')
    criminal_record_allowed = request.GET.get('criminal_record_allowed')
    issues_allowed = request.GET.get('issues_allowed')
    
    # Apply filters if they exist
    if bedrooms:
        qs = qs.filter(bedrooms__gte=bedrooms)  # or exact: bedrooms=bedrooms
    if bathrooms:
        qs = qs.filter(bathrooms__gte=bathrooms)
    if property_type:
        qs = qs.filter(property_type=property_type)
    if pets_allowed is not None and pets_allowed in ['True', 'False']:
        qs = qs.filter(pets_allowed=(pets_allowed == 'True'))
    if ada_accessible is not None and ada_accessible in ['True', 'False']:
        qs = qs.filter(ada_accessible=(ada_accessible == 'True'))
    if past_eviction_allowed is not None and past_eviction_allowed in ['True', 'False']:
        qs = qs.filter(past_eviction_allowed=(past_eviction_allowed == 'True'))
    if sex_offender_allowed is not None and sex_offender_allowed in ['True', 'False']:
        qs = qs.filter(sex_offender_allowed=(sex_offender_allowed == 'True'))
    if criminal_record_allowed is not None and criminal_record_allowed in ['True', 'False']:
        qs = qs.filter(criminal_record_allowed=(criminal_record_allowed == 'True'))
    if issues_allowed is not None and issues_allowed in ['True', 'False']:
        qs = qs.filter(issues_allowed=(issues_allowed == 'True'))
    
    context = {
        'listings': qs,
    }
    return render(request, 'housing_app/listing_list.html', context)

def listing_detail(request, pk):
    listing = get_object_or_404(Listing, pk=pk)
    return render(request, 'housing_app/listing_detail.html', {'listing': listing})

@login_required
@user_passes_test(is_volunteer)
def listing_create(request):
    if request.method == 'POST':
        form = ListingForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('housing_app:listing_list')
    else:
        form = ListingForm()
    return render(request, 'housing_app/listing_create.html', {'form': form})

@login_required
@user_passes_test(is_volunteer)
def listing_update(request, pk):
    listing = get_object_or_404(Listing, pk=pk)
    if request.method == 'POST':
        form = ListingForm(request.POST, instance=listing)
        if form.is_valid():
            form.save()
            return redirect('housing_app:listing_detail', pk=pk)
    else:
        form = ListingForm(instance=listing)
    return render(request, 'housing_app/listing_update.html', {'form': form})

@login_required
@user_passes_test(is_admin)
def listing_delete(request, pk):
    listing = get_object_or_404(Listing, pk=pk)
    if request.method == 'POST':
        listing.delete()
        return redirect('housing_app:listing_list')
    return render(request, 'housing_app/listing_detail.html', {'listing': listing})