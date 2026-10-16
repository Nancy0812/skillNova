from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Role, Skill, Job
from .serializers import RoleSerializer, SkillSerializer, JobSerializer


class RoleListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        family = request.query_params.get('family')
        search = request.query_params.get('search')
        roles = Role.objects.all()

        if family:
            roles = roles.filter(family__iexact=family)
        if search:
            roles = roles.filter(Q(title__icontains=search) | Q(description__icontains=search))

        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)


class RoleDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, role_id):
        role = Role.objects.filter(role_id=role_id).first()
        if not role:
            return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RoleSerializer(role)
        return Response(serializer.data)


class SkillListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.query_params.get('category')
        search = request.query_params.get('search')
        skills = Skill.objects.all()

        if category:
            skills = skills.filter(category__iexact=category)
        if search:
            skills = skills.filter(Q(name__icontains=search) | Q(description__icontains=search))

        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)


class JobListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        role_id = request.query_params.get('role_id')
        family = request.query_params.get('family')
        search = request.query_params.get('search')

        jobs = Job.objects.all().prefetch_related('job_skills__skill')

        if role_id:
            jobs = jobs.filter(role_id=role_id)
        if family:
            jobs = jobs.filter(role_family__iexact=family)
        if search:
            jobs = jobs.filter(Q(title__icontains=search) | Q(description__icontains=search) | Q(company__icontains=search))

        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
