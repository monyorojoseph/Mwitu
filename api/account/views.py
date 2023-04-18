from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import GoogleOAuthSerializer, ProfileSerializer

# social google auth
class GoogleOAuthAPI(APIView):
    permission_classes = [ AllowAny ]
    serializer_class = GoogleOAuthSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)

# add email auth later

# update details
# class UpdateProfileAPI(APIView):
#     permission_classes = [ IsAuthenticated ]
    
#     def put(self, request, format=None):
        

# get details
class ProfileDetailsAPI(APIView):
    permission_classes = [ IsAuthenticated ]

    def get(self, request, format=None):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

# delete account
class DeleteAccountAPI(APIView):
    permission_classes = [ IsAuthenticated ]

    def post(self, request, format=None):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_200_OK)