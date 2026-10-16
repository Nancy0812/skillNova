from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django.db.models import Q
from .models import Roadmap, RoadmapTask, LearningResource, StudentProject
from .serializers import RoadmapSerializer, RoadmapTaskSerializer, LearningResourceSerializer, StudentProjectSerializer
from matching.engine import compute_skill_coverage
from assessments.models import AssessmentAttempt
from matching.models import SkillGapResult


class RoadmapCurrentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        target_role_id = request.query_params.get('target_role_id', 'ROLE_WD_01')

        roadmap = None
        if user:
            roadmap = Roadmap.objects.filter(user=user).prefetch_related('tasks').order_by('-created_at').first()

        if not roadmap:
            roadmap = Roadmap.objects.filter(target_role_id=target_role_id, user=None).prefetch_related('tasks').first()

        if not roadmap:
            # Seed a default initial roadmap
            roadmap = Roadmap.objects.create(
                user=user,
                target_role_id=target_role_id,
                target_role_title='Frontend Developer',
                total_weeks=6
            )
            # Create sample weekly tasks
            tasks_data = [
                (1, 'HTML/CSS', 'Semantic HTML5 & Accessibility Audit', 'Build an accessible landing page adhering to WCAG 2.1 AA standards with landmark tags and keyboard navigation.', 3.0, 'study', 'https://developer.mozilla.org/en-US/docs/Web/HTML'),
                (1, 'HTML/CSS', 'Modern CSS Layouts (Flexbox & Grid)', 'Implement a multi-column responsive dashboard view without UI frameworks.', 4.0, 'project', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout'),
                (2, 'JavaScript', 'Modern ES6+ Fundamentals', 'Deep dive into arrow functions, destructuring, promises, and async/await syntax.', 4.0, 'study', 'https://javascript.info/'),
                (2, 'JavaScript', 'DOM Manipulation & Event Loop', 'Build an interactive filterable product grid with vanilla JS event listeners.', 3.5, 'project', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model'),
                (3, 'React', 'React Components & JSX Architecture', 'Structure functional components with clean props interfaces and unidirectional data flow.', 4.0, 'study', 'https://react.dev/learn'),
                (3, 'React', 'State Management & Custom Hooks', 'Build a reactive state machine using useState, useEffect, and custom data hooks.', 4.5, 'project', 'https://react.dev/learn/reusing-logic-with-custom-hooks'),
                (4, 'RESTful APIs', 'Client-Side API Integration', 'Connect a frontend client to RESTful endpoints with loading, success, and error state handling.', 3.5, 'study', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data'),
                (4, 'Git & GitHub', 'Git Collaborative Workflow', 'Branching, PR reviews, resolving merge conflicts, and writing conventional commits.', 2.5, 'study', 'https://git-scm.com/book/en/v2'),
                (5, 'React', 'Cap-Stone Client Web App', 'Develop a complete student career dashboard project integrating mock APIs and charts.', 6.0, 'project', 'https://github.com/topics/react-starter'),
                (6, 'Software Quality', 'Unit Testing with React Testing Library', 'Write test suites verifying critical form validation and component rendering.', 3.5, 'study', 'https://testing-library.com/docs/react-testing-library/intro/'),
            ]
            for w, s, t, d, h, tt, u in tasks_data:
                RoadmapTask.objects.create(
                    roadmap=roadmap,
                    week_number=w,
                    skill_name=s,
                    title=t,
                    description=d,
                    estimated_hours=h,
                    task_type=tt,
                    resource_url=u
                )

        serializer = RoadmapSerializer(roadmap)
        return Response(serializer.data)


class RoadmapGenerateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = request.user if request.user.is_authenticated else None
        target_role_id = request.data.get('target_role_id', 'ROLE_WD_01')
        study_hours = int(request.data.get('study_hours_per_week', 10))
        demonstrated_skills = request.data.get('demonstrated_skills', ['HTML/CSS'])

        gap_analysis = compute_skill_coverage(target_role_id, demonstrated_skills)
        missing_skills = gap_analysis['missing_required_skills'] + gap_analysis['missing_preferred_skills']

        if not missing_skills:
            missing_skills = ['Advanced Architecture', 'Performance Optimization', 'System Design']

        # Determine number of weeks based on missing skills and study hours
        total_weeks = max(4, min(10, len(missing_skills) * 2))

        roadmap = Roadmap.objects.create(
            user=user,
            target_role_id=target_role_id,
            target_role_title=gap_analysis['target_role_title'],
            total_weeks=total_weeks
        )

        # Distribute skills across weeks
        week = 1
        for skill in missing_skills:
            # Add study task
            RoadmapTask.objects.create(
                roadmap=roadmap,
                week_number=week,
                skill_name=skill,
                title=f"Core Fundamentals: {skill}",
                description=f"Read documentation, watch foundational tutorials, and understand entry-level expectations for {skill}.",
                estimated_hours=round(study_hours * 0.5, 1),
                task_type='study',
                resource_url='https://developer.mozilla.org/'
            )
            # Add hands-on task
            RoadmapTask.objects.create(
                roadmap=roadmap,
                week_number=week,
                skill_name=skill,
                title=f"Hands-on Lab Exercise: {skill}",
                description=f"Build a working mini-module or coding challenge exercising {skill} in a real code editor.",
                estimated_hours=round(study_hours * 0.5, 1),
                task_type='project',
                resource_url='https://github.com/'
            )
            week = (week % total_weeks) + 1

        serializer = RoadmapSerializer(roadmap)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskToggleView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        task = RoadmapTask.objects.filter(pk=pk).first()
        if not task:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        task.is_completed = not task.is_completed
        task.completed_at = timezone.now() if task.is_completed else None
        task.save()

        return Response(RoadmapTaskSerializer(task).data)


class ResourceListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        skill = request.query_params.get('skill')
        search = request.query_params.get('search')
        resources = LearningResource.objects.all()

        if skill:
            resources = resources.filter(skill_name__iexact=skill)
        if search:
            resources = resources.filter(Q(title__icontains=search) | Q(skill_name__icontains=search) | Q(description__icontains=search))

        serializer = LearningResourceSerializer(resources, many=True)
        return Response(serializer.data)


class ProjectListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        role_family = request.query_params.get('family')
        search = request.query_params.get('search')
        projects = StudentProject.objects.all()

        if role_family:
            projects = projects.filter(target_role_family__iexact=role_family)
        if search:
            projects = projects.filter(Q(title__icontains=search) | Q(target_role_title__icontains=search) | Q(description__icontains=search))

        serializer = StudentProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProgressView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        
        # Calculate statistics
        if user:
            completed_tasks = RoadmapTask.objects.filter(roadmap__user=user, is_completed=True).count()
            total_tasks = RoadmapTask.objects.filter(roadmap__user=user).count()
            attempts = AssessmentAttempt.objects.filter(user=user)
            attempts_count = attempts.count()
            avg_score = round(sum(a.score for a in attempts) / attempts_count, 1) if attempts_count > 0 else 0.0
            latest_gap = SkillGapResult.objects.filter(user=user).order_by('-calculation_timestamp').first()
            coverage = latest_gap.skill_coverage_score if latest_gap else 40.0
        else:
            completed_tasks = 4
            total_tasks = 10
            attempts_count = 2
            avg_score = 75.0
            coverage = 50.0

        activity_history = [
            {'date': 'Day 1', 'hours': 2.0, 'tasks': 1},
            {'date': 'Day 2', 'hours': 1.5, 'tasks': 1},
            {'date': 'Day 3', 'hours': 3.0, 'tasks': 2},
            {'date': 'Day 4', 'hours': 0.5, 'tasks': 0},
            {'date': 'Day 5', 'hours': 2.5, 'tasks': 1},
            {'date': 'Day 6', 'hours': 4.0, 'tasks': 2},
            {'date': 'Day 7', 'hours': 1.0, 'tasks': 0},
        ]

        return Response({
            'completed_tasks_count': completed_tasks,
            'total_tasks_count': total_tasks,
            'task_completion_rate': round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0,
            'assessment_attempts_count': attempts_count,
            'average_assessment_score': avg_score,
            'current_skill_coverage': coverage,
            'weekly_hours_logged': 14.5,
            'activity_history': activity_history,
            'milestones': [
                {'title': 'Completed Onboarding & Profile Setup', 'status': 'completed', 'date': 'Week 1'},
                {'title': 'First Diagnostic Assessment Taken', 'status': 'completed', 'date': 'Week 1'},
                {'title': '50% Skill Coverage Benchmark', 'status': 'in_progress', 'date': 'Week 3'},
                {'title': 'Entry-Level Portfolio Project Complete', 'status': 'upcoming', 'date': 'Week 6'},
            ]
        })
