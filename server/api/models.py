from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from . import choices
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from address.models import AddressField
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.

# Important Codes:
# python manage.py migrate --run-syncdb (for clearing and refreshin database changes which usually lead to 'Coloumn not found' errors)
def multiple_of_ten(value):
    if value % 10 != 0:
        raise ValidationError(f'{value} is not a multiple of 10.')
    
class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # These fields are required
    major = models.CharField(max_length=200, choices=choices.MAJOR_CHOICES, blank=True, null=True)
    class_standing = models.CharField(
        max_length=100, choices=choices.CLASS_STANDING_CHOICES, blank=True, null=True,
    )

    # All other fields are nullable
    linkedin = models.URLField(max_length=50, default='http://www.linkedin.com', blank=True, null=True)
    nationality = models.CharField(
        max_length=100, blank=True, null=True, choices=choices.COUNTRY_CHOICES
    )
    race = models.CharField(max_length=100, choices=choices.RACE_CHOICES, blank=True, null=True)
    gender = models.CharField(
        max_length=100, blank=True, null=True, choices=choices.GENDER_CHOICES
    )
    phone = models.IntegerField(blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)
    avatar = models.ImageField(
        upload_to="images", verbose_name="Profile Picture", blank=True, null=True
    )

    # Auth fields
    is_email_verified = models.BooleanField(default=False)

    # Points
    pointsum = models.IntegerField(blank = True, null=True, default=0)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    location = AddressField(on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attendees = models.ManyToManyField(User, related_name='events_attending', blank=True)
    points = models.IntegerField(default=10, validators=[MinValueValidator(10), MaxValueValidator(100), multiple_of_ten])

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = slugify(self.title)
            if Event.objects.filter(slug=slug).exists():
                slug = f'{slug}-{get_random_string(15)}'
            self.slug = slug
        super(Event, self).save(*args, **kwargs)
       

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-start_time']