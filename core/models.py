from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    career_goal = models.CharField(max_length=200, blank=True)
    EXPERIENCE_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVELS, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class SkillAssessment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill_name = models.CharField(max_length=100)
    SELF_RATED_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    self_rated_level = models.CharField(max_length=20, choices=SELF_RATED_LEVELS)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.skill_name} ({self.self_rated_level})"

class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    SOURCE_CHOICES = [
        ('groq_ai', 'Groq AI'),
    ]
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='groq_ai')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"