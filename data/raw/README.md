# SkillNova Synthetic Dataset Pack

> **NOTICE: ALL DATA IN THIS PACK IS SYNTHETIC FOR DEMONSTRATION AND EDUCATIONAL PURPOSES.**
> No synthetic vacancies, salary ranges, company names, or job postings represent real-world employer listings, verified market outcomes, or guaranteed placements.

## Schemas

### 1. `skillnova_role_catalog.csv`
- `role_id`: Unique identifier (e.g., `ROLE_DA_01`)
- `family`: Career family (Data & Analytics, AI & Machine Learning, Software Development, Web Development, Cloud & DevOps, Cybersecurity)
- `title`: Sub-role title (e.g., Data Analyst, Frontend Developer)
- `description`: High-level summary of the entry-level career path
- `experience_level`: Junior / Entry-Level / Associate
- `is_synthetic`: Always `True`

### 2. `skillnova_skill_taxonomy.csv`
- `skill_id`: Unique identifier (e.g., `SKILL_PY_01`)
- `name`: Standardized skill name (e.g., Python, SQL, React)
- `category`: Technical / Tool / Domain / Soft Skill
- `subcategory`: E.g., Programming Languages, Databases, Cloud & Infrastructure
- `description`: Scope of the skill in entry-level workflows
- `is_synthetic`: Always `True`

### 3. `skillnova_synthetic_jobs.csv`
- `job_id`: Unique synthetic job ID (e.g., `SJOB_001`)
- `title`: Job title
- `role_id`: FK to `skillnova_role_catalog.csv`
- `company`: Synthetic employer name
- `role_family`: Role family category
- `sub_role`: Sub-role title
- `experience_level`: Entry-Level
- `location`: Remote / Hybrid / City
- `salary_range_est`: Illustrative range
- `description`: Synthetic responsibilities and requirements
- `source`: `SkillNova Synthetic Dataset Pack v1`
- `is_synthetic`: Always `True`

### 4. `skillnova_job_skills.csv`
- `mapping_id`: Unique synthetic mapping ID
- `job_id`: FK to `skillnova_synthetic_jobs.csv`
- `skill_name`: Associated skill name
- `requirement_type`: `required` or `preferred`
- `importance_weight`: Illustrative weight (1.0 to 3.0) for ranking demonstration
- `is_synthetic`: Always `True`
