from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from . import SITE_FILTERS
from .serializers import (CreateSiteSerializer,  ListSiteSerializer, SiteSerializer, ListReviewSerializer,
                         PostReviewSerializer)
from .models import Site, Review
from django.contrib.auth import get_user_model



User = get_user_model()

class SearchSiteAPI(APIView):
    def post(self, request, format=None):
        q=request.data['q']
        queryset = Site.objects.filter(name__icontains=q)
        serializer = ListSiteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# create site
class CreateSiteAPI(APIView):
    permission_classes =  [ IsAuthenticated ]
    def post(self, request, format=None):
        serializer = CreateSiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListSitesAPI(APIView):
    def get(self, request, filter, format=None):
        filter_value = SITE_FILTERS[filter]['weigth']
        queryset = Site.mwitu.sites(filter_value)
        serializer = ListSiteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class SiteDetailsAPI(APIView):
    def get(self, request, id, format=None):
        site = get_object_or_404(Site, id=id)
        serializer = SiteSerializer(site)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListSiteReviewsAPI(APIView):
    def get(self, request, site_id, filter, format=None):
        site = get_object_or_404(Site, id=site_id)
        querysets = {
            'latest' : Review.mwitu.filter(site=site),
            'mostupvotes' : Review.mwitu.most_upvotes().filter(site=site),
            'mostdowmvotes' : Review.mwitu.most_downvotes().filter(site=site),
            'mostrated' : Review.mwitu.most_rated().filter(site=site)
        }
        reviews = querysets[filter]
        serializer = ListReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostReviewAPI(APIView):
    permission_classes =  [ IsAuthenticated ]
    def post(self, request, format=None):
        serializer = PostReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VoteReviewAPI(APIView):
    permission_classes =  [ IsAuthenticated ]
    def post(self, request, format=None):
        user = request.user
        vote_type = request.data['vote_type']
        review = get_object_or_404(Review, id=request.data['review_id'])
        if vote_type == 'up':
            review.upvote.add(user)
            if user in review.downvote.all():
                review.downvote.remove(user)
            return Response(status=status.HTTP_200_OK)
        if vote_type  == 'down':
            review.downvote.add(user)
            if user in review.upvote.all():
                review.upvote.remove(user)
            return Response(status=status.HTTP_200_OK)