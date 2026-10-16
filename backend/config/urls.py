"""
SkillNova Root URL Configuration
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('jobs.urls')),
    path('api/assessments/', include('assessments.urls')),
    path('api/skill-gaps/', include('matching.urls')),
    path('api/', include('roadmaps.urls')),
]
