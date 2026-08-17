import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """Manager for the email-login custom user."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Global identity + login. Deliberately minimal and business-agnostic.
    Anything per-business (role, status, employee code) lives on Membership.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=32, blank=True)

    # is this account allowed to authenticate at all (NOT the same as
    # being active in a given business — that is Membership.status)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Django-admin access only

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]  # asked for by createsuperuser

    class Meta:
        db_table = "user"
        indexes = [models.Index(fields=["email"])]

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name or self.email



RECOVERY_CHOICES = [
    ("P", "Pending user action"),
    ("F", "Password recovery failed to send"),
    ("R", "Password successfully recovered"),
]

class PasswordRecovery(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    datetime_active_until = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    email = models.EmailField(null=False, blank=False)
    recovery_email_sent = models.BooleanField(null=False, blank=False, default=False)
    status = models.CharField(null=False, blank=False, max_length=1, choices=RECOVERY_CHOICES, default="P")
    is_active = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.email
    
 