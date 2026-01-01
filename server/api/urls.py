from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views

urlpatterns = [
    # Auth Views
    path("auth/token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path("auth/token/verify/", views.CustomTokenVerifyView.as_view(), name="token_verify"),
    path(
        "auth/password-reset-request/",
        views.PasswordResetRequestView.as_view(),
        name="password_reset_request",
    ),
    path("auth/password-reset/", views.PasswordResetView.as_view(), name="password_reset"),
    # API views
    path("events/", views.Events.as_view(), name="events"),
    path("events/<slug:slug>/", views.EventDetail.as_view(), name="event"),
    path(
        "events/<slug:slug>/register/",
        views.EventRegister.as_view(),
        name="event_register",
    ),
    path(
        "events/<slug:slug>/unregister/",
        views.EventUnregister.as_view(),
        name="event_unregister",
    ),
    path("dashboard/", views.DashboardView.as_view(), name="dashboard"),
    path("directory/", views.DirectoryListView.as_view(), name="directory-list"),
    path("profile/update/", views.UserProfileUpdateView.as_view(), name="profile-update"),
    path(
        "events/<int:event_id>/attendance/",
        views.UserEventActionView.as_view(),
        name="event-attendance",
    ),
    path("check-in/", views.AdminScanView.as_view(), name="admin-check-in"),
    path(
        "events/<slug:slug>/attendance/",
        views.UserEventActionView.as_view(),
        name="event-attendance",
    ),
]
