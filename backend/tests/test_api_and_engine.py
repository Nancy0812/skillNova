from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from jobs.models import Role, Skill, Job, JobSkillMapping
from matching.engine import compute_skill_coverage
from roadmaps.models import Roadmap, RoadmapTask


class SkillNovaBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create demo roles and skills
        self.role_wd = Role.objects.create(
            role_id="ROLE_WD_TEST",
            family="Web Development",
            title="Frontend Developer",
            description="Builds client apps",
            experience_level="Entry-Level",
            is_synthetic=True
        )

        self.skill_html = Skill.objects.create(skill_id="SK_HTML", name="HTML/CSS", category="Technical", subcategory="Web")
        self.skill_js = Skill.objects.create(skill_id="SK_JS", name="JavaScript", category="Technical", subcategory="Web")
        self.skill_react = Skill.objects.create(skill_id="SK_REACT", name="React", category="Technical", subcategory="Web")
        self.skill_docker = Skill.objects.create(skill_id="SK_DOCKER", name="Docker", category="Technical", subcategory="DevOps")

        self.job = Job.objects.create(
            job_id="SJOB_TEST_01",
            role=self.role_wd,
            title="Junior Frontend Dev",
            company="Test Company",
            role_family="Web Development",
            sub_role="Frontend Developer",
            location="Remote",
            salary_range_est="$60k",
            description="Develop UI",
            is_synthetic=True
        )

        # HTML/CSS & React are required, Docker is preferred
        JobSkillMapping.objects.create(mapping_id="M1", job=self.job, skill=self.skill_html, requirement_type="required", importance_weight=3.0)
        JobSkillMapping.objects.create(mapping_id="M2", job=self.job, skill=self.skill_react, requirement_type="required", importance_weight=3.0)
        JobSkillMapping.objects.create(mapping_id="M3", job=self.job, skill=self.skill_docker, requirement_type="preferred", importance_weight=1.5)

    def test_user_registration_and_login(self):
        # 1. Register
        reg_response = self.client.post('/api/auth/register/', {
            'username': 'student_alex',
            'email': 'alex@example.edu',
            'password': 'SecurePassword123!',
            'first_name': 'Alex'
        }, format='json')
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', reg_response.data)

        # 2. Login
        login_response = self.client.post('/api/auth/login/', {
            'email': 'alex@example.edu',
            'password': 'SecurePassword123!'
        }, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn('token', login_response.data)

    def test_roles_and_jobs_api(self):
        response = self.client.get('/api/roles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

        job_resp = self.client.get('/api/jobs/')
        self.assertEqual(job_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(job_resp.data[0]['is_synthetic'])

    def test_skill_intelligence_engine_formula(self):
        # 1 of 2 required skills demonstrated -> coverage should be 50.0%
        result = compute_skill_coverage("ROLE_WD_TEST", ["HTML/CSS"])
        self.assertEqual(result["total_required_skills_count"], 2)
        self.assertEqual(result["demonstrated_required_count"], 1)
        self.assertEqual(result["skill_coverage_score"], 50.0)
        self.assertIn("React", result["missing_required_skills"])
        self.assertIn("Docker", result["missing_preferred_skills"])

        # Both required skills demonstrated -> coverage should be 100.0%
        result_full = compute_skill_coverage("ROLE_WD_TEST", ["HTML/CSS", "React"])
        self.assertEqual(result_full["skill_coverage_score"], 100.0)

        # Zero division safety test
        empty_role_result = compute_skill_coverage("NON_EXISTENT_ROLE", ["HTML/CSS"])
        self.assertEqual(empty_role_result["skill_coverage_score"], 0.0)

    def test_roadmap_task_toggle(self):
        roadmap = Roadmap.objects.create(target_role_id="ROLE_WD_TEST", total_weeks=4)
        task = RoadmapTask.objects.create(
            roadmap=roadmap,
            week_number=1,
            skill_name="HTML/CSS",
            title="Semantic Tags",
            description="Learn tags",
            is_completed=False
        )

        toggle_resp = self.client.post(f'/api/roadmaps/tasks/{task.id}/toggle/')
        self.assertEqual(toggle_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(toggle_resp.data['is_completed'])
