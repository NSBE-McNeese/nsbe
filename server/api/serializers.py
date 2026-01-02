from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken
import logging
import uuid
from django.utils import timezone

logger = logging.getLogger(__name__)

# Frontend base URL (configured in settings; falls back to localhost only if not set)
base_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "major", "class_standing")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adding custom claims
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["major"] = user.major
        token["class_standing"] = user.class_standing
        token["is_email_verified"] = user.is_email_verified
        return token


def send_email_verification_token(user, verification_link, subject, message):
    try:
        email_from = settings.EMAIL_HOST_USER
        send_mail(subject, message, email_from, [user.email], fail_silently=False)
    except Exception as e:
        logger.error(f"Error sending email verification: {e}")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "password",
            "password2",
            "major",
            "class_standing",
        )

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords must match."})
        if not attrs["email"].endswith("@mcneese.edu"):
            raise serializers.ValidationError({"email": "Only emails from McNeese are allowed."})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password2")
        validated_data["username"] = str(uuid.uuid4())  # Generate random username

        # Create user instance
        user = User(**validated_data)
        user.set_password(password)
        user.is_active = False  # Set user as inactive until they verify their email
        user.save()

        # Generate a random email verification token
        access_token = AccessToken.for_user(user)
        access_token["action"] = "register"
        # Send verification email with access token
        verification_link = f"{base_url}/verify?token={str(access_token)}"

        subject = "NSBE App: Email Verification Required"
        message = f"""
            Hi {user.first_name},
            
            Welcome to the NSBE App! Please verify your email by clicking the link below:
            {verification_link}
            
            If the link doesn't work, copy and paste the URL into your browser.
        """
        send_email_verification_token(user, verification_link, subject, message)

        return user


class PasswordResetRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ("email",)

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email=email)
            access_token = AccessToken.for_user(user)
            access_token["action"] = "password_reset"
            verification_link = f"{base_url}/verify?token={str(access_token)}"

            subject = "NSBE App: Password Reset Verification Required"
            message = f"""
                Hi {user.first_name},
                
                You requested a password reset. Please verify your email by clicking the link below:
                {verification_link}
                
                If the link doesn't work, copy and paste the URL into your browser.
            """
            send_email_verification_token(user, verification_link, subject, message)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "No user registered under this email."})
        return attrs


class PasswordResetSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("email", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        instance.set_password(password)
        instance.save()

        # Send confirmation email for password change
        subject = "NSBE App: Password Changed Successfully"
        message = f"Hi {instance.first_name}, your password has been changed successfully."
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [instance.email],
            fail_silently=False,
        )

        return instance


class EventSerializer(serializers.ModelSerializer):
    attendees = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    check_in_code = serializers.SerializerMethodField()

    def get_check_in_code(self, obj):
        request = self.context.get("request")

        if request and request.user.is_staff:
            return obj.check_in_code
        return None

    class Meta:
        model = Event
        fields = [
            "slug",
            "title",
            "description",
            "location",
            "address",
            "latitude",
            "longitude",
            "start_time",
            "end_time",
            "attendees",
            "check_in_code",
        ]


class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "major", "class_standing"]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "major",
            "class_standing",
            "gender",
            "race",
            "nationality",
            "phone",
            "linkedin",
            "birthdate",
        ]
        # Prevent any updates to email
        read_only_fields = ["email"]


class EventAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventAttendance
        fields = ["id", "event", "qr_token", "registered_at", "checked_in_at"]
