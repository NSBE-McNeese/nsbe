from django.shortcuts import get_object_or_404
from api.models import User, Event
from api.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
import jwt
from django.conf import settings
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from .models import *
from datetime import timedelta


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Automatically raise validation errors
        serializer.save()
        return Response(
            {"message": "A confirmation link has been sent to your email"},
            status=status.HTTP_201_CREATED,
        )


class CustomTokenVerifyView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        if not token:
            return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            access_token = AccessToken(token)
            user_id = access_token.get("user_id")
            action = access_token.get("action")
            user = get_object_or_404(User, id=user_id)
            user_serializer = self.serializer_class(user)

            if action == "register":
                user.is_active = True
                user.is_email_verified = True
                user.save()
                return Response(
                    {
                        "message": "Your email has been verified. You can now log in.",
                        "action": action,
                        "user": user_serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )

            elif action == "password_reset":
                return Response(
                    {
                        "message": "Your email has been verified. You can proceed to reset your password.",
                        "action": action,
                        "user": user_serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )

            else:
                return Response(
                    {"message": "Invalid action", "action": None},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except (jwt.InvalidTokenError, jwt.ExpiredSignatureError):
            return Response(
                {"message": "Invalid token or Token Error"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)


class PasswordResetView(generics.UpdateAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "No user registered under this email."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(user, data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  # This can help you debug validation issues
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(
            {"detail": "Password has been changed successfully."},
            status=status.HTTP_200_OK,
        )


class Events(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        if serializer:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No events found"}, status=status.HTTP_400_BAD_REQUEST)


class EventDetail(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, slug):
        try:
            event = Event.objects.get(slug=slug)
            serializer = EventSerializer(event, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({"message": "Event not found."}, status=status.HTTP_404_NOT_FOUND)


class EventRegister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, slug):
        user = request.user
        event = get_object_or_404(Event, slug=slug)
        obj, created = EventAttendance.objects.get_or_create(user=user, event=event)
        if user in event.attendees.all() or not created:
            return Response(
                {"message": "Registration failed! User is already registered to this event"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        event.attendees.add(user)
        serializer = EventSerializer(event)
        subject = "NSBE Event Registration"
        message = f"Hello {user}, You successfull registered for {event.title} by NSBE that will take place from {event.start_time} to {event.end_time}"
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        return Response(
            {"message": "Registered successfully.", "event": serializer.data},
            status=status.HTTP_200_OK,
        )


class EventUnregister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, slug):
        try:
            user = request.user
            event = get_object_or_404(Event, slug=slug)
            serializer = EventSerializer(event, context={"request": request})
            if user not in event.attendees.all():
                return Response(
                    {
                        "message": "Unregistration failed! User is not registered to this event",
                        "event": serializer.data,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            event.attendees.remove(user)
            message = f"Hello {user}, You successfull unregistered for {event.title} by NSBE that will take place from {event.start_time} to {event.end_time}"
            subject = "NSBE Event Unregistration"
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            return Response(
                {"message": "Unregistered successfully.", "event": serializer.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserEventActionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        try:
            attendance = EventAttendance.objects.get(user=request.user, event__slug=slug)
            return Response(
                {
                    "is_registered": True,
                    "qr_token": str(attendance.qr_token),
                    "checked_in": attendance.is_checked_in,
                    "event_title": attendance.event.title,
                }
            )
        except EventAttendance.DoesNotExist:
            return Response({"is_registered": False}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, slug):
        event = get_object_or_404(Event, slug=slug)
        user = request.user

        attendance, created = EventAttendance.objects.get_or_create(user=user, event=event)
        event.attendees.add(user)

        if not created:
            return Response({"message": "Already registered"}, status=status.HTTP_200_OK)

        # Optional: Send Email here if you want...

        return Response(
            {
                "success": True,
                "message": "Registered successfully",
                "qr_token": attendance.qr_token,
            },
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, slug):
        event = get_object_or_404(Event, slug=slug)
        user = request.user

        try:
            attendance = EventAttendance.objects.get(user=user, event=event)
            attendance.delete()
            event.attendees.remove(user)

        except EventAttendance.DoesNotExist:
            return Response({"message": "Not registered"}, status=status.HTTP_404_NOT_FOUND)

        return Response(
            {"success": True, "message": "Unregistered successfully"},
            status=status.HTTP_200_OK,
        )


class AdminScanView(APIView):
    # Only Admins can hit this endpoint
    permission_classes = [IsAdminUser]

    def post(self, request):
        token = request.data.get("qr_token")

        # Find the ticket by the unique QR token
        try:
            attendance = EventAttendance.objects.get(qr_token=token)
        except EventAttendance.DoesNotExist:
            return Response(
                {"error": "Invalid Ticket - Not Found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if attendance.checked_in_at:
            return Response(
                {"error": f"Ticket already scanned for {attendance.user.first_name}!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        attendance.checked_in_at = timezone.now()
        attendance.save()

        user = attendance.user
        points_to_add = attendance.event.points if hasattr(attendance.event, "points") else 0

        # Safely add points (assuming pointsum is a field on User)
        if hasattr(user, "pointsum"):
            user.pointsum = (user.pointsum or 0) + points_to_add
            user.save()

        return Response(
            {
                "success": True,
                "user": f"{user.first_name} {user.last_name}",
                "points_added": points_to_add,
                "message": "Check-in Successful!",
            }
        )


class DashboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        # Get ONLY events where the user actually checked in
        attendance_records = EventAttendance.objects.filter(
            user=user, checked_in_at__isnull=False
        ).select_related("event")

        total_points = user.pointsum if user.pointsum else 0

        # Active Status Logic
        now = timezone.now()
        start_of_week = now - timedelta(days=now.weekday())  # Monday
        four_months_ago = now - timedelta(weeks=16)
        is_active_week = attendance_records.filter(checked_in_at__gte=start_of_week).exists()
        is_active_16_weeks = attendance_records.filter(checked_in_at__gte=four_months_ago).exists()

        # Activation Checklist
        checklist = {
            "profile_complete": all(
                [user.major, user.class_standing, user.first_name, user.last_name]
            ),
            "email_verified": user.is_email_verified,
            "attended_first_event": attendance_records.exists(),
        }

        top_members = User.objects.filter(pointsum__gt=0).order_by("-pointsum")[:10]

        response_data = {
            "total_points": total_points,
            "events_attended": attendance_records.count(),
            "status": {
                "this_week": "Active" if is_active_week else "Inactive",
                "last_16_weeks": "Active" if is_active_16_weeks else "Inactive",
            },
            "activation": {
                "is_activated": all(checklist.values()),
                "checklist": checklist,
            },
            "member_posts": [
                {
                    "points": record.event.points,
                    "start_time": record.event.start_time,
                    "title": record.event.title,
                }
                for record in attendance_records
            ],
            "top_members": [
                {
                    "first_name": member.first_name,
                    "last_name": member.last_name,
                    "pointsum": member.pointsum,
                }
                for member in top_members
            ],
        }

        return Response(response_data, status=status.HTTP_200_OK)


class DirectoryListView(generics.ListAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    queryset = User.objects.filter(is_active=True)
    serializer_class = DirectorySerializer


class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserUpdateSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = request.user
        password = request.data.get("password")

        if not password:
            return Response(
                {"error": "Password is required to delete your account."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(password):
            return Response({"error": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)

        user.delete()
        return Response({"message": "Account deleted successfully."}, status=status.HTTP_200_OK)
