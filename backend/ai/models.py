from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('technical', 'Technical'),
        ('soft', 'Soft Skills'),
        ('leadership', 'Leadership'),
        ('creative', 'Creative'),
        ('business', 'Business'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = _('Skill')
        verbose_name_plural = _('Skills')

    def __str__(self):
        return self.name


class SkillAssessment(models.Model):
    LEVEL_CHOICES = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
        (4, 'Expert'),
        (5, 'Master'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skill_assessments')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='assessments')
    score = models.IntegerField(help_text="Score from 0 to 100")
    level = models.IntegerField(choices=LEVEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'skill')
        ordering = ['-created_at']
        verbose_name = _('Skill Assessment')
        verbose_name_plural = _('Skill Assessments')

    def __str__(self):
        return f"{self.user.email} - {self.skill.name}: {self.score}"


class CareerPath(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary_range = models.CharField(max_length=100, blank=True, help_text="e.g., $50,000 - $80,000")
    required_skills = models.ManyToManyField(Skill, related_name='career_paths', blank=True)

    class Meta:
        ordering = ['title']
        verbose_name = _('Career Path')
        verbose_name_plural = _('Career Paths')

    def __str__(self):
        return self.title


class AIRecommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_recommendations')
    recommended_career = models.ForeignKey(CareerPath, on_delete=models.SET_NULL, null=True, blank=True, related_name='ai_recommendations')
    skill_gap = models.JSONField(help_text="Dictionary of skill names and gap scores")
    roadmap = models.JSONField(help_text="3-month learning roadmap as JSON")
    career_readiness_score = models.IntegerField(help_text="Score from 0 to 100 indicating readiness for recommended career")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('AI Recommendation')
        verbose_name_plural = _('AI Recommendations')

    def __str__(self):
        return f"{self.user.email} - {self.recommended_career.title if self.recommended_career else 'No Career'}"