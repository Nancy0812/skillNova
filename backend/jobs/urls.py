from django.urls import path
from .views import RoleListView, RoleDetailView, SkillListView, JobListView

urlpatterns = [
    path('roles/', RoleListView.as_view(), name='roles_list'),
    path('roles/<str:role_id>/', RoleDetailView.as_view(), name='role_detail'),
    path('skills/', SkillListView.as_view(), name='skills_list'),
    path('jobs/', JobListView.as_view(), name='jobs_list'),
]
