from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import CreateSiteSerializer,  ListSiteSerializer, SiteSerializer
from .models import Site

# create site
class CreateSiteAPI(APIView):
    def post(self, request, format=None):
        serializer = CreateSiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListSitesAPI(APIView):
    def get(self, request, format=None):
        queryset = Site.objects.all()
        serializer = ListSiteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class SiteDetailsAPI(APIView):
    def get(self, request, id, format=None):
        site = get_object_or_404(Site, id=id)
        serializer = SiteSerializer(site)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListSiteReviewsAPI(APIView):
    def get(self, request,site_id, format=None):
        pass

class PostReviewAPI(APIView):
    def post(self, request, format=None):
        pass

class VoteReviewAPI(APIView):
    def post(self, request, format=None):
        pass