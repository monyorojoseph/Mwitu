from django.urls import path
from .views import *

urlpatterns = [
    path('google/', GoogleOAuthAPI.as_view(), name='google_oauth'),    
]
