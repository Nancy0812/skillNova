from django.urls import path
from .views import (
    RoadmapCurrentView, RoadmapGenerateView, TaskToggleView,
    ResourceListView, ProjectListView, ProgressView
)

urlpatterns = [
    path('roadmaps/current/', RoadmapCurrentView.as_view(), name='roadmap_current'),
    path('roadmaps/generate/', RoadmapGenerateView.as_view(), name='roadmap_generate'),
    path('roadmaps/tasks/<int:pk>/toggle/', TaskToggleView.as_view(), name='task_toggle'),
    path('resources/', ResourceListView.as_view(), name='resources_list'),
    path('projects/', ProjectListView.as_view(), name='projects_list'),
    path('progress/', ProgressView.as_view(), name='progress_summary'),
]
