from django.db import models
from django.contrib.auth.models import User


class Roadmap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roadmaps', null=True, blank=True)
    target_role_id = models.CharField(max_length=50, default='ROLE_WD_01')
    target_role_title = models.CharField(max_length=150, default='Frontend Developer')
    total_weeks = models.IntegerField(default=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.target_role_title} Roadmap ({self.total_weeks} Weeks)"


class RoadmapTask(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name='tasks')
    week_number = models.IntegerField(default=1)
    skill_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField()
    estimated_hours = models.FloatField(default=2.5)
    task_type = models.CharField(max_length=50, default='study')  # study, project, assessment
    resource_url = models.CharField(max_length=500, blank=True, default='')
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"W{self.week_number}: {self.title} [{'DONE' if self.is_completed else 'PENDING'}]"


class LearningResource(models.Model):
    title = models.CharField(max_length=200)
    skill_name = models.CharField(max_length=100)
    level = models.CharField(max_length=50, default='Beginner')  # Beginner, Intermediate, Advanced
    format = models.CharField(max_length=50, default='Documentation')  # Documentation, Interactive, Video Course, Guide
    cost_category = models.CharField(max_length=50, default='Free')
    estimated_duration = models.CharField(max_length=50, default='4 hours')
    source_url = models.CharField(max_length=500)
    is_verified_free = models.BooleanField(default=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} ({self.skill_name}) - {self.cost_category}"


class StudentProject(models.Model):
    title = models.CharField(max_length=200)
    target_role_family = models.CharField(max_length=100)
    target_role_title = models.CharField(max_length=100)
    skills_practiced = models.JSONField(default=list)
    difficulty = models.CharField(max_length=50, default='Beginner')  # Beginner, Intermediate
    description = models.TextField()
    deliverables = models.JSONField(default=list)
    estimated_hours = models.IntegerField(default=8)

    def __str__(self):
        return f"{self.title} ({self.target_role_title})"
