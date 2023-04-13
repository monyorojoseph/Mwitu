import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(max_length=100,  unique=True)

    GOOGLE = 'Google'
    EMAIL = 'Email'

    PROVIDERS = [
        (GOOGLE,  'google'),
        (EMAIL,  'email')
    ]
    
    provider = models.CharField(max_length=50, choices=PROVIDERS, default=GOOGLE)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'

    def __str__(self) -> str:
        return self.email
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Profile(models.Model):
    user = models.OneToOneField('CustomUser',  related_name='profile', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    email = models.EmailField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.full_name if self.full_name else self.email

# version 2.0 add Organization