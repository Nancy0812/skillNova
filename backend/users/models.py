from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    college = models.CharField(max_length=200, blank=True, default='')
    education_level = models.CharField(max_length=100, blank=True, default='Undergraduate')
    target_role_id = models.CharField(max_length=50, blank=True, default='ROLE_WD_01')
    target_role_title = models.CharField(max_length=100, blank=True, default='Frontend Developer')
    target_family = models.CharField(max_length=100, blank=True, default='Web Development')
    study_hours_per_week = models.IntegerField(default=10)
    learning_style = models.CharField(max_length=50, default='hands-on')
    self_reported_skills = models.JSONField(default=list, blank=True)
    notifications_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} Profile ({self.target_role_title})"


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        if hasattr(instance, 'profile'):
            instance.profile.save()
