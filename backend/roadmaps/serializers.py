from rest_framework import serializers
from .models import Roadmap, RoadmapTask, LearningResource, StudentProject


class RoadmapTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapTask
        fields = [
            'id', 'week_number', 'skill_name', 'title', 'description',
            'estimated_hours', 'task_type', 'resource_url', 'is_completed', 'completed_at'
        ]


class RoadmapSerializer(serializers.ModelSerializer):
    tasks = RoadmapTaskSerializer(many=True, read_only=True)
    completed_tasks_count = serializers.SerializerMethodField()
    total_tasks_count = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Roadmap
        fields = [
            'id', 'target_role_id', 'target_role_title', 'total_weeks',
            'created_at', 'completed_tasks_count', 'total_tasks_count',
            'progress_percentage', 'tasks'
        ]

    def get_completed_tasks_count(self, obj):
        return obj.tasks.filter(is_completed=True).count()

    def get_total_tasks_count(self, obj):
        return obj.tasks.count()

    def get_progress_percentage(self, obj):
        total = obj.tasks.count()
        if total == 0:
            return 0.0
        completed = obj.tasks.filter(is_completed=True).count()
        return round((completed / total) * 100, 1)


class LearningResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = [
            'id', 'title', 'skill_name', 'level', 'format',
            'cost_category', 'estimated_duration', 'source_url',
            'is_verified_free', 'description'
        ]


class StudentProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProject
        fields = [
            'id', 'title', 'target_role_family', 'target_role_title',
            'skills_practiced', 'difficulty', 'description',
            'deliverables', 'estimated_hours'
        ]
