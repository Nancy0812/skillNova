from django.db import models


class Role(models.Model):
    role_id = models.CharField(max_length=50, primary_key=True)
    family = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    description = models.TextField()
    experience_level = models.CharField(max_length=50, default="Entry-Level")
    is_synthetic = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} ({self.family})"


class Skill(models.Model):
    skill_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=150, unique=True)
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_synthetic = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    job_id = models.CharField(max_length=50, primary_key=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    role_family = models.CharField(max_length=100)
    sub_role = models.CharField(max_length=150)
    experience_level = models.CharField(max_length=50, default="Entry-Level")
    location = models.CharField(max_length=100)
    salary_range_est = models.CharField(max_length=100)
    description = models.TextField()
    source = models.CharField(max_length=150, default="SkillNova Synthetic Dataset Pack v1")
    is_synthetic = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} at {self.company} [SYNTHETIC]"


class JobSkillMapping(models.Model):
    mapping_id = models.CharField(max_length=50, primary_key=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job_skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='job_mappings')
    requirement_type = models.CharField(max_length=20, default='required')  # required / preferred
    importance_weight = models.FloatField(default=1.0)
    is_synthetic = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.job_id} -> {self.skill.name} ({self.requirement_type})"
