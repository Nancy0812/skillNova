from django.urls import path
from .views import CalculateSkillGapsView, LatestSkillGapView

urlpatterns = [
    path('calculate/', CalculateSkillGapsView.as_view(), name='skill_gaps_calculate'),
    path('latest/', LatestSkillGapView.as_view(), name='skill_gaps_latest'),
]
