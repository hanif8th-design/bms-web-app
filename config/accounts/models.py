from django.db import models

# accounts/models.py
import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """Manager for the email-login custom user."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra):
        extra.setdefault("is_staff", False)
        extra.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra)

    def create_superuser(self, email, password, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        if extra["is_staff"] is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra["is_superuser"] is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self._create_user(email, password, **extra)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Global identity + login. Deliberately minimal and business-agnostic.
    Anything per-business (role, status, employee code) lives on Membership.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=32, blank=True)

    # is this account allowed to authenticate at all (NOT the same as
    # being active in a given business — that is Membership.status)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Django-admin access only

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # email + password only

    class Meta:
        db_table = "user"
        indexes = [models.Index(fields=["email"])]

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.full_name or self.email


class Role(models.TextChoices):
    OWNER = "owner", "Owner"
    MANAGER = "manager", "Manager"
    SALESPERSON = "salesperson", "Salesperson"


class MembershipStatus(models.TextChoices):
    INVITED = "invited", "Invited"
    ACTIVE = "active", "Active"
    INACTIVE = "inactive", "Inactive"


class Membership(models.Model):
    """
    The bridge: one row = 'this person, in this business, with this role/status'.
    A User can have many; that is what makes the system multi-tenant.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="memberships"
    )
    organization = models.ForeignKey(
        "organizations.Organization", on_delete=models.CASCADE, related_name="memberships"
    )
    role = models.CharField(max_length=20, choices=Role.choices)
    status = models.CharField(
        max_length=20, choices=MembershipStatus.choices, default=MembershipStatus.INVITED
    )
    employee_code = models.CharField(max_length=40, blank=True)
    job_title = models.CharField(max_length=80, blank=True)

    invited_at = models.DateTimeField(default=timezone.now)
    activated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "membership"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "organization"], name="uniq_user_per_org"
            )
        ]
        indexes = [models.Index(fields=["organization", "status"])]

    def __str__(self):
        return f"{self.user} @ {self.organization} ({self.role})"


class Permission(models.Model):
    """
    Catalogue of guardable ACTIONS (not Django's auth permissions).
    NOT tenant-scoped: the set of possible actions is defined by code and is
    the same for every business. Only the *granting* is per-org (RolePermission).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=60, unique=True)   # e.g. "view_cost"
    label = models.CharField(max_length=120)

    class Meta:
        db_table = "permission"

    def __str__(self):
        return self.code


class RolePermission(models.Model):
    """
    Per-business grant: 'in this org, this role may do this action (up to limit)'.
    Runtime check: user -> membership in this org -> role -> these rows.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        "organizations.Organization", on_delete=models.CASCADE, related_name="role_permissions"
    )
    role = models.CharField(max_length=20, choices=Role.choices)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, related_name="grants")
    allowed = models.BooleanField(default=True)
    limit_value = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=True
    )  # e.g. max discount %

    class Meta:
        db_table = "role_permission"
        constraints = [
            models.UniqueConstraint(
                fields=["organization", "role", "permission"], name="uniq_org_role_perm"
            )
        ]

    def __str__(self):
        return f"{self.organization}:{self.role}:{self.permission.code}={self.allowed}"


class InvitationStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    ACCEPTED = "accepted", "Accepted"
    EXPIRED = "expired", "Expired"


class Invitation(models.Model):
    """
    Pending employee before a Membership exists. Accepting the token creates
    (or reuses) the User and creates the Membership with the invited role.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        "organizations.Organization", on_delete=models.CASCADE, related_name="invitations"
    )
    email = models.EmailField()
    role = models.CharField(max_length=20, choices=Role.choices)
    token = models.CharField(max_length=64, unique=True)
    invited_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="sent_invitations"
    )
    status = models.CharField(
        max_length=20, choices=InvitationStatus.choices, default=InvitationStatus.PENDING
    )
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "invitation"
        indexes = [models.Index(fields=["organization", "status"])]

    def __str__(self):
        return f"invite {self.email} -> {self.organization} ({self.status})"




