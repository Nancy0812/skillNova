from rest_framework import serializers
from .models import AssessmentQuestion, AssessmentAttempt


class AssessmentQuestionSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)

    class Meta:
        model = AssessmentQuestion
        fields = ['id', 'skill_name', 'question_text', 'options', 'difficulty']


class AssessmentQuestionAdminSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)

    class Meta:
        model = AssessmentQuestion
        fields = ['id', 'skill_name', 'question_text', 'options', 'correct_option_index', 'explanation', 'difficulty']


class AssessmentAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentAttempt
        fields = ['id', 'skill_name', 'score', 'total_questions', 'correct_count', 'passed', 'answers', 'created_at']
