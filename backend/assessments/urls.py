from django.urls import path
from .views import QuestionListView, AssessmentSubmitView, AssessmentHistoryView

urlpatterns = [
    path('questions/', QuestionListView.as_view(), name='questions_list'),
    path('submit/', AssessmentSubmitView.as_view(), name='assessment_submit'),
    path('history/', AssessmentHistoryView.as_view(), name='assessment_history'),
]
