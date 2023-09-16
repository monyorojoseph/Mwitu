from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.conf import settings

from .googleAuth.google import Google
from .googleAuth.register import register_social_user

from .models import Profile

User = get_user_model()


class GoogleOAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )
        else:
            if user_data['aud'] != settings.GOOGLE_CLIENT_ID:
                raise AuthenticationFailed('oops, who are you?')

            email = user_data['email']
            name = user_data['name']
            provider = 'google'
            return register_social_user(
                provider=provider, email=email, name=name)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['email', 'full_name', 'image', 'join_date']