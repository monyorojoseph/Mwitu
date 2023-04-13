from django.urls import path
from .views import *

urlpatterns = [
    path("create-site/", CreateSiteAPI.as_view(), name="create_site"),   
]
