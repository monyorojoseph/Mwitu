from django.urls import path
from .views import *

urlpatterns = [
    path('google/', GoogleOAuthAPI.as_view(), name='google_oauth'),    
    path('profile-details/', ProfileDetailsAPI.as_view(), name='profile_details'),    
    path('delete-account/', DeleteAccountAPI.as_view(), name='delete_account'),
    path('logout/', LogoutAPI.as_view(), name='logout')
]
