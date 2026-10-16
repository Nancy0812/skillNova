"""
Management command to import cleaned synthetic dataset and seed resources, projects, and assessment questions.
Usage: python manage.py import_dataset
"""

from pathlib import Path
import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction
from jobs.models import Role, Skill, Job, JobSkillMapping
from assessments.models import AssessmentQuestion
from roadmaps.models import LearningResource, StudentProject


class Command(BaseCommand):
    help = 'Imports cleaned synthetic datasets and seeds reference resources and assessment questions'

    def handle(self, *args, **options):
        base_dir = Path(__file__).resolve().parent.parent.parent.parent.parent
        processed_dir = base_dir / "data" / "processed"

        if not processed_dir.exists():
            self.stderr.write(self.style.ERROR(f"Processed data directory not found: {processed_dir}"))
            self.stderr.write(self.style.WARNING("Please run 'python data_pipeline/clean_data.py' first."))
            return

        roles_csv = processed_dir / "cleaned_role_catalog.csv"
        skills_csv = processed_dir / "cleaned_skill_taxonomy.csv"
        jobs_csv = processed_dir / "cleaned_synthetic_jobs.csv"
        job_skills_csv = processed_dir / "cleaned_job_skills.csv"

        self.stdout.write(self.style.MIGRATE_HEADING("--- Starting SkillNova Dataset Import ---"))

        with transaction.atomic():
            # 1. Import Roles
            if roles_csv.exists():
                df_roles = pd.read_csv(roles_csv)
                for _, row in df_roles.iterrows():
                    Role.objects.update_or_create(
                        role_id=row['role_id'],
                        defaults={
                            'family': row['family'],
                            'title': row['title'],
                            'description': row['description'],
                            'experience_level': row.get('experience_level', 'Entry-Level'),
                            'is_synthetic': True
                        }
                    )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(df_roles)} roles."))

            # 2. Import Skills
            if skills_csv.exists():
                df_skills = pd.read_csv(skills_csv)
                for _, row in df_skills.iterrows():
                    Skill.objects.update_or_create(
                        skill_id=row['skill_id'],
                        defaults={
                            'name': row['name'],
                            'category': row['category'],
                            'subcategory': row['subcategory'],
                            'description': row.get('description', ''),
                            'is_synthetic': True
                        }
                    )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(df_skills)} skills."))

            # 3. Import Jobs
            if jobs_csv.exists():
                df_jobs = pd.read_csv(jobs_csv)
                for _, row in df_jobs.iterrows():
                    role = Role.objects.filter(role_id=row['role_id']).first()
                    if role:
                        Job.objects.update_or_create(
                            job_id=row['job_id'],
                            defaults={
                                'role': role,
                                'title': row['title'],
                                'company': row['company'],
                                'role_family': row['role_family'],
                                'sub_role': row['sub_role'],
                                'experience_level': row.get('experience_level', 'Entry-Level'),
                                'location': row['location'],
                                'salary_range_est': row['salary_range_est'],
                                'description': row['description'],
                                'source': row.get('source', 'SkillNova Synthetic Dataset Pack v1'),
                                'is_synthetic': True
                            }
                        )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(df_jobs)} synthetic jobs."))

            # 4. Import Job Skills
            if job_skills_csv.exists():
                df_js = pd.read_csv(job_skills_csv)
                for _, row in df_js.iterrows():
                    job = Job.objects.filter(job_id=row['job_id']).first()
                    skill = Skill.objects.filter(name=row['skill_name']).first()
                    if job and skill:
                        JobSkillMapping.objects.update_or_create(
                            mapping_id=row['mapping_id'],
                            defaults={
                                'job': job,
                                'skill': skill,
                                'requirement_type': row['requirement_type'],
                                'importance_weight': float(row.get('importance_weight', 1.0)),
                                'is_synthetic': True
                            }
                        )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(df_js)} job-skill mappings."))

            # 5. Seed Free Learning Resources
            resources_data = [
                {
                    "title": "MDN Web Docs: HTML & CSS Core Guide",
                    "skill_name": "HTML/CSS",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "6 hours",
                    "source_url": "https://developer.mozilla.org/en-US/docs/Learn",
                    "description": "Comprehensive reference and interactive examples for HTML semantics and modern responsive CSS layout."
                },
                {
                    "title": "The Modern JavaScript Tutorial (javascript.info)",
                    "skill_name": "JavaScript",
                    "level": "Beginner",
                    "format": "Interactive",
                    "cost_category": "Free",
                    "estimated_duration": "12 hours",
                    "source_url": "https://javascript.info/",
                    "description": "From basic scripting to advanced closures, prototypes, async programming, and DOM event handling."
                },
                {
                    "title": "Official React Quick Start & Thinking in React",
                    "skill_name": "React",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "5 hours",
                    "source_url": "https://react.dev/learn",
                    "description": "Interactive guided walkthrough of modern React functional components, useState, and declarative UI."
                },
                {
                    "title": "W3Schools SQL Tutorial & Exercises",
                    "skill_name": "SQL",
                    "level": "Beginner",
                    "format": "Interactive",
                    "cost_category": "Free",
                    "estimated_duration": "4 hours",
                    "source_url": "https://www.w3schools.com/sql/",
                    "description": "Hands-on browser SQL editor practicing SELECT, JOIN, GROUP BY, aggregations, and subqueries."
                },
                {
                    "title": "Python Official Tutorial: Language Foundations",
                    "skill_name": "Python",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "8 hours",
                    "source_url": "https://docs.python.org/3/tutorial/",
                    "description": "Authoritative guide covering data structures, functions, modules, file I/O, and OOP concepts."
                },
                {
                    "title": "Pandas Getting Started Tutorials",
                    "skill_name": "Pandas & NumPy",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "5 hours",
                    "source_url": "https://pandas.pydata.org/docs/getting_started/index.html",
                    "description": "Practical recipes for loading dataframes, filtering, aggregating, handling missing values, and reshaping."
                },
                {
                    "title": "Docker 101 Tutorial & CLI Guide",
                    "skill_name": "Docker",
                    "level": "Beginner",
                    "format": "Interactive Guide",
                    "cost_category": "Free",
                    "estimated_duration": "3 hours",
                    "source_url": "https://www.docker.com/101-tutorial/",
                    "description": "Containerizing applications, Dockerfile instructions, volumes, port forwarding, and multi-container apps."
                },
                {
                    "title": "Pro Git Book (Scott Chacon & Ben Straub)",
                    "skill_name": "Git & GitHub",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "4 hours",
                    "source_url": "https://git-scm.com/book/en/v2",
                    "description": "Entire official book explaining branch strategies, staging, merge rebasing, and remote repositories."
                },
                {
                    "title": "Linux Journey: Grasshopper to Journeyman",
                    "skill_name": "Linux Fundamentals",
                    "level": "Beginner",
                    "format": "Interactive Guide",
                    "cost_category": "Free",
                    "estimated_duration": "4 hours",
                    "source_url": "https://linuxjourney.com/",
                    "description": "Command line navigation, permissions, bash scripts, package management, and basic networking."
                },
                {
                    "title": "Scikit-Learn Machine Learning in Python",
                    "skill_name": "Machine Learning Fundamentals",
                    "level": "Beginner",
                    "format": "Documentation",
                    "cost_category": "Free",
                    "estimated_duration": "8 hours",
                    "source_url": "https://scikit-learn.org/stable/tutorial/basic/tutorial.html",
                    "description": "Supervised algorithms, model evaluation with cross-validation, precision/recall, and preprocessing pipelines."
                }
            ]

            for r_data in resources_data:
                LearningResource.objects.update_or_create(
                    title=r_data["title"],
                    defaults=r_data
                )
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(resources_data)} learning resources."))

            # 6. Seed Student Projects
            projects_data = [
                {
                    "title": "College Club Event Showcase & Registration Portal",
                    "target_role_family": "Web Development",
                    "target_role_title": "Frontend Developer",
                    "skills_practiced": ["HTML/CSS", "JavaScript", "React", "Git & GitHub"],
                    "difficulty": "Beginner",
                    "description": "Build a responsive web application for managing student club announcements, event calendars, and RSVP forms.",
                    "deliverables": [
                        "Responsive landing page with event filtering",
                        "RSVP modal form with client-side input validation",
                        "Interactive event schedule calendar",
                        "Deployed GitHub Pages / Netlify link"
                    ],
                    "estimated_hours": 12
                },
                {
                    "title": "Campus Marketplace REST API & Database",
                    "target_role_family": "Software Development",
                    "target_role_title": "Backend Developer",
                    "skills_practiced": ["Python", "RESTful APIs", "SQL", "Unit Testing"],
                    "difficulty": "Intermediate",
                    "description": "Design a relational database and RESTful microservice for buying, selling, and requesting textbook exchanges.",
                    "deliverables": [
                        "Normalized SQLite database schema",
                        "CRUD endpoints for listings, categories, and inquiries",
                        "Token-based authentication middleware",
                        "Postman collection and unit test suite with 80%+ coverage"
                    ],
                    "estimated_hours": 16
                },
                {
                    "title": "Student Course Feedback & Sentiment Dashboard",
                    "target_role_family": "Data & Analytics",
                    "target_role_title": "Data Analyst",
                    "skills_practiced": ["SQL", "Python", "Pandas & NumPy", "Data Visualization"],
                    "difficulty": "Beginner",
                    "description": "Analyze anonymous course rating surveys and build an interactive dashboard tracking teacher ratings and student sentiment.",
                    "deliverables": [
                        "Data cleaning script handling outliers and missing feedback",
                        "Aggregated SQL summary queries for department averages",
                        "Visual dashboard with distribution charts and correlation plots",
                        "1-page PDF executive findings summary"
                    ],
                    "estimated_hours": 10
                },
                {
                    "title": "Student Exam Performance Classifier",
                    "target_role_family": "AI & Machine Learning",
                    "target_role_title": "Data Scientist",
                    "skills_practiced": ["Python", "Pandas & NumPy", "Statistics & Probability", "Machine Learning Fundamentals"],
                    "difficulty": "Intermediate",
                    "description": "Build an end-to-end machine learning pipeline predicting academic risk based on attendance and study habits.",
                    "deliverables": [
                        "Exploratory data analysis Jupyter Notebook",
                        "Feature scaling and train-test split validation",
                        "Comparison of Decision Tree vs Logistic Regression with ROC curves",
                        "Summary of key predictive features"
                    ],
                    "estimated_hours": 14
                },
                {
                    "title": "Automated Docker Build & CI/CD Pipeline for Web App",
                    "target_role_family": "Cloud & DevOps",
                    "target_role_title": "DevOps Engineer",
                    "skills_practiced": ["Docker", "Linux Fundamentals", "Git & GitHub", "CI/CD Pipelines"],
                    "difficulty": "Intermediate",
                    "description": "Containerize a full-stack student web application and create an automated GitHub Actions CI/CD pipeline.",
                    "deliverables": [
                        "Multi-stage Dockerfile optimizing final image footprint",
                        "Docker Compose orchestration for frontend, backend, and DB",
                        "GitHub Actions workflow running linting, tests, and build checks",
                        "Deployment documentation with environment setup instructions"
                    ],
                    "estimated_hours": 12
                },
                {
                    "title": "Vulnerability Assessment & Network Traffic Audit Lab",
                    "target_role_family": "Cybersecurity",
                    "target_role_title": "Security Analyst",
                    "skills_practiced": ["Network Security Fundamentals", "Linux Fundamentals", "Cyber Incident Response"],
                    "difficulty": "Beginner",
                    "description": "Simulate and document security posture across local virtual network endpoints and analyze PCAP log telemetry.",
                    "deliverables": [
                        "Nmap port scan report identifying open ports and vulnerable services",
                        "Wireshark packet capture analysis for unencrypted credentials",
                        "Hardening checklist for Linux server SSH configuration",
                        "Incident triage report following standard NIST guidelines"
                    ],
                    "estimated_hours": 10
                }
            ]

            for p_data in projects_data:
                StudentProject.objects.update_or_create(
                    title=p_data["title"],
                    defaults=p_data
                )
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(projects_data)} practical student projects."))

            # 7. Seed Assessment Questions
            questions_data = [
                # HTML/CSS
                {
                    "skill_name": "HTML/CSS",
                    "question_text": "Which HTML5 semantic element is most appropriate for a standalone, self-contained section of content that could be distributed independently?",
                    "options": ["<section>", "<div>", "<article>", "<aside>"],
                    "correct_option_index": 2,
                    "explanation": "<article> is specifically intended for self-contained compositions (like a blog post, news card, or forum post) that can be reused independently.",
                    "difficulty": "beginner"
                },
                {
                    "skill_name": "HTML/CSS",
                    "question_text": "In CSS Flexbox, which property aligns flex items along the cross axis inside their container?",
                    "options": ["justify-content", "align-items", "flex-direction", "align-content"],
                    "correct_option_index": 1,
                    "explanation": "'align-items' controls the alignment along the cross axis (vertical when flex-direction is row), whereas 'justify-content' aligns along the main axis.",
                    "difficulty": "beginner"
                },
                # JavaScript
                {
                    "skill_name": "JavaScript",
                    "question_text": "What does 'const x = [1, 2, 3]; x.push(4);' do in modern JavaScript?",
                    "options": [
                        "Throws a TypeError because 'x' is declared with const",
                        "Appends 4 to the array because const prevents reassignment of the variable identifier, not mutation of the object",
                        "Creates a new copy of the array with 4 appended",
                        "Fails silently without error"
                    ],
                    "correct_option_index": 1,
                    "explanation": "'const' creates an immutable binding to the array reference, but does not freeze the underlying array data. Calling mutating methods like push() succeeds.",
                    "difficulty": "beginner"
                },
                {
                    "skill_name": "JavaScript",
                    "question_text": "Which method executes after an asynchronous Promise successfully resolves?",
                    "options": [".catch()", ".then()", ".finally()", ".resolve()"],
                    "correct_option_index": 1,
                    "explanation": "The '.then()' handler is invoked with the resolved value when a Promise transitions to the fulfilled state.",
                    "difficulty": "beginner"
                },
                # React
                {
                    "skill_name": "React",
                    "question_text": "Why should you never mutate React state directly (e.g., state.count = 5)?",
                    "options": [
                        "Direct mutation will crash the browser immediately",
                        "React relies on reference equality checks in reconciliation to trigger component re-renders",
                        "Direct mutation transforms the variable into a global variable",
                        "React functional components do not allow any state variables"
                    ],
                    "correct_option_index": 1,
                    "explanation": "React compares state references to detect changes. Mutating the object directly leaves the reference unchanged, so React may skip re-rendering.",
                    "difficulty": "beginner"
                },
                {
                    "skill_name": "React",
                    "question_text": "What is the primary purpose of the 'key' prop when rendering lists of elements in React?",
                    "options": [
                        "To format CSS styles uniquely for each item",
                        "To help React identify which items have changed, been added, or removed during virtual DOM reconciliation",
                        "To store sensitive database identifiers securely in the DOM",
                        "To make the element clickable by default"
                    ],
                    "correct_option_index": 1,
                    "explanation": "Keys provide a stable identity to list elements across renders so React can reorder or reuse DOM elements efficiently.",
                    "difficulty": "beginner"
                },
                # SQL
                {
                    "skill_name": "SQL",
                    "question_text": "Which SQL clause is used to filter records based on aggregated values (e.g. COUNT(*) > 5)?",
                    "options": ["WHERE", "ORDER BY", "HAVING", "GROUP BY"],
                    "correct_option_index": 2,
                    "explanation": "HAVING filters groups created by GROUP BY after aggregations are calculated, whereas WHERE filters individual rows before grouping.",
                    "difficulty": "beginner"
                },
                {
                    "skill_name": "SQL",
                    "question_text": "What is the result of a LEFT JOIN between Table A and Table B?",
                    "options": [
                        "Only rows that match in both Table A and Table B",
                        "All rows from Table A, along with matching rows from Table B (or NULL if no match exists)",
                        "All rows from Table B, and only matching rows from Table A",
                        "All combinations of rows from both tables without condition"
                    ],
                    "correct_option_index": 1,
                    "explanation": "LEFT JOIN returns every row from the left table (A), matched with right table columns if available, or NULL where no match exists.",
                    "difficulty": "beginner"
                },
                # Python
                {
                    "skill_name": "Python",
                    "question_text": "Which built-in Python data structure is unordered, mutable, and does not allow duplicate elements?",
                    "options": ["List", "Tuple", "Set", "Dictionary Keys View"],
                    "correct_option_index": 2,
                    "explanation": "A Set ('set()') is an unordered collection of unique elements implemented using hash tables.",
                    "difficulty": "beginner"
                },
                {
                    "skill_name": "Python",
                    "question_text": "What does a list comprehension '[x*2 for x in numbers if x % 2 == 0]' produce?",
                    "options": [
                        "Doubles every element in numbers",
                        "Doubles only the even numbers from the list",
                        "Checks if numbers has any even elements",
                        "Raises a SyntaxError"
                    ],
                    "correct_option_index": 1,
                    "explanation": "The 'if' condition filters for even numbers ('x % 2 == 0'), and the expression 'x * 2' doubles each filtered value.",
                    "difficulty": "beginner"
                },
                # Git
                {
                    "skill_name": "Git & GitHub",
                    "question_text": "Which command saves working directory changes to the staging index in Git?",
                    "options": ["git commit", "git add", "git push", "git stash"],
                    "correct_option_index": 1,
                    "explanation": "'git add' stages changes for the next commit snapshot.",
                    "difficulty": "beginner"
                },
                # Docker
                {
                    "skill_name": "Docker",
                    "question_text": "What is the key difference between a Docker Image and a Docker Container?",
                    "options": [
                        "A Docker Image is a running instance; a Docker Container is a static blueprint",
                        "A Docker Image is an immutable read-only template; a Docker Container is a running instance with a writable layer",
                        "Images are for Windows and Containers are for Linux",
                        "There is no difference"
                    ],
                    "correct_option_index": 1,
                    "explanation": "An image is a static, read-only package containing instructions and application code. A container is a runnable, isolated instance of that image.",
                    "difficulty": "beginner"
                }
            ]

            for q_item in questions_data:
                skill = Skill.objects.filter(name=q_item["skill_name"]).first()
                if skill:
                    AssessmentQuestion.objects.update_or_create(
                        skill=skill,
                        question_text=q_item["question_text"],
                        defaults={
                            "options": q_item["options"],
                            "correct_option_index": q_item["correct_option_index"],
                            "explanation": q_item["explanation"],
                            "difficulty": q_item["difficulty"]
                        }
                    )
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(questions_data)} assessment questions."))

        self.stdout.write(self.style.SUCCESS("--- Dataset import & seeding complete! ---"))
