from django.db import models
from django.contrib.auth.models import User
from jobs.models import Skill


class AssessmentQuestion(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    options = models.JSONField(help_text="List of string options")
    correct_option_index = models.IntegerField(help_text="0-indexed correct option")
    explanation = models.TextField()
    difficulty = models.CharField(max_length=20, default='beginner')

    def __str__(self):
        return f"[{self.skill.name}] {self.question_text[:50]}..."


class AssessmentAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessment_attempts', null=True, blank=True)
    skill_name = models.CharField(max_length=100)
    score = models.FloatField()
    total_questions = models.IntegerField()
    correct_count = models.IntegerField()
    answers = models.JSONField(default=list)
    passed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username if self.user else 'Anonymous'} - {self.skill_name} ({self.score:.1f}%)"
