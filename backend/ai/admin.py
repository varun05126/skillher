from django.contrib import admin
from .models import Skill, SkillAssessment, CareerPath, AIRecommendation


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')


@admin.register(SkillAssessment)
class SkillAssessmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'skill', 'score', 'level', 'created_at')
    list_filter = ('level', 'created_at')
    search_fields = ('user__email', 'skill__name')


@admin.register(CareerPath)
class CareerPathAdmin(admin.ModelAdmin):
    list_display = ('title', 'salary_range')
    search_fields = ('title', 'description')
    filter_horizontal = ('required_skills',)


@admin.register(AIRecommendation)
class AIRecommendationAdmin(admin.ModelAdmin):
    list_display = ('user', 'recommended_career', 'career_readiness_score', 'created_at')
    list_filter = ('created_at', 'career_readiness_score')
    search_fields = ('user__email', 'recommended_career__title')
    readonly_fields = ('created_at',)