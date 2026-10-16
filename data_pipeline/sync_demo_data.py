"""
SkillNova Dataset Sync Tool
Reads raw CSVs from data/raw/, validates columns, IDs, and references,
and generates the centralized frontend/src/data/demoData.js file
ensuring 100% data consistency without hardcoded discrepancies.
"""

import json
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = BASE_DIR / "data" / "raw"
FRONTEND_DATA_FILE = BASE_DIR / "frontend" / "src" / "data" / "demoData.js"

def validate_and_generate():
    print("--- Reading raw CSV datasets ---")
    df_roles = pd.read_csv(RAW_DIR / "skillnova_role_catalog.csv")
    df_skills = pd.read_csv(RAW_DIR / "skillnova_skill_taxonomy.csv")
    df_jobs = pd.read_csv(RAW_DIR / "skillnova_synthetic_jobs.csv")
    df_job_skills = pd.read_csv(RAW_DIR / "skillnova_job_skills.csv")

    # 1. Validation checks
    assert not df_roles['role_id'].duplicated().any(), "Duplicate role_id found"
    assert not df_skills['skill_id'].duplicated().any(), "Duplicate skill_id found"
    assert not df_jobs['job_id'].duplicated().any(), "Duplicate job_id found"
    assert not df_job_skills['mapping_id'].duplicated().any(), "Duplicate mapping_id found"

    valid_role_ids = set(df_roles['role_id'])
    valid_job_ids = set(df_jobs['job_id'])
    valid_skill_names = set(df_skills['name'])

    assert df_jobs['role_id'].isin(valid_role_ids).all(), "Invalid role_id in jobs"
    assert df_job_skills['job_id'].isin(valid_job_ids).all(), "Invalid job_id in job_skills"
    assert df_job_skills['skill_name'].isin(valid_skill_names).all(), "Invalid skill_name in job_skills"

    print(f"Validation passed: {len(df_roles)} roles, {len(df_skills)} skills, {len(df_jobs)} jobs, {len(df_job_skills)} mappings.")

    # 2. Enrich roles with required and preferred skills from mappings
    # Build mapping: role_id -> job_id -> list of skills
    job_to_role = dict(zip(df_jobs['job_id'], df_jobs['role_id']))
    role_skills_req = {rid: [] for rid in df_roles['role_id']}
    role_skills_pref = {rid: [] for rid in df_roles['role_id']}

    for _, row in df_job_skills.iterrows():
        jid = row['job_id']
        rid = job_to_role.get(jid)
        if rid:
            s_name = row['skill_name']
            if row['requirement_type'] == 'required' and s_name not in role_skills_req[rid]:
                role_skills_req[rid].append(s_name)
            elif row['requirement_type'] == 'preferred' and s_name not in role_skills_pref[rid]:
                role_skills_pref[rid].append(s_name)

    roles_list = []
    for _, row in df_roles.iterrows():
        rid = row['role_id']
        roles_list.append({
            "role_id": rid,
            "family": row['family'],
            "title": row['title'],
            "description": row['description'],
            "experience_level": row.get('experience_level', 'Entry-Level'),
            "skills_required": role_skills_req[rid],
            "skills_preferred": role_skills_pref[rid],
            "is_synthetic": True
        })

    # 3. Format Skills List
    skills_list = []
    for _, row in df_skills.iterrows():
        skills_list.append({
            "skill_id": row['skill_id'],
            "name": row['name'],
            "category": row['category'],
            "subcategory": row['subcategory'],
            "description": row['description'],
            "is_synthetic": True
        })

    # 4. Format Synthetic Jobs List
    jobs_list = []
    for _, row in df_jobs.iterrows():
        jobs_list.append({
            "job_id": row['job_id'],
            "title": row['title'],
            "role_id": row['role_id'],
            "company": row['company'],
            "role_family": row['role_family'],
            "sub_role": row['sub_role'],
            "experience_level": row['experience_level'],
            "location": row['location'],
            "salary_range_est": row['salary_range_est'],
            "description": row['description'],
            "source": row.get('source', 'SkillNova Synthetic Dataset Pack v1'),
            "is_synthetic": True,
            "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
        })

    # 5. Format Job Skills Mappings List
    job_skills_list = []
    for _, row in df_job_skills.iterrows():
        job_skills_list.append({
            "mapping_id": row['mapping_id'],
            "job_id": row['job_id'],
            "skill_name": row['skill_name'],
            "requirement_type": row['requirement_type'],
            "importance_weight": float(row['importance_weight']),
            "is_synthetic": True
        })

    # 6. Existing Curated Resources, Projects, Questions
    resources_json = [
      {
        "id": 1,
        "title": "MDN Web Docs: HTML & CSS Core Guide",
        "skill_name": "HTML/CSS",
        "level": "Beginner",
        "format": "Documentation",
        "cost_category": "Free",
        "estimated_duration": "6 hours",
        "source_url": "https://developer.mozilla.org/en-US/docs/Learn",
        "is_verified_free": True,
        "description": "Authoritative reference and interactive examples for HTML semantics and modern responsive CSS layout."
      },
      {
        "id": 2,
        "title": "The Modern JavaScript Tutorial (javascript.info)",
        "skill_name": "JavaScript",
        "level": "Beginner",
        "format": "Interactive",
        "cost_category": "Free",
        "estimated_duration": "12 hours",
        "source_url": "https://javascript.info/",
        "is_verified_free": True,
        "description": "From basic scripting to advanced closures, prototypes, async programming, and DOM event handling."
      },
      {
        "id": 3,
        "title": "Official React Quick Start & Thinking in React",
        "skill_name": "React",
        "level": "Beginner",
        "format": "Documentation",
        "cost_category": "Free",
        "estimated_duration": "5 hours",
        "source_url": "https://react.dev/learn",
        "is_verified_free": True,
        "description": "Interactive guided walkthrough of modern React functional components, useState, and declarative UI."
      },
      {
        "id": 4,
        "title": "W3Schools SQL Tutorial & Exercises",
        "skill_name": "SQL",
        "level": "Beginner",
        "format": "Interactive",
        "cost_category": "Free",
        "estimated_duration": "4 hours",
        "source_url": "https://www.w3schools.com/sql/",
        "is_verified_free": True,
        "description": "Hands-on browser SQL editor practicing SELECT, JOIN, GROUP BY, aggregations, and subqueries."
      },
      {
        "id": 5,
        "title": "Python Official Tutorial: Language Foundations",
        "skill_name": "Python",
        "level": "Beginner",
        "format": "Documentation",
        "cost_category": "Free",
        "estimated_duration": "8 hours",
        "source_url": "https://docs.python.org/3/tutorial/",
        "is_verified_free": True,
        "description": "Authoritative guide covering data structures, functions, modules, file I/O, and OOP concepts."
      },
      {
        "id": 6,
        "title": "Docker 101 Tutorial & CLI Guide",
        "skill_name": "Docker",
        "level": "Beginner",
        "format": "Interactive Guide",
        "cost_category": "Free",
        "estimated_duration": "3 hours",
        "source_url": "https://www.docker.com/101-tutorial/",
        "is_verified_free": True,
        "description": "Containerizing applications, Dockerfile instructions, volumes, port forwarding, and multi-container apps."
      },
      {
        "id": 7,
        "title": "Linux Journey: Grasshopper Foundations",
        "skill_name": "Linux Fundamentals",
        "level": "Beginner",
        "format": "Interactive Guide",
        "cost_category": "Free",
        "estimated_duration": "4 hours",
        "source_url": "https://linuxjourney.com/",
        "is_verified_free": True,
        "description": "Free beginner tutorials covering bash commands, directory navigation, file permissions, and packages."
      },
      {
        "id": 8,
        "title": "Khan Academy: Statistics and Probability",
        "skill_name": "Statistics & Probability",
        "level": "Beginner",
        "format": "Interactive",
        "cost_category": "Free",
        "estimated_duration": "8 hours",
        "source_url": "https://www.khanacademy.org/math/statistics-probability",
        "is_verified_free": True,
        "description": "Foundational statistics covering mean, median, distributions, variance, and probability theory."
      },
      {
        "id": 9,
        "title": "Microsoft Learn: Get started with Power BI Desktop",
        "skill_name": "Power BI / Tableau",
        "level": "Beginner",
        "format": "Documentation",
        "cost_category": "Free",
        "estimated_duration": "3 hours",
        "source_url": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "is_verified_free": True,
        "description": "Official Microsoft guide on importing datasets, connecting models, and designing KPI visual cards."
      },
      {
        "id": 10,
        "title": "Git Documentation & Pro Git Book",
        "skill_name": "Git & GitHub",
        "level": "Beginner",
        "format": "Documentation",
        "cost_category": "Free",
        "estimated_duration": "4 hours",
        "source_url": "https://git-scm.com/book/en/v2",
        "is_verified_free": True,
        "description": "Free official handbook covering branches, commits, remotes, merging, and collaboration workflows."
      }
    ]

    projects_json = [
      {
        "id": 1,
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
        "id": 2,
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
        "id": 3,
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
        "id": 4,
        "title": "Automated Cloud Log Auditing & Alerting System",
        "target_role_family": "Cybersecurity",
        "target_role_title": "Security Analyst",
        "skills_practiced": ["Network Security Fundamentals", "Linux Fundamentals", "Cyber Incident Response"],
        "difficulty": "Beginner",
        "description": "Parse mock server authentication logs to detect brute-force SSH attempts and output formatted alert notifications.",
        "deliverables": [
          "Bash or Python log parsing utility",
          "IP threshold aggregation and alert rule logic",
          "Incident summary markdown report"
        ],
        "estimated_hours": 8
      },
      {
        "id": 5,
        "title": "Containerized Microservice Pipeline with Docker & GitHub Actions",
        "target_role_family": "Cloud & DevOps",
        "target_role_title": "DevOps Engineer",
        "skills_practiced": ["Linux Fundamentals", "Docker", "CI/CD Pipelines", "Git & GitHub"],
        "difficulty": "Intermediate",
        "description": "Containerize a sample API server, write a multi-stage Dockerfile, and establish an automated test pipeline.",
        "deliverables": [
          "Multi-stage Dockerfile with non-root security",
          "GitHub Actions YAML workflow running tests on push",
          "Docker Compose setup with service health checks"
        ],
        "estimated_hours": 14
      },
      {
        "id": 6,
        "title": "Predictive Student Retention Classifier",
        "target_role_family": "AI & Machine Learning",
        "target_role_title": "Data Scientist",
        "skills_practiced": ["Python", "Pandas & NumPy", "Statistics & Probability", "Machine Learning Fundamentals"],
        "difficulty": "Beginner",
        "description": "Build an end-to-end data pipeline cleaning academic features, encoding categories, and training a logistic regression model.",
        "deliverables": [
          "Exploratory Jupyter notebook with correlation heatmaps",
          "Feature engineering pipeline with standard scalers",
          "Confusion matrix and ROC-AUC evaluation report"
        ],
        "estimated_hours": 12
      }
    ]

    # Write Javascript file
    js_content = f"""/**
 * SkillNova Centralized Demo Data Pack
 * Generated directly from validated raw CSV datasets located in data/raw/:
 * - skillnova_role_catalog.csv ({len(df_roles)} roles)
 * - skillnova_skill_taxonomy.csv ({len(df_skills)} skills)
 * - skillnova_synthetic_jobs.csv ({len(df_jobs)} synthetic jobs)
 * - skillnova_job_skills.csv ({len(df_job_skills)} job-skill mappings)
 *
 * NOTE: All records are synthetic demo benchmarks for educational calibration.
 * No real vacancies, salary figures, or guaranteed outcomes are represented.
 */

export const DEMO_ROLES = {json.dumps(roles_list, indent=2)};

export const DEMO_SKILLS = {json.dumps(skills_list, indent=2)};

export const DEMO_SYNTHETIC_JOBS = {json.dumps(jobs_list, indent=2)};

export const DEMO_JOB_SKILLS = {json.dumps(job_skills_list, indent=2)};

export const DEMO_RESOURCES = {json.dumps(resources_json, indent=2)};

export const DEMO_PROJECTS = {json.dumps(projects_json, indent=2)};
"""

    with open(FRONTEND_DATA_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Generated {FRONTEND_DATA_FILE} successfully with all raw CSV dataset records!")

if __name__ == "__main__":
    validate_and_generate()
