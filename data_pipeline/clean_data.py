"""
SkillNova Data Processing Pipeline
Reproducible data validation, normalization, and cleaning pipeline using Pandas.
"""

import sys
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = BASE_DIR / "data" / "raw"
PROCESSED_DIR = BASE_DIR / "data" / "processed"

# Alias map for standardizing skill names
SKILL_ALIAS_MAP = {
    "python": "Python",
    "py": "Python",
    "sql": "SQL",
    "structured query language": "SQL",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "react": "React",
    "reactjs": "React",
    "react.js": "React",
    "html": "HTML/CSS",
    "css": "HTML/CSS",
    "html/css": "HTML/CSS",
    "html5": "HTML/CSS",
    "git": "Git & GitHub",
    "github": "Git & GitHub",
    "git & github": "Git & GitHub",
    "docker": "Docker",
    "linux": "Linux Fundamentals",
    "linux fundamentals": "Linux Fundamentals",
    "rest api": "RESTful APIs",
    "restful api": "RESTful APIs",
    "restful apis": "RESTful APIs",
    "pandas": "Pandas & NumPy",
    "pandas & numpy": "Pandas & NumPy",
    "numpy": "Pandas & NumPy",
    "tableau": "Power BI / Tableau",
    "power bi": "Power BI / Tableau",
    "power bi / tableau": "Power BI / Tableau",
    "statistics": "Statistics & Probability",
    "probability": "Statistics & Probability",
    "statistics & probability": "Statistics & Probability",
    "ml": "Machine Learning Fundamentals",
    "machine learning": "Machine Learning Fundamentals",
    "machine learning fundamentals": "Machine Learning Fundamentals",
    "aws": "Cloud Basics (AWS/Azure)",
    "azure": "Cloud Basics (AWS/Azure)",
    "cloud basics": "Cloud Basics (AWS/Azure)",
    "cloud basics (aws/azure)": "Cloud Basics (AWS/Azure)",
    "ci/cd": "CI/CD Pipelines",
    "cicd": "CI/CD Pipelines",
    "ci/cd pipelines": "CI/CD Pipelines",
    "dsa": "Data Structures & Algorithms",
    "data structures": "Data Structures & Algorithms",
    "data structures & algorithms": "Data Structures & Algorithms",
    "network security": "Network Security Fundamentals",
    "network security fundamentals": "Network Security Fundamentals",
    "soc": "Cyber Incident Response",
    "incident response": "Cyber Incident Response",
    "cyber incident response": "Cyber Incident Response",
}

EXPECTED_COLUMNS = {
    "role_catalog": ["role_id", "family", "title", "description", "experience_level", "is_synthetic"],
    "skill_taxonomy": ["skill_id", "name", "category", "subcategory", "description", "is_synthetic"],
    "synthetic_jobs": ["job_id", "title", "role_id", "company", "role_family", "sub_role", "experience_level", "location", "salary_range_est", "description", "source", "is_synthetic"],
    "job_skills": ["mapping_id", "job_id", "skill_name", "requirement_type", "importance_weight", "is_synthetic"]
}


