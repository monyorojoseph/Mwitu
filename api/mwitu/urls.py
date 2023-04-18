from django.urls import path
from .views import *

urlpatterns = [
    path("create-site/", CreateSiteAPI.as_view(), name="create_site"), 
    path("list-site/<str:filter>/",  ListSitesAPI.as_view(), name='list_sites'),
    path("site-details/<str:id>/", SiteDetailsAPI.as_view(), name='site_details'),
    path("list-site-reviews/<str:site_id>/<str:filter>/", ListSiteReviewsAPI.as_view(), name='list-site-reviews'),
    path("post-review/", PostReviewAPI.as_view(), name='post-review'),
    path("vote-review/", VoteReviewAPI.as_view(), name='vote-review')
]
