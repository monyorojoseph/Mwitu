from django.urls import path
from .views import *

urlpatterns = [
    path("create-site/", CreateSiteAPI.as_view(), name="create_site"), 
    path("list-site/",  ListSitesAPI.as_view(), name='list_sites'),
    path("site-details/<slug:slug>/", SiteDetailsAPI.as_view(), name='site_details'),
    path("list-site-reviews/<slug:slug>/<str:filter>/", ListSiteReviewsAPI.as_view(), name='list_site_reviews'),
    path("post-review/", PostReviewAPI.as_view(), name='post_review'),
    path("vote-review/", VoteReviewAPI.as_view(), name='vote_review'),
    path("search-site/", SearchSiteAPI.as_view(), name='search_site'),
    path("tags/", TagListAPI.as_view(), name='tag_list'),
    path("recent-activity/", RecentActivityAPI.as_view(), name='recent'),
]
