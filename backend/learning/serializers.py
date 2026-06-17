from rest_framework import serializers
from .models import (
    Skill, UserSkill, LearningGoal, Course, CourseProgress,
    Roadmap, RoadmapMilestone, Achievement, UserAchievement, Certificate
)
from accounts.serializers import UserSerializer, ProfileSerializer
from accounts.models import User


class SkillSerializer(serializers.ModelSerializer):
    subskills = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ('id', 'name', 'category', 'description', 'icon_url', 'parent_skill', 'subskills', 'is_active', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_subskills(self, obj):
        # Return direct subskills only (not recursive) to avoid deep nesting
        subskills = obj.subskills.all()
        return SkillSerializer(subskills, many=True, context=self.context).data


class UserSkillSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skill = SkillSerializer(read_only=True)
    skill_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), source='skill', write_only=True)

    class Meta:
        model = UserSkill
        fields = ('id', 'user', 'skill', 'skill_id', 'proficiency_level', 'last_assessed', 'assessment_method', 'evidence_urls', 'verified_by_mentor', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def create(self, validated_data):
        # Ensure the user is set from the request context
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class LearningGoalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    target_skill = SkillSerializer(read_only=True)
    target_skill_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), source='target_skill', write_only=True, required=False, allow_null=True)

    class Meta:
        model = LearningGoal
        fields = ('id', 'user', 'title', 'description', 'target_skill', 'target_skill_id', 'target_proficiency', 'start_date', 'target_end_date', 'status', 'progress_percentage', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CourseSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), many=True, source='skills', write_only=True)
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='author', write_only=True, required=False, allow_null=True)
    prerequisites = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True, source='prerequisites', write_only=True, required=False)

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'short_description', 'skills', 'skill_ids', 'level', 'format', 'duration_minutes', 'author', 'author_id', 'is_premium', 'is_featured', 'thumbnail_url', 'prerequisites', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')


class CourseProgressSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True)

    class Meta:
        model = CourseProgress
        fields = ('id', 'user', 'course', 'course_id', 'progress_percentage', 'completed_lessons', 'quiz_scores', 'last_accessed', 'completed_at', 'certificate_issued', 'certificate')
        read_only_fields = ('id', 'user', 'last_accessed', 'completed_at', 'certificate_issued')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class RoadmapMilestoneSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), many=True, source='skills', write_only=True, required=False)
    # Assuming we have a Resource model in resources app, we'll use a placeholder for now.
    # We'll use a string representation for resources to avoid circular dependency.
    resources = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = RoadmapMilestone
        fields = ('id', 'roadmap', 'title', 'description', 'skills', 'skill_ids', 'order_index', 'estimated_hours', 'deliverable_description', 'resources', 'is_completed', 'completed_at', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')


class RoadmapSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    milestones = RoadmapMilestoneSerializer(many=True, read_only=True)

    class Meta:
        model = Roadmap
        fields = ('id', 'user', 'title', 'description', 'target_role', 'industry', 'duration_weeks', 'milestone_count', 'status', 'ai_generated', 'created_at', 'updated_at', 'milestones')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at', 'milestones')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'name', 'description', 'icon_url', 'criteria_type', 'criteria_value', 'points_value', 'is_secret', 'created_at')
        read_only_fields = ('id', 'created_at')


class UserAchievementSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    achievement = AchievementSerializer(read_only=True)
    achievement_id = serializers.PrimaryKeyRelatedField(queryset=Achievement.objects.all(), source='achievement', write_only=True)

    class Meta:
        model = UserAchievement
        fields = ('id', 'user', 'achievement', 'achievement_id', 'earned_at', 'evidence_data', 'is_featured_on_profile')
        read_only_fields = ('id', 'user', 'earned_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CertificateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True, required=False, allow_null=True)
    skill = SkillSerializer(read_only=True)
    skill_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), source='skill', write_only=True, required=False, allow_null=True)

    class Meta:
        model = Certificate
        fields = ('id', 'user', 'course', 'course_id', 'skill', 'skill_id', 'issued_by', 'credential_id', 'issued_at', 'expires_at', 'certificate_url', 'blockchain_hash')
        read_only_fields = ('id', 'user', 'issued_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)