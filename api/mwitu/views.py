from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import (CreateSiteSerializer,  ListSiteSerializer, SiteSerializer, ReviewSerializer,
                         PostReviewSerializer, CustomTagSerializer)
from .models import Site, Review
from django.contrib.auth import get_user_model
from taggit.models import Tag



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
            site = serializer.save(created_by=request.user)
            siteSerializer = SiteSerializer(site)
            return Response(siteSerializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListSitesAPI(APIView):
    def get(self, request, format=None):
        category = request.query_params.get('category')
        queryset = Site.objects.filter(tags__name__in= [category])
        serializer = ListSiteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    

class SiteDetailsAPI(APIView):
    def get(self, request, slug, format=None):
        site = get_object_or_404(Site, slug=slug)
        serializer = SiteSerializer(site)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListSiteReviewsAPI(APIView):
    def get(self, request, slug, filter, format=None):
        site = get_object_or_404(Site, slug=slug)
        querysets = {
            'latest' : Review.mwitu.filter(site=site),
            'mostupvotes' : Review.mwitu.most_upvotes().filter(site=site),
            'mostdowmvotes' : Review.mwitu.most_downvotes().filter(site=site),
            'mostrated' : Review.mwitu.most_rated().filter(site=site)
        }
        reviews = querysets[filter]
        serializer = ReviewSerializer(reviews, many=True)
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
            return Response(ReviewSerializer(review).data ,status=status.HTTP_200_OK)
        if vote_type  == 'down':
            review.downvote.add(user)
            if user in review.upvote.all():
                review.upvote.remove(user)
            return Response(ReviewSerializer(review).data, status=status.HTTP_200_OK)

class RecentActivityAPI(APIView):
    permission_classes = []
    def get(self, request, format=None):
        queryset = Review.objects.all()[:9]
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# listing tags
class TagListAPI(APIView):
    permission_classes = []
    def get(self, request, format=None):
        queryset = Tag.objects.all()
        serializer = CustomTagSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    