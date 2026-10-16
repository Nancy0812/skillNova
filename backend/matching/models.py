from django.db import models
from django.contrib.auth.models import User


class SkillGapResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gap_results', null=True, blank=True)
    target_role_id = models.CharField(max_length=50)
    target_role_title = models.CharField(max_length=150)
    skill_coverage_score = models.FloatField(default=0.0)
    demonstrated_skills = models.JSONField(default=list)
    missing_required_skills = models.JSONField(default=list)
    missing_preferred_skills = models.JSONField(default=list)
    priority_gaps = models.JSONField(default=list)
    formula_used = models.CharField(
        max_length=255,
        default="Demonstrated Required Skills / Total Selected Required Skills * 100"
    )
    disclaimer = models.CharField(
        max_length=255,
        default="Score indicates skill coverage against entry-level benchmark, not hiring probability."
    )
    calculation_timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.target_role_title} Gap Analysis: {self.skill_coverage_score:.1f}% coverage"
