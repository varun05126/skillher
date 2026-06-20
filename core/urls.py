from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .forms import BootstrapAuthenticationForm

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html', form_class=BootstrapAuthenticationForm), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('assessment/', views.assessment, name='assessment'),
    path('recommendations/', views.recommendations, name='recommendations'),
    path('profile/', views.profile, name='profile'),
]