def clean_and_validate():
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    warnings = []
    summary = {}

    print("====================================================")
    print("      SkillNova Data Cleaning Pipeline (Pandas)     ")
    print("====================================================")

    # 1. Load raw files
    roles_path = RAW_DIR / "skillnova_role_catalog.csv"
    skills_path = RAW_DIR / "skillnova_skill_taxonomy.csv"
    jobs_path = RAW_DIR / "skillnova_synthetic_jobs.csv"
    job_skills_path = RAW_DIR / "skillnova_job_skills.csv"

    for name, p in [("Roles", roles_path), ("Skills", skills_path), ("Jobs", jobs_path), ("JobSkills", job_skills_path)]:
        if not p.exists():
            raise FileNotFoundError(f"Missing required raw dataset file: {p}")

    df_roles = pd.read_csv(roles_path)
    df_skills = pd.read_csv(skills_path)
    df_jobs = pd.read_csv(jobs_path)
    df_job_skills = pd.read_csv(job_skills_path)

    # 2. Validate columns
    datasets = [
        ("Roles Catalog", df_roles, EXPECTED_COLUMNS["role_catalog"]),
        ("Skill Taxonomy", df_skills, EXPECTED_COLUMNS["skill_taxonomy"]),
        ("Synthetic Jobs", df_jobs, EXPECTED_COLUMNS["synthetic_jobs"]),
        ("Job Skills Mapping", df_job_skills, EXPECTED_COLUMNS["job_skills"]),
    ]

    for name, df, expected in datasets:
        missing_cols = [c for c in expected if c not in df.columns]
        if missing_cols:
            msg = f"[SCHEMA WARNING] {name} is missing expected columns: {missing_cols}"
            warnings.append(msg)
            print(msg)
        else:
            print(f"[SCHEMA CHECK] {name}: Columns verified ({len(df.columns)} columns)")

    # 3. Check for duplicates in primary keys
    if df_roles["role_id"].duplicated().any():
        dups = df_roles[df_roles["role_id"].duplicated()]["role_id"].tolist()
        warnings.append(f"[DUPLICATE ROLE IDs]: {dups}")
    if df_skills["skill_id"].duplicated().any():
        dups = df_skills[df_skills["skill_id"].duplicated()]["skill_id"].tolist()
        warnings.append(f"[DUPLICATE SKILL IDs]: {dups}")
    if df_jobs["job_id"].duplicated().any():
        dups = df_jobs[df_jobs["job_id"].duplicated()]["job_id"].tolist()
        warnings.append(f"[DUPLICATE JOB IDs]: {dups}")
    if df_job_skills["mapping_id"].duplicated().any():
        dups = df_job_skills[df_job_skills["mapping_id"].duplicated()]["mapping_id"].tolist()
        warnings.append(f"[DUPLICATE MAPPING IDs]: {dups}")

    # 4. Check missing values
    for name, df in [("Roles", df_roles), ("Skills", df_skills), ("Jobs", df_jobs), ("JobSkills", df_job_skills)]:
        null_counts = df.isnull().sum()
        cols_with_nulls = null_counts[null_counts > 0]
        if not cols_with_nulls.empty:
            msg = f"[MISSING VALUES] {name} contains null values: {cols_with_nulls.to_dict()}"
            warnings.append(msg)
            print(msg)

    # 5. Normalize Skill Names in job_skills
    def normalize_skill(name):
        if not isinstance(name, str):
            return name
        cleaned = name.strip()
        lower = cleaned.lower()
        return SKILL_ALIAS_MAP.get(lower, cleaned)

    df_job_skills["skill_name_normalized"] = df_job_skills["skill_name"].apply(normalize_skill)
    df_skills["name"] = df_skills["name"].str.strip()

    # 6. Validate FK references
    valid_role_ids = set(df_roles["role_id"])
    invalid_job_roles = df_jobs[~df_jobs["role_id"].isin(valid_role_ids)]
    if not invalid_job_roles.empty:
        msg = f"[FK WARNING] Jobs referencing unknown role_id: {invalid_job_roles['job_id'].tolist()}"
        warnings.append(msg)
        print(msg)

    valid_job_ids = set(df_jobs["job_id"])
    invalid_js_jobs = df_job_skills[~df_job_skills["job_id"].isin(valid_job_ids)]
    if not invalid_js_jobs.empty:
        msg = f"[FK WARNING] JobSkills referencing unknown job_id: {invalid_js_jobs['mapping_id'].tolist()}"
        warnings.append(msg)
        print(msg)

    valid_skill_names = set(df_skills["name"])
    unmatched_skills = df_job_skills[~df_job_skills["skill_name_normalized"].isin(valid_skill_names)]
    if not unmatched_skills.empty:
        msg = f"[FK WARNING] JobSkills with unknown skill names: {unmatched_skills['skill_name_normalized'].unique().tolist()}"
        warnings.append(msg)
        print(msg)

    # Replace normalized skill name back
    df_job_skills["skill_name"] = df_job_skills["skill_name_normalized"]
    df_job_skills.drop(columns=["skill_name_normalized"], inplace=True)

    # Ensure synthetic flag remains True
    df_roles["is_synthetic"] = True
    df_skills["is_synthetic"] = True
    df_jobs["is_synthetic"] = True
    df_job_skills["is_synthetic"] = True

    # Save to processed directory
    df_roles.to_csv(PROCESSED_DIR / "cleaned_role_catalog.csv", index=False)
    df_skills.to_csv(PROCESSED_DIR / "cleaned_skill_taxonomy.csv", index=False)
    df_jobs.to_csv(PROCESSED_DIR / "cleaned_synthetic_jobs.csv", index=False)
    df_job_skills.to_csv(PROCESSED_DIR / "cleaned_job_skills.csv", index=False)

    summary = {
        "roles_count": len(df_roles),
        "skills_count": len(df_skills),
        "jobs_count": len(df_jobs),
        "job_skills_mappings_count": len(df_job_skills),
        "warnings_count": len(warnings)
    }

    print("\n----------------- SUMMARY COUNTS -----------------")
    for k, v in summary.items():
        print(f"  {k}: {v}")
    print("--------------------------------------------------")
    print(f"Cleaned datasets written to: {PROCESSED_DIR}")
    print("Pipeline execution completed successfully.\n")

    return summary, warnings


if __name__ == "__main__":
    clean_and_validate()
