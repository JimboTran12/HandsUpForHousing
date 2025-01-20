# housing_site/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # This line gives named routes like 'login', 'logout', 'password_reset', etc.
    path('accounts/', include('django.contrib.auth.urls')),

    # Your housing_app URLs
    path('', include('housing_app.urls', namespace='housing_app')),
]