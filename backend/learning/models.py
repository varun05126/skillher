from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import User


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
    icon_url = models.URLField(blank=True)
    parent_skill = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subskills')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class UserSkill(models.Model):
    PROFICIENCY_LEVELS = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
        (4, 'Expert'),
        (5, 'Master'),
    ]

    ASSESSMENT_METHODS = [
        ('self', 'Self-Assessment'),
        ('quiz', 'Quiz'),
        ('project', 'Project'),
        ('peer', 'Peer Review'),
        ('mentor', 'Mentor Verified'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='skilled_users')
    proficiency_level = models.IntegerField(choices=PROFICIENCY_LEVELS)
    last_assessed = models.DateTimeField(null=True, blank=True)
    assessment_method = models.CharField(max_length=10, choices=ASSESSMENT_METHODS, default='self')
    evidence_urls = models.JSONField(default=list, blank=True)  # List of URLs to evidence
    verified_by_mentor = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'skill')

    def __str__(self):
        return f"{self.user.email} - {self.skill.name} ({self.get_proficiency_level_display()})"


class LearningGoal(models.Model):
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='learning_goals')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    target_skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='learning_goals')
    target_proficiency = models.IntegerField(choices=UserSkill.PROFICIENCY_LEVELS)
    start_date = models.DateField()
    target_end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    progress_percentage = models.IntegerField(default=0, help_text="Progress percentage (0-100)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.title}"


class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    FORMAT_CHOICES = [
        ('video', 'Video'),
        ('article', 'Article'),
        ('interactive', 'Interactive'),
        ('project', 'Project'),
        ('mixed', 'Mixed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    skills = models.ManyToManyField(Skill, related_name='courses')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    duration_minutes = models.IntegerField(help_text="Duration in minutes")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='authored_courses')
    is_premium = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    thumbnail_url = models.URLField(blank=True)
    prerequisites = models.ManyToManyField('self', symmetrical=False, related_name='dependent_courses', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CourseProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='progress_entries')
    progress_percentage = models.IntegerField(default=0, help_text="Progress percentage (0-100)")
    completed_lessons = models.JSONField(default=list, blank=True)  # List of lesson IDs or indices completed
    quiz_scores = models.JSONField(default=dict, blank=True)  # Dictionary of quiz IDs to scores
    last_accessed = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    certificate_issued = models.BooleanField(default=False)
    certificate = models.OneToOneField('Certificate', on_delete=models.SET_NULL, null=True, blank=True, related_name='course_progress')

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.email} - {self.course.title} ({self.progress_percentage}%)"


class Roadmap(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roadmaps')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    target_role = models.CharField(max_length=255, blank=True)
    industry = models.CharField(max_length=100, blank=True)
    duration_weeks = models.IntegerField(help_text="Duration in weeks")
    milestone_count = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    ai_generated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.title}"


class RoadmapMilestone(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name='milestones')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    skills = models.ManyToManyField(Skill, related_name='milestones')
    order_index = models.IntegerField(help_text="Order in the roadmap")
    estimated_hours = models.IntegerField(help_text="Estimated hours to complete")
    deliverable_description = models.TextField(blank=True)
    resources = models.ManyToManyField('resources.Resource', blank=True, related_name='milestones')  # Assuming resources app has a Resource model
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_index']
        unique_together = ('roadmap', 'order_index')

    def __str__(self):
        return f"{self.roadmap.title} - Milestone {self.order_index}: {self.title}"


class Achievement(models.Model):
    CRITERIA_TYPE_CHOICES = [
        ('course_completion', 'Course Completion'),
        ('skill_level', 'Skill Level Achieved'),
        ('streak', 'Learning Streak'),
        ('community', 'Community Participation'),
        ('mentor_sessions', 'Mentor Sessions Completed'),
        ('job_applied', 'Job Application Submitted'),
        ('event_attended', 'Event Attended'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    icon_url = models.URLField(blank=True)
    criteria_type = models.CharField(max_length=30, choices=CRITERIA_TYPE_CHOICES)
    criteria_value = models.JSONField(help_text="JSON object defining the criteria for this achievement")
    points_value = models.IntegerField(default=10)
    is_secret = models.BooleanField(default=False, help_text="If True, achievement is hidden until earned")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='earned_by')
    earned_at = models.DateTimeField(auto_now_add=True)
    evidence_data = models.JSONField(default=dict, blank=True, help_text="Data evidencing the achievement")
    is_featured_on_profile = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.email} earned {self.achievement.name}"


class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='certificates')
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='certificates')
    issued_by = models.CharField(max_length=255, default='SkillHer')
    credential_id = models.CharField(max_length=255, unique=True, help_text="Unique identifier for the certificate")
    issued_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    certificate_url = models.URLField(help_text="URL to view or download the certificate")
    blockchain_hash = models.CharField(max_length=255, blank=True, help_text="Optional hash for blockchain verification")

    def __str__(self):
        return f"Certificate {self.credential_id} for {self.user.email}"