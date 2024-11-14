from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from api.models import User, Event
from api.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
import jwt
from django.conf import settings
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

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
        return Response({"message": "A confirmation link has been sent to your email"}, status=status.HTTP_201_CREATED)


class CustomTokenVerifyView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            access_token = AccessToken(token)
            user_id = access_token.get("user_id")
            action = access_token.get("action")
            user = get_object_or_404(User, id=user_id)
            user_serializer = self.serializer_class(user)

            if action == 'register':
                user.is_active = True
                user.is_email_verified = True
                user.save()
                return Response({
                    "message": "Your email has been verified. You can now log in.",
                    "action": action,
                    "user": user_serializer.data
                }, status=status.HTTP_200_OK)

            elif action == 'password_reset':
                return Response({
                    "message": "Your email has been verified. You can proceed to reset your password.",
                    "action": action,
                    "user": user_serializer.data
                }, status=status.HTTP_200_OK)

            else:
                return Response({
                    "message": "Invalid action",
                    "action": None
                }, status=status.HTTP_400_BAD_REQUEST)

        except (jwt.InvalidTokenError, jwt.ExpiredSignatureError):
            return Response({"message": "Invalid token or Token Error"}, status=status.HTTP_400_BAD_REQUEST)

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
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "No user registered under this email."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(user, data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  # This can help you debug validation issues
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"detail": "Password has been changed successfully."}, status=status.HTTP_200_OK)

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
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({"message": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

class EventRegister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, slug):
        try:
            user = request.user
            event = get_object_or_404(Event, slug=slug)
            if user in event.attendees.all():
                return Response({"message": "Registration failed! User is already registered to this event"}, status=status.HTTP_400_BAD_REQUEST)
            event.attendees.add(user) 
            serializer = EventSerializer(event)
            subject = "NSBE Event Registration"
            message = f"Hello {user}, You successfull registered for {event.title} by NSBE that will take place from {event.start_time} to {event.end_time}"
            send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
            return Response({"message": "Registered successfully.", "event": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            print("error", str(e))
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EventUnregister(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, slug):
        try:
            user = request.user
            event = get_object_or_404(Event, slug=slug)
            serializer = EventSerializer(event, context={'request': request})
            if user not in event.attendees.all():
                return Response({"message": "Unregistration failed! User is not registered to this event", "event": serializer.data}, status=status.HTTP_400_BAD_REQUEST)
            event.attendees.remove(user)  
            message = f"Hello {user}, You successfull unregistered for {event.title} by NSBE that will take place from {event.start_time} to {event.end_time}"
            subject = "NSBE Event Unregistration"
            send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
            return Response({"message": "Unregistered successfully.", "event": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class Points(APIView):
    def get(self, request):
        user = request.user
        member = User.objects.get(id=user.id)

        # Get member's posts and calculate points
        member_posts = member.events_attending.all()
        total_points = member_posts.aggregate(total_points=models.Sum('points'))['total_points'] or 0
        events_attended = member_posts.count()

        # Get top members
        top_members = User.objects.all().order_by('-pointsum')[:10]

        # Prepare response data
        response_data = {
            'total_points': total_points,
            'events_attended': events_attended,
            'member_posts': [
                {
                    'points': event.points,
                    'start_time': event.start_time,
                    'title': event.title
                }
                for event in member_posts
            ],
            'top_members': [
                {
                    'first_name': member.first_name,
                    'last_name': member.last_name,
                    'pointsum': member.pointsum
                }
                for member in top_members
            ]
        }

        return Response(response_data, status=status.HTTP_200_OK)
