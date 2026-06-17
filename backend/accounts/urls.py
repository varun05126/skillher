from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    UserViewSet,
    ProfileViewSet,
    NotificationViewSet,
    NotificationDetailViewSet,
    MarkNotificationAsReadView,
    MarkAllNotificationsAsReadView,
    PasswordResetView,
    PasswordResetConfirmView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()
# We are not using the router for ViewSets that are not full CRUD, but we can register if needed.
# For simplicity, we'll define explicit paths.

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # User and Profile
    path('user/', UserViewSet.as_view(), name='user-detail'),
    path('profile/', ProfileViewSet.as_view(), name='profile-detail'),

    # Notifications
    path('notifications/', NotificationViewSet.as_view(), name='notification-list'),
    path('notifications/<int:pk>/', NotificationDetailViewSet.as_view(), name='notification-detail'),
    path('notifications/<int:pk>/read/', MarkNotificationAsReadView.as_view(), name='notification-mark-read'),
    path('notifications/read_all/', MarkAllNotificationsAsReadView.as_view(), name='notifications-mark-all-read'),

    # Password Reset
    path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]