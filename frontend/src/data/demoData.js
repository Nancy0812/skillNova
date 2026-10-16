/**
 * SkillNova Centralized Demo Data Pack
 * Generated directly from validated raw CSV datasets located in data/raw/:
 * - skillnova_role_catalog.csv (16 roles)
 * - skillnova_skill_taxonomy.csv (24 skills)
 * - skillnova_synthetic_jobs.csv (16 synthetic jobs)
 * - skillnova_job_skills.csv (82 job-skill mappings)
 *
 * NOTE: All records are synthetic demo benchmarks for educational calibration.
 * No real vacancies, salary figures, or guaranteed outcomes are represented.
 */

export const DEMO_ROLES = [
  {
    "role_id": "ROLE_DA_01",
    "family": "Data & Analytics",
    "title": "Data Analyst",
    "description": "Transforms raw business data into actionable dashboards and statistical reports using SQL and visualization tools.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "SQL",
      "Python",
      "Pandas & NumPy",
      "Data Visualization"
    ],
    "skills_preferred": [
      "Statistics & Probability",
      "Power BI / Tableau"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_DA_02",
    "family": "Data & Analytics",
    "title": "Business Intelligence Analyst",
    "description": "Designs enterprise KPI metrics and automated reporting workflows for operational decision making.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "SQL",
      "Power BI / Tableau",
      "Data Visualization"
    ],
    "skills_preferred": [
      "Database Design & ORM",
      "Python"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_DA_03",
    "family": "Data & Analytics",
    "title": "Product Analyst",
    "description": "Measures user behavior and A/B test results to drive product optimization and engagement.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "SQL",
      "Statistics & Probability",
      "Pandas & NumPy"
    ],
    "skills_preferred": [
      "Data Visualization"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_AI_01",
    "family": "AI & Machine Learning",
    "title": "Data Scientist",
    "description": "Builds statistical and predictive models using exploratory data analysis and supervised learning algorithms.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Python",
      "Pandas & NumPy",
      "Statistics & Probability",
      "Machine Learning Fundamentals"
    ],
    "skills_preferred": [
      "SQL",
      "Data Visualization"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_AI_02",
    "family": "AI & Machine Learning",
    "title": "ML Engineer",
    "description": "Designs model training pipelines and deploys inference endpoints for production machine learning services.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Python",
      "Machine Learning Fundamentals",
      "Docker",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "RESTful APIs",
      "Linux Fundamentals"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_AI_03",
    "family": "AI & Machine Learning",
    "title": "NLP Engineer",
    "description": "Develops text processing pipelines and language model fine-tuning workflows for unstructured text.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Python",
      "Machine Learning Fundamentals",
      "Pandas & NumPy"
    ],
    "skills_preferred": [
      "Git & GitHub"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_SD_01",
    "family": "Software Development",
    "title": "Python Developer",
    "description": "Builds backend services and automation scripts using modern Python paradigms and REST APIs.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Python",
      "RESTful APIs",
      "SQL",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "Unit Testing",
      "Docker"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_SD_02",
    "family": "Software Development",
    "title": "Java Developer",
    "description": "Develops enterprise-grade backend microservices and object-oriented architectures with Java and Spring.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Java",
      "Database Design & ORM",
      "RESTful APIs",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "Unit Testing"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_SD_03",
    "family": "Software Development",
    "title": "Backend Developer",
    "description": "Engineers scalable server-side systems, database schemas, and RESTful API integrations.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "RESTful APIs",
      "SQL",
      "Python",
      "Database Design & ORM"
    ],
    "skills_preferred": [
      "Docker",
      "Git & GitHub"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_SD_04",
    "family": "Software Development",
    "title": "Software Engineer",
    "description": "Applies foundational algorithms, data structures, and modular software engineering principles.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Data Structures & Algorithms",
      "Git & GitHub",
      "Unit Testing",
      "Problem Solving & Debugging"
    ],
    "skills_preferred": [
      "Python"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_WD_01",
    "family": "Web Development",
    "title": "Frontend Developer",
    "description": "Creates responsive, accessible, and high-performance client web interfaces using modern JavaScript and CSS.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "RESTful APIs"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_WD_02",
    "family": "Web Development",
    "title": "Full Stack Developer",
    "description": "Develops end-to-end web applications combining user-friendly frontends with robust backend architectures.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "React",
      "JavaScript",
      "RESTful APIs",
      "SQL",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "Docker"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_CD_01",
    "family": "Cloud & DevOps",
    "title": "DevOps Engineer",
    "description": "Automates continuous integration and deployment pipelines with monitoring and infrastructure-as-code.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Linux Fundamentals",
      "Docker",
      "CI/CD Pipelines",
      "Git & GitHub"
    ],
    "skills_preferred": [
      "Cloud Basics (AWS/Azure)"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_CD_02",
    "family": "Cloud & DevOps",
    "title": "Cloud Engineer",
    "description": "Provisions, configures, and secures cloud computing resources, storage, and networking instances.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Cloud Basics (AWS/Azure)",
      "Linux Fundamentals",
      "Docker"
    ],
    "skills_preferred": [
      "Kubernetes Basics",
      "CI/CD Pipelines"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_CS_01",
    "family": "Cybersecurity",
    "title": "Security Analyst",
    "description": "Identifies vulnerabilities, audits system security configurations, and assesses operational security risks.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Network Security Fundamentals",
      "Linux Fundamentals",
      "Cyber Incident Response"
    ],
    "skills_preferred": [
      "Problem Solving & Debugging"
    ],
    "is_synthetic": true
  },
  {
    "role_id": "ROLE_CS_02",
    "family": "Cybersecurity",
    "title": "SOC Analyst",
    "description": "Monitors real-time security events, detects intrusion alerts, and conducts initial incident triage.",
    "experience_level": "Entry-Level",
    "skills_required": [
      "Cyber Incident Response",
      "Network Security Fundamentals",
      "Linux Fundamentals"
    ],
    "skills_preferred": [
      "Git & GitHub"
    ],
    "is_synthetic": true
  }
];

