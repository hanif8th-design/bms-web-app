from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """Sign a new person up: first name, last name, email, password."""


    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate_email(self, value):
        # one canonical form, so Test@X.com and test@x.com are the same identity
        return value.strip().lower()

    def validate(self, attrs):
        # run AUTH_PASSWORD_VALIDATORS with an unsaved User attached so
        # UserAttributeSimilarityValidator can reject passwords built from
        # the person's own email/name
        candidate = User(
            email=attrs.get('email', ''),
            first_name=attrs.get('first_name', ''),
            last_name=attrs.get('last_name', ''),
        )
        try:
            validate_password(attrs['password'], user=candidate)
        except DjangoValidationError as exc:
            raise serializers.ValidationError({'password': list(exc.messages)})
        return attrs

    def create(self, validated_data):
        # always go through the manager so the password is hashed
        return User.objects.create_user(**validated_data)


class LoginSerializer(TokenObtainPairSerializer):
    """
    Email + password -> JWT pair.

    Builds on SimpleJWT's serializer so authentication still runs through
    django.contrib.auth.authenticate(), which hashes a dummy password when the
    email is unknown. That keeps "no such user" and "wrong password" the same
    duration, so response time can't be used to enumerate accounts.
    """

    def validate(self, attrs):
        # emails are stored lowercase, and authenticate() looks the user up by
        # exact match -- without this, "Ali@X.com" fails to log in to the
        # account registered as "ali@x.com"
        attrs[self.username_field] = attrs.get(self.username_field, '').strip().lower()

        # super() raises AuthenticationFailed with one generic message for
        # unknown email, wrong password, and inactive account alike
        data = super().validate(attrs)

        data['user'] = {
            'id': str(self.user.id),
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
        return data
