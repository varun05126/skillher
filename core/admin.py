from django.contrib import admin
from .models import Profile, SkillAssessment, Recommendation

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'experience_level', 'career_goal')
    list_filter = ('experience_level',)
    search_fields = ('user__username', 'bio', 'career_goal')


@admin.register(SkillAssessment)
class SkillAssessmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'skill_name', 'self_rated_level', 'years_of_experience', 'confidence_level', 'frequency_use', 'formal_training', 'created_at')
    list_filter = ('self_rated_level', 'years_of_experience', 'confidence_level', 'frequency_use', 'formal_training', 'created_at')
    search_fields = ('user__username', 'skill_name', 'primary_goal')
    readonly_fields = ('created_at',)


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'source', 'created_at')
    list_filter = ('source', 'created_at')
    search_fields = ('user__username', 'title', 'description')
    readonly_fields = ('created_at',)
