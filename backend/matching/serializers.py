from rest_framework import serializers
from .models import SkillGapResult


class SkillGapResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGapResult
        fields = [
            'id', 'target_role_id', 'target_role_title', 'skill_coverage_score',
            'demonstrated_skills', 'missing_required_skills', 'missing_preferred_skills',
            'priority_gaps', 'formula_used', 'disclaimer', 'calculation_timestamp'
        ]
