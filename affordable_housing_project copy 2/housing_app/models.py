# housing_app/models.py

from django.db import models

PROPERTY_TYPES = (
    ('house', 'House'),
    ('apartment', 'Apartment'),
    ('condo', 'Condo'),
)

YES_NO_CHOICES = (
    (True, 'Yes'),
    (False, 'No'),
)

class Listing(models.Model):
    address = models.CharField(max_length=255)
    landlord_contact = models.CharField(max_length=255, blank=True, null=True)

    # Filters
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    property_type = models.CharField(max_length=10, choices=PROPERTY_TYPES, default='house')
    pets_allowed = models.BooleanField(choices=YES_NO_CHOICES, default=False)
    ada_accessible = models.BooleanField(choices=YES_NO_CHOICES, default=False)
    income_requirement = models.CharField(max_length=255, blank=True, null=True)  # Or integer, up to you
    past_eviction_allowed = models.BooleanField(choices=YES_NO_CHOICES, default=False)
    sex_offender_allowed = models.BooleanField(choices=YES_NO_CHOICES, default=False)
    criminal_record_allowed = models.BooleanField(choices=YES_NO_CHOICES, default=False)
    # For "Drug, Alcohol, Mental illness" acceptance, you can add a field or multiple fields:
    issues_allowed = models.BooleanField(choices=YES_NO_CHOICES, default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.address} ({self.property_type})"