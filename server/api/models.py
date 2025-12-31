from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from . import choices
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from django.core.validators import MaxValueValidator, MinValueValidator 
import uuid

# Create your models here.
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
    check_in_code = models.CharField(max_length=10, blank=True, unique=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attendees = models.ManyToManyField(User, related_name='events_attending', through="EventAttendance", blank=True)
    points = models.IntegerField(default=10, validators=[MinValueValidator(10), MaxValueValidator(100), multiple_of_ten])
    location = models.CharField(max_length=255, help_text="e.g. 'Student Union Ballroom'")
    address = models.CharField(max_length=255, help_text="Full formatted address")
    latitude = models.FloatField()
    longitude = models.FloatField()
    google_place_id = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = slugify(self.title)
            if not slug or Event.objects.filter(slug=slug).exists():
                slug = f'{slug}-{get_random_string(15)}'
            self.slug = slug

        if not self.check_in_code:
            self.check_in_code = get_random_string(length=6).upper()
        super(Event, self).save(*args, **kwargs)
       

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-start_time"]


class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registrations')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    
    qr_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    checked_in_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ('user', 'event') # Prevent double registration

    @property
    def is_checked_in(self):
        return self.checked_in_at is not None

class EventAttendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)
    checked_in_at = models.DateTimeField(null=True, blank=True)
    qr_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    class Meta:
        unique_together = ("user", "event")
    