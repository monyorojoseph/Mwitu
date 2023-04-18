from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from account.models import Profile

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def register_social_user(provider, email, name):
    filtered_user_by_email = User.objects.filter(email=email)

    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].provider:
            registered_user = User.objects.get(email=email)

            return {
                'email': registered_user.email,
                'tokens': get_tokens_for_user(registered_user)
                }

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].provider)

    else:
        user = {
            'email': email,
        }
        user = User.objects.create_user(**user)
        user.is_active = True
        user.provider = provider
        user.save()
        new_user = User.objects.get(email=email)
        Profile.objects.create(user=new_user, email=email, full_name=name)
        return {
            'email': new_user.email,
            'tokens': get_tokens_for_user(new_user),
        }