export const DEMO_SKILLS = [
  {
    "skill_id": "SK_01",
    "name": "Python",
    "category": "Technical",
    "subcategory": "Programming Languages",
    "description": "General-purpose scripting and application programming language",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_02",
    "name": "SQL",
    "category": "Technical",
    "subcategory": "Databases",
    "description": "Relational database querying and data modeling",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_03",
    "name": "JavaScript",
    "category": "Technical",
    "subcategory": "Programming Languages",
    "description": "Core dynamic scripting language of the web platform",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_04",
    "name": "React",
    "category": "Technical",
    "subcategory": "Web Frameworks",
    "description": "Component-based UI library for modern web applications",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_05",
    "name": "HTML/CSS",
    "category": "Technical",
    "subcategory": "Web Fundamentals",
    "description": "Standard markup and styling fundamentals for web pages",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_06",
    "name": "Java",
    "category": "Technical",
    "subcategory": "Programming Languages",
    "description": "Object-oriented programming language for enterprise software",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_07",
    "name": "Git & GitHub",
    "category": "Technical",
    "subcategory": "Developer Tools",
    "description": "Version control system and collaborative code workflows",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_08",
    "name": "Docker",
    "category": "Technical",
    "subcategory": "DevOps & Containers",
    "description": "Container virtualization for reproducible application execution",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_09",
    "name": "Linux Fundamentals",
    "category": "Technical",
    "subcategory": "Operating Systems",
    "description": "Command-line operations, shell scripting, and permissions",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_10",
    "name": "RESTful APIs",
    "category": "Technical",
    "subcategory": "Backend Architecture",
    "description": "API design principles, HTTP methods, and status codes",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_11",
    "name": "Pandas & NumPy",
    "category": "Technical",
    "subcategory": "Data Science",
    "description": "Data manipulation and numerical array computations",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_12",
    "name": "Data Visualization",
    "category": "Technical",
    "subcategory": "Data Science",
    "description": "Creating charts and dashboards with tools or code",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_13",
    "name": "Statistics & Probability",
    "category": "Technical",
    "subcategory": "Data Science",
    "description": "Inferential statistics, hypothesis testing, and distributions",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_14",
    "name": "Machine Learning Fundamentals",
    "category": "Technical",
    "subcategory": "AI & ML",
    "description": "Supervised/unsupervised algorithms, evaluation metrics",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_15",
    "name": "Cloud Basics (AWS/Azure)",
    "category": "Technical",
    "subcategory": "Cloud Computing",
    "description": "Core cloud services: compute, storage, networking",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_16",
    "name": "CI/CD Pipelines",
    "category": "Technical",
    "subcategory": "DevOps & Containers",
    "description": "Continuous integration and automated build/deployment pipelines",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_17",
    "name": "Data Structures & Algorithms",
    "category": "Technical",
    "subcategory": "Core Fundamentals",
    "description": "Arrays, trees, graphs, sorting, searching, and complexity",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_18",
    "name": "Network Security Fundamentals",
    "category": "Technical",
    "subcategory": "Cybersecurity",
    "description": "OSI model, TCP/IP, firewalls, and encrypted protocols",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_19",
    "name": "Cyber Incident Response",
    "category": "Technical",
    "subcategory": "Cybersecurity",
    "description": "Log analysis, threat triaging, and vulnerability assessment",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_20",
    "name": "Kubernetes Basics",
    "category": "Technical",
    "subcategory": "DevOps & Containers",
    "description": "Container orchestration and service discovery concepts",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_21",
    "name": "Power BI / Tableau",
    "category": "Technical",
    "subcategory": "Business Intelligence",
    "description": "Interactive business intelligence reporting and KPI dashboards",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_22",
    "name": "Database Design & ORM",
    "category": "Technical",
    "subcategory": "Databases",
    "description": "Relational schema normalization and object-relational mapping",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_23",
    "name": "Unit Testing",
    "category": "Technical",
    "subcategory": "Software Quality",
    "description": "Test-driven patterns, assertion testing, and code coverage",
    "is_synthetic": true
  },
  {
    "skill_id": "SK_24",
    "name": "Problem Solving & Debugging",
    "category": "Professional",
    "subcategory": "Engineering Practices",
    "description": "Systematic root-cause analysis and code troubleshooting",
    "is_synthetic": true
  }
];

