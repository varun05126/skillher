from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import Skill, SkillAssessment, CareerPath, AIRecommendation
from .serializers import (
    SkillSerializer,
    SkillAssessmentSerializer,
    CareerPathSerializer,
    AIRecommendationSerializer,
    SkillAssessmentBulkSerializer
)
from .services.ai_service import generate_career_recommendation

User = get_user_model()


class SkillListView(generics.ListAPIView):
    """
    GET /api/skills/
    List all skills.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]


class SkillAssessmentView(APIView):
    """
    POST /api/assessment/
    Submit skill scores for the authenticated user.
    Input: {
        "skill_scores": {
            "Communication": 80,
            "Python": 90,
            "Leadership": 70
        }
    }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = SkillAssessmentBulkSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        skill_scores = serializer.validated_data['skill_scores']
        user = request.user

        # Clear existing assessments for this user? Or update? We'll update/Create for each skill.
        assessments = []
        for skill_name, score in skill_scores.items():
            # Get or create the skill
            skill, created = Skill.objects.get_or_create(
                name=skill_name,
                defaults={
                    'category': 'other',  # Default category, can be updated later
                    'description': ''
                }
            )
            # Update or create assessment
            assessment, created = SkillAssessment.objects.update_or_create(
                user=user,
                skill=skill,
                defaults={
                    'score': score,
                    'level': self._score_to_level(score)
                }
            )
            assessments.append(assessment)

        # Return the created/updated assessments
        assessment_serializer = SkillAssessmentSerializer(assessments, many=True)
        return Response({
            'message': 'Skill assessments saved successfully.',
            'assessments': assessment_serializer.data
        }, status=status.HTTP_201_CREATED)

    def _score_to_level(self, score):
        if score >= 90:
            return 5  # Master
        elif score >= 75:
            return 4  # Expert
        elif score >= 60:
            return 3  # Advanced
        elif score >= 40:
            return 2  # Intermediate
        else:
            return 1  # Beginner


class GenerateRecommendationView(APIView):
    """
    POST /api/recommendations/generate/
    Generate AI career recommendations for the authenticated user.
    Requires the user to have skill assessments.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user

        # Get the user's skill assessments
        assessments = SkillAssessment.objects.filter(user=user)
        if not assessments.exists():
            return Response(
                {'error': 'No skill assessments found. Please submit skill scores first.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prepare profile data (we can get from user's profile if needed)
        # For now, we'll just use the assessments
        profile = {
            'user_id': user.id,
            'email': user.email,
            # We could add more from the profile model if needed
        }

        # Convert assessments to a format suitable for the AI service
        assessment_data = {}
        for assessment in assessments:
            assessment_data[assessment.skill.name] = assessment.score

        # Generate AI recommendation
        try:
            ai_result = generate_career_recommendation(profile, assessment_data)
        except Exception as e:
            return Response(
                {'error': f'Failed to generate recommendation: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Save the recommendation to the database
        recommended_career = None
        if ai_result.get('recommended_career'):
            # Try to get or create the career path
            career_title = ai_result['recommended_career']
            career, created = CareerPath.objects.get_or_create(
                title=career_title,
                defaults={
                    'description': f'Career path for {career_title}',
                    'salary_range': ''
                }
            )
            recommended_career = career

        # Save the AI recommendation
        ai_recommendation = AIRecommendation.objects.create(
            user=user,
            recommended_career=recommended_career,
            skill_gap=ai_result.get('skill_gap', {}),
            roadmap=ai_result.get('roadmap', {}),
            career_readiness_score=ai_result.get('career_readiness_score', 0)
        )

        # Serialize and return
        serializer = AIRecommendationSerializer(ai_recommendation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RecommendationHistoryView(generics.ListAPIView):
    """
    GET /api/recommendations/
    List the user's AI recommendation history.
    """
    serializer_class = AIRecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AIRecommendation.objects.filter(user=self.request.user)