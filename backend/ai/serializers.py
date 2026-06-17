from rest_framework import serializers
from .models import Skill, SkillAssessment, CareerPath, AIRecommendation
from django.contrib.auth import get_user_model

User = get_user_model()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'category', 'description')


class SkillAssessmentSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    skill_category = serializers.CharField(source='skill.category', read_only=True)

    class Meta:
        model = SkillAssessment
        fields = ('id', 'skill', 'skill_name', 'skill_category', 'score', 'level', 'created_at')
        read_only_fields = ('user',)


class CareerPathSerializer(serializers.ModelSerializer):
    required_skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = CareerPath
        fields = ('id', 'title', 'description', 'salary_range', 'required_skills')


class AIRecommendationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    recommended_career_title = serializers.CharField(source='recommended_career.title', read_only=True)

    class Meta:
        model = AIRecommendation
        fields = ('id', 'user', 'user_email', 'recommended_career', 'recommended_career_title',
                  'skill_gap', 'roadmap', 'career_readiness_score', 'created_at')
        read_only_fields = ('user',)


class SkillAssessmentBulkSerializer(serializers.Serializer):
    skill_scores = serializers.DictField(
        child=serializers.IntegerField(min_value=0, max_value=100),
        help_text="Dictionary of skill names and scores (0-100)"
    )

    def validate_skill_scores(self, value):
        if not value:
            raise serializers.ValidationError("At least one skill score must be provided.")
        return value