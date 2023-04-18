from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import (CreateSiteSerializer,  ListSiteSerializer, SiteSerializer, ListReviewSerializer,
                         PostReviewSerializer)
from .models import Site, Review
from django.contrib.auth import get_user_model

User = get_user_model()

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
        queryset = Site.objects.all()
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
        reviews = Review.objects.filter(site=site)
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
        vote_type = request.data['vote_type']
        review = get_object_or_404(Review, id=request.data['review_id'])
        if vote_type == 'up':
            review.upvote.add(request.user)
            return Response(status=status.HTTP_200_OK)
        else:
            review.downvote.add(request.user)
            return Response(status=status.HTTP_200_OK)