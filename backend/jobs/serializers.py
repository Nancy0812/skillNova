from rest_framework import serializers
from .models import Role, Skill, Job, JobSkillMapping


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['skill_id', 'name', 'category', 'subcategory', 'description', 'is_synthetic']


class JobSkillMappingSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    category = serializers.CharField(source='skill.category', read_only=True)

    class Meta:
        model = JobSkillMapping
        fields = ['mapping_id', 'skill_name', 'category', 'requirement_type', 'importance_weight', 'is_synthetic']


class JobSerializer(serializers.ModelSerializer):
    job_skills = JobSkillMappingSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = [
            'job_id', 'role_id', 'title', 'company', 'role_family', 'sub_role',
            'experience_level', 'location', 'salary_range_est', 'description',
            'source', 'is_synthetic', 'job_skills'
        ]


class RoleSerializer(serializers.ModelSerializer):
    skills_required = serializers.SerializerMethodField()
    skills_preferred = serializers.SerializerMethodField()

    class Meta:
        model = Role
        fields = [
            'role_id', 'family', 'title', 'description', 'experience_level',
            'is_synthetic', 'skills_required', 'skills_preferred'
        ]

    def get_skills_required(self, obj):
        mappings = JobSkillMapping.objects.filter(job__role=obj, requirement_type='required').select_related('skill')
        return sorted(list(set(m.skill.name for m in mappings)))

    def get_skills_preferred(self, obj):
        mappings = JobSkillMapping.objects.filter(job__role=obj, requirement_type='preferred').select_related('skill')
        return sorted(list(set(m.skill.name for m in mappings)))
