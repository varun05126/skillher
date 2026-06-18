from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/career/', include('career.urls')),
    path('api/learning/', include('learning.urls')),
    path('api/resources/', include('resources.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/ai/', include('ai.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve React frontend for any non-API routes (for client-side routing)
# React frontend routes only
urlpatterns += [
    re_path(
        r'^(?!api/)(?!admin/)(?!static/)(?!media/)(?!assets/).*$',
        TemplateView.as_view(template_name='index.html')
    ),
]