from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import LoginSerializer, RegisterSerializer

User = get_user_model()


class RegisterView(APIView):
    """Create a new user account. Tokens are issued by login, not here."""

    permission_classes = [AllowAny]          # overrides the global IsAuthenticated default
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'register'

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        if User.objects.filter(email=email).exists():
            # Silently do nothing — never touch the existing account. Hash a
            # throwaway password anyway so the response takes about as long as a
            # real signup; otherwise the timing difference leaks what the message
            # is hiding.
            make_password(serializer.validated_data['password'])
            # TODO: email the address a "someone tried to register with your
            # address — you already have an account" notice.
        else:
            serializer.save()
            # TODO: send the verification email that activates the account.

        return Response(
            {'message': 'Registration received. Please check your email to continue.'},
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):
    """Email + password -> JWT pair."""

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]          # overrides the global IsAuthenticated default
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'login'