export const DEMO_SYNTHETIC_JOBS = [
  {
    "job_id": "SJOB_001",
    "title": "Junior Data Analyst",
    "role_id": "ROLE_DA_01",
    "company": "Synthetix Analytics Lab",
    "role_family": "Data & Analytics",
    "sub_role": "Data Analyst",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$55k - $70k (Synthetic Demo Range)",
    "description": "Analyze product telemetry and produce interactive dashboards for business stakeholders.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_002",
    "title": "Associate BI Analyst",
    "role_id": "ROLE_DA_02",
    "company": "Aura Retail Dynamics",
    "role_family": "Data & Analytics",
    "sub_role": "Business Intelligence Analyst",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$58k - $72k (Synthetic Demo Range)",
    "description": "Design automated KPI reports and monitor data warehouse pipeline health.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_003",
    "title": "Junior Product Analyst",
    "role_id": "ROLE_DA_03",
    "company": "Pulse Media App Studio",
    "role_family": "Data & Analytics",
    "sub_role": "Product Analyst",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$60k - $75k (Synthetic Demo Range)",
    "description": "Run cohort analyses and feature adoption experiments on mobile user metrics.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_004",
    "title": "Junior Data Scientist",
    "role_id": "ROLE_AI_01",
    "company": "NeuraMetric AI Labs",
    "role_family": "AI & Machine Learning",
    "sub_role": "Data Scientist",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$65k - $80k (Synthetic Demo Range)",
    "description": "Perform feature engineering and train baseline classification and regression models.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_005",
    "title": "Associate ML Engineer",
    "role_id": "ROLE_AI_02",
    "company": "Cognitive Matrix",
    "role_family": "AI & Machine Learning",
    "sub_role": "ML Engineer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$68k - $85k (Synthetic Demo Range)",
    "description": "Support deployment of model inference services inside Docker containers.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_006",
    "title": "Junior NLP Engineer",
    "role_id": "ROLE_AI_03",
    "company": "LexiFlow Technologies",
    "role_family": "AI & Machine Learning",
    "sub_role": "NLP Engineer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$65k - $82k (Synthetic Demo Range)",
    "description": "Preprocess textual corpora and fine-tune transformer classifiers for sentiment routing.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_007",
    "title": "Junior Python Developer",
    "role_id": "ROLE_SD_01",
    "company": "KiteLogic Software",
    "role_family": "Software Development",
    "sub_role": "Python Developer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$60k - $74k (Synthetic Demo Range)",
    "description": "Develop background worker services, REST APIs, and automated data ingestion scripts.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_008",
    "title": "Associate Java Developer",
    "role_id": "ROLE_SD_02",
    "company": "Apex Enterprise Systems",
    "role_family": "Software Development",
    "sub_role": "Java Developer",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$62k - $78k (Synthetic Demo Range)",
    "description": "Implement enterprise microservice controllers, unit tests, and relational queries.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_009",
    "title": "Junior Backend Developer",
    "role_id": "ROLE_SD_03",
    "company": "Beacon Cloud Platforms",
    "role_family": "Software Development",
    "sub_role": "Backend Developer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$64k - $80k (Synthetic Demo Range)",
    "description": "Build scalable endpoints, authentication flows, and manage SQL database queries.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_010",
    "title": "Associate Software Engineer",
    "role_id": "ROLE_SD_04",
    "company": "Vanguard Tech Works",
    "role_family": "Software Development",
    "sub_role": "Software Engineer",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$65k - $82k (Synthetic Demo Range)",
    "description": "Write clean code, write unit tests, and contribute to sprint deliverables in agile teams.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_011",
    "title": "Junior Frontend Developer",
    "role_id": "ROLE_WD_01",
    "company": "Canvas Digital Studio",
    "role_family": "Web Development",
    "sub_role": "Frontend Developer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$58k - $72k (Synthetic Demo Range)",
    "description": "Translate wireframes into responsive React components with modern CSS layout.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_012",
    "title": "Associate Full Stack Developer",
    "role_id": "ROLE_WD_02",
    "company": "Orbit Web Solutions",
    "role_family": "Web Development",
    "sub_role": "Full Stack Developer",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$64k - $80k (Synthetic Demo Range)",
    "description": "Implement user interfaces and connect backend API routes with database schemas.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_013",
    "title": "Junior DevOps Engineer",
    "role_id": "ROLE_CD_01",
    "company": "TerraCloud Systems",
    "role_family": "Cloud & DevOps",
    "sub_role": "DevOps Engineer",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$66k - $82k (Synthetic Demo Range)",
    "description": "Maintain GitHub Actions CI/CD workflows and monitor containerized infrastructure.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_014",
    "title": "Associate Cloud Engineer",
    "role_id": "ROLE_CD_02",
    "company": "Nimbus Infrastructure",
    "role_family": "Cloud & DevOps",
    "sub_role": "Cloud Engineer",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$68k - $85k (Synthetic Demo Range)",
    "description": "Configure VPC networks, cloud storage buckets, and serverless compute functions.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_015",
    "title": "Junior Cybersecurity Analyst",
    "role_id": "ROLE_CS_01",
    "company": "Fortress Cyber Defense",
    "role_family": "Cybersecurity",
    "sub_role": "Security Analyst",
    "experience_level": "Entry-Level",
    "location": "Remote",
    "salary_range_est": "$60k - $76k (Synthetic Demo Range)",
    "description": "Conduct periodic vulnerability scans and verify policy compliance across workstations.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  },
  {
    "job_id": "SJOB_016",
    "title": "SOC Analyst Tier 1",
    "role_id": "ROLE_CS_02",
    "company": "Guardian Security Ops",
    "role_family": "Cybersecurity",
    "sub_role": "SOC Analyst",
    "experience_level": "Entry-Level",
    "location": "Hybrid",
    "salary_range_est": "$58k - $74k (Synthetic Demo Range)",
    "description": "Investigate incoming SIEM security alerts and report suspicious traffic patterns.",
    "source": "SkillNova Synthetic Dataset Pack v1",
    "is_synthetic": true,
    "demo_notice": "SYNTHETIC DEMO BENCHMARK: Illustrative salary and job specification for educational readiness calibration only."
  }
];

export const DEMO_JOB_SKILLS = [
  {
    "mapping_id": "MAP_001",
    "job_id": "SJOB_001",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_002",
    "job_id": "SJOB_001",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_003",
    "job_id": "SJOB_001",
    "skill_name": "Pandas & NumPy",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_004",
    "job_id": "SJOB_001",
    "skill_name": "Data Visualization",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_005",
    "job_id": "SJOB_001",
    "skill_name": "Statistics & Probability",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_006",
    "job_id": "SJOB_001",
    "skill_name": "Power BI / Tableau",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_007",
    "job_id": "SJOB_002",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_008",
    "job_id": "SJOB_002",
    "skill_name": "Power BI / Tableau",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_009",
    "job_id": "SJOB_002",
    "skill_name": "Data Visualization",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_010",
    "job_id": "SJOB_002",
    "skill_name": "Database Design & ORM",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_011",
    "job_id": "SJOB_002",
    "skill_name": "Python",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_012",
    "job_id": "SJOB_003",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_013",
    "job_id": "SJOB_003",
    "skill_name": "Statistics & Probability",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_014",
    "job_id": "SJOB_003",
    "skill_name": "Pandas & NumPy",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_015",
    "job_id": "SJOB_003",
    "skill_name": "Data Visualization",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_016",
    "job_id": "SJOB_004",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_017",
    "job_id": "SJOB_004",
    "skill_name": "Pandas & NumPy",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_018",
    "job_id": "SJOB_004",
    "skill_name": "Statistics & Probability",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_019",
    "job_id": "SJOB_004",
    "skill_name": "Machine Learning Fundamentals",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_020",
    "job_id": "SJOB_004",
    "skill_name": "SQL",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_021",
    "job_id": "SJOB_004",
    "skill_name": "Data Visualization",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_022",
    "job_id": "SJOB_005",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_023",
    "job_id": "SJOB_005",
    "skill_name": "Machine Learning Fundamentals",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_024",
    "job_id": "SJOB_005",
    "skill_name": "Docker",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_025",
    "job_id": "SJOB_005",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_026",
    "job_id": "SJOB_005",
    "skill_name": "RESTful APIs",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_027",
    "job_id": "SJOB_005",
    "skill_name": "Linux Fundamentals",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_028",
    "job_id": "SJOB_006",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_029",
    "job_id": "SJOB_006",
    "skill_name": "Machine Learning Fundamentals",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_030",
    "job_id": "SJOB_006",
    "skill_name": "Pandas & NumPy",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_031",
    "job_id": "SJOB_006",
    "skill_name": "Git & GitHub",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_032",
    "job_id": "SJOB_007",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_033",
    "job_id": "SJOB_007",
    "skill_name": "RESTful APIs",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_034",
    "job_id": "SJOB_007",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_035",
    "job_id": "SJOB_007",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_036",
    "job_id": "SJOB_007",
    "skill_name": "Unit Testing",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_037",
    "job_id": "SJOB_007",
    "skill_name": "Docker",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_038",
    "job_id": "SJOB_008",
    "skill_name": "Java",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_039",
    "job_id": "SJOB_008",
    "skill_name": "Database Design & ORM",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_040",
    "job_id": "SJOB_008",
    "skill_name": "RESTful APIs",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_041",
    "job_id": "SJOB_008",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_042",
    "job_id": "SJOB_008",
    "skill_name": "Unit Testing",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_043",
    "job_id": "SJOB_009",
    "skill_name": "RESTful APIs",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_044",
    "job_id": "SJOB_009",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_045",
    "job_id": "SJOB_009",
    "skill_name": "Python",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_046",
    "job_id": "SJOB_009",
    "skill_name": "Database Design & ORM",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_047",
    "job_id": "SJOB_009",
    "skill_name": "Docker",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_048",
    "job_id": "SJOB_009",
    "skill_name": "Git & GitHub",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_049",
    "job_id": "SJOB_010",
    "skill_name": "Data Structures & Algorithms",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_050",
    "job_id": "SJOB_010",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_051",
    "job_id": "SJOB_010",
    "skill_name": "Unit Testing",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_052",
    "job_id": "SJOB_010",
    "skill_name": "Problem Solving & Debugging",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_053",
    "job_id": "SJOB_010",
    "skill_name": "Python",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_054",
    "job_id": "SJOB_011",
    "skill_name": "HTML/CSS",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_055",
    "job_id": "SJOB_011",
    "skill_name": "JavaScript",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_056",
    "job_id": "SJOB_011",
    "skill_name": "React",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_057",
    "job_id": "SJOB_011",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_058",
    "job_id": "SJOB_011",
    "skill_name": "RESTful APIs",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_059",
    "job_id": "SJOB_012",
    "skill_name": "React",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_060",
    "job_id": "SJOB_012",
    "skill_name": "JavaScript",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_061",
    "job_id": "SJOB_012",
    "skill_name": "RESTful APIs",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_062",
    "job_id": "SJOB_012",
    "skill_name": "SQL",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_063",
    "job_id": "SJOB_012",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_064",
    "job_id": "SJOB_012",
    "skill_name": "Docker",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_065",
    "job_id": "SJOB_013",
    "skill_name": "Linux Fundamentals",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_066",
    "job_id": "SJOB_013",
    "skill_name": "Docker",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_067",
    "job_id": "SJOB_013",
    "skill_name": "CI/CD Pipelines",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_068",
    "job_id": "SJOB_013",
    "skill_name": "Git & GitHub",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_069",
    "job_id": "SJOB_013",
    "skill_name": "Cloud Basics (AWS/Azure)",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_070",
    "job_id": "SJOB_014",
    "skill_name": "Cloud Basics (AWS/Azure)",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_071",
    "job_id": "SJOB_014",
    "skill_name": "Linux Fundamentals",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_072",
    "job_id": "SJOB_014",
    "skill_name": "Docker",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_073",
    "job_id": "SJOB_014",
    "skill_name": "Kubernetes Basics",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_074",
    "job_id": "SJOB_014",
    "skill_name": "CI/CD Pipelines",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_075",
    "job_id": "SJOB_015",
    "skill_name": "Network Security Fundamentals",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_076",
    "job_id": "SJOB_015",
    "skill_name": "Linux Fundamentals",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_077",
    "job_id": "SJOB_015",
    "skill_name": "Cyber Incident Response",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_078",
    "job_id": "SJOB_015",
    "skill_name": "Problem Solving & Debugging",
    "requirement_type": "preferred",
    "importance_weight": 2.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_079",
    "job_id": "SJOB_016",
    "skill_name": "Cyber Incident Response",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_080",
    "job_id": "SJOB_016",
    "skill_name": "Network Security Fundamentals",
    "requirement_type": "required",
    "importance_weight": 3.0,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_081",
    "job_id": "SJOB_016",
    "skill_name": "Linux Fundamentals",
    "requirement_type": "required",
    "importance_weight": 2.5,
    "is_synthetic": true
  },
  {
    "mapping_id": "MAP_082",
    "job_id": "SJOB_016",
    "skill_name": "Git & GitHub",
    "requirement_type": "preferred",
    "importance_weight": 1.5,
    "is_synthetic": true
  }
];

export const DEMO_RESOURCES = [
  {
    "id": 1,
    "title": "MDN Web Docs: HTML & CSS Core Guide",
    "skill_name": "HTML/CSS",
    "level": "Beginner",
    "format": "Documentation",
    "cost_category": "Free",
    "estimated_duration": "6 hours",
    "source_url": "https://developer.mozilla.org/en-US/docs/Learn",
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
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
    "is_verified_free": true,
    "description": "Free official handbook covering branches, commits, remotes, merging, and collaboration workflows."
  }
];

export const DEMO_PROJECTS = [
  {
    "id": 1,
    "title": "College Club Event Showcase & Registration Portal",
    "target_role_family": "Web Development",
    "target_role_title": "Frontend Developer",
    "skills_practiced": [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Git & GitHub"
    ],
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
    "skills_practiced": [
      "Python",
      "RESTful APIs",
      "SQL",
      "Unit Testing"
    ],
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
    "skills_practiced": [
      "SQL",
      "Python",
      "Pandas & NumPy",
      "Data Visualization"
    ],
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
    "skills_practiced": [
      "Network Security Fundamentals",
      "Linux Fundamentals",
      "Cyber Incident Response"
    ],
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
    "skills_practiced": [
      "Linux Fundamentals",
      "Docker",
      "CI/CD Pipelines",
      "Git & GitHub"
    ],
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
    "skills_practiced": [
      "Python",
      "Pandas & NumPy",
      "Statistics & Probability",
      "Machine Learning Fundamentals"
    ],
    "difficulty": "Beginner",
    "description": "Build an end-to-end data pipeline cleaning academic features, encoding categories, and training a logistic regression model.",
    "deliverables": [
      "Exploratory Jupyter notebook with correlation heatmaps",
      "Feature engineering pipeline with standard scalers",
      "Confusion matrix and ROC-AUC evaluation report"
    ],
    "estimated_hours": 12
  }
];
