from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import SkillGapResult
from .serializers import SkillGapResultSerializer
from .engine import compute_skill_coverage
from assessments.models import AssessmentAttempt


class CalculateSkillGapsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        target_role_id = request.data.get('target_role_id')
        demonstrated_skills = request.data.get('demonstrated_skills')

        # If user is authenticated and target_role_id not supplied, take from user profile
        if request.user.is_authenticated:
            profile = getattr(request.user, 'profile', None)
            if not target_role_id and profile:
                target_role_id = profile.target_role_id

            # Also aggregate skills from passed assessments
            if demonstrated_skills is None:
                passed_attempts = AssessmentAttempt.objects.filter(user=request.user, passed=True).values_list('skill_name', flat=True)
                reported = profile.self_reported_skills if profile else []
                # Combine both
                skills_list = list(set(list(passed_attempts) + [s if isinstance(s, str) else s.get('skill', '') for s in reported]))
                demonstrated_skills = skills_list

        if not target_role_id:
            target_role_id = 'ROLE_WD_01'  # Default to Frontend Developer
        if demonstrated_skills is None:
            demonstrated_skills = ['HTML/CSS', 'JavaScript']

        result_data = compute_skill_coverage(target_role_id, demonstrated_skills)

        # Save result for authenticated user or if requested
        user = request.user if request.user.is_authenticated else None
        gap_obj = SkillGapResult.objects.create(
            user=user,
            target_role_id=result_data['target_role_id'],
            target_role_title=result_data['target_role_title'],
            skill_coverage_score=result_data['skill_coverage_score'],
            demonstrated_skills=result_data['demonstrated_skills'],
            missing_required_skills=result_data['missing_required_skills'],
            missing_preferred_skills=result_data['missing_preferred_skills'],
            priority_gaps=result_data['priority_gaps'],
            formula_used=result_data['formula_used'],
            disclaimer=result_data['disclaimer']
        )

        return Response(SkillGapResultSerializer(gap_obj).data, status=status.HTTP_200_OK)


class LatestSkillGapView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        target_role_id = request.query_params.get('target_role_id', 'ROLE_WD_01')
        if request.user.is_authenticated:
            latest = SkillGapResult.objects.filter(user=request.user).order_by('-calculation_timestamp').first()
            if latest:
                return Response(SkillGapResultSerializer(latest).data)

        # Calculate on the fly for demo/guest
        result_data = compute_skill_coverage(target_role_id, ['HTML/CSS', 'JavaScript'])
        return Response(result_data)
