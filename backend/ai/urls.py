from django.urls import path
from .views import (
    SkillListView,
    SkillAssessmentView,
    GenerateRecommendationView,
    RecommendationHistoryView
)

urlpatterns = [
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('assessment/', SkillAssessmentView.as_view(), name='skill-assessment'),
    path('recommendations/generate/', GenerateRecommendationView.as_view(), name='generate-recommendation'),
    path('recommendations/', RecommendationHistoryView.as_view(), name='recommendation-history'),
]