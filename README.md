# SkillNova (Career Readiness, Made Accessible)

> **Slogan:** Your skills. Your next step.  
> **Supporting tagline:** Career readiness, made accessible.

SkillNova is a career-readiness platform designed for college students to bridge the gap between academic education and entry-level technology job requirements. It provides transparent skill diagnostics, benchmark gap analysis, curated free learning resources, practical projects, and a personalized weekly learning roadmap without expensive paid guidance lock-in.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, JavaScript (JSX), React Router, Plain CSS (Design Tokens), Lucide React icons, Plotly.js
- **Backend:** Python 3.11, Django, Django REST Framework
- **Database:** SQLite with Django ORM
- **Data Processing:** Pandas
- **Branding & Theme:** Curated White and Purple with soft lavender accents (`#7548D8`, `#5932B4`, `#A78BFA`, `#F5F0FF`, `#241D35`)

---

## 📁 Repository Structure

```
SkillNova2/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3                  # SQLite database with seeded synthetic catalog
│   ├── config/                     # Django project settings & URLs
│   ├── users/                      # User authentication & profile management
│   ├── jobs/                       # Roles, synthetic jobs, skill taxonomy, import commands
│   ├── assessments/                # Diagnostic questions & scoring engine
│   ├── matching/                   # Rules-based Skill Intelligence Engine
│   ├── roadmaps/                   # Roadmaps, weekly tasks, free resources, student projects
│   └── tests/                      # Automated test suite (models, APIs, engine)
├── data/
│   ├── raw/                        # Raw CSV synthetic dataset pack
│   └── processed/                  # Cleaned and normalized CSV outputs
├── data_pipeline/
│   └── clean_data.py               # Reproducible Pandas validation & cleaning pipeline
├── frontend/
│   ├── package.json
│   ├── vite.config.js              # Vite config with manual chunk splitting
│   ├── index.html
│   └── src/
│       ├── assets/
│       ├── components/             # Reusable UI cards, badges, inputs, layout, Plotly charts
│       ├── data/                   # Local demo benchmark data (offline mode)
│       ├── pages/                  # 15 application pages (Landing, Login, Dashboard, etc.)
│       ├── services/               # Centralized API service with demo mode fallback
│       ├── styles/                 # Design tokens and styling
│       ├── App.jsx                 # Central router & state manager
│       └── main.jsx                # Application root
└── README.md
```

---

## 🚀 Quickstart Guide (Windows)

### 1. Backend Setup & Run

Open a terminal in the project directory:

```powershell
cd backend

# Run database migrations (already applied)
python manage.py migrate

# (Optional) Re-import or refresh synthetic dataset & seed questions
python manage.py import_dataset

# Run backend automated tests
python manage.py test tests

# Start Django development server (http://127.0.0.1:8000)
python manage.py runserver 127.0.0.1:8000
```

### 2. Frontend Setup & Run

Open a second terminal window:

```powershell
cd frontend

# Install dependencies (already installed)
npm install

# Build production bundle
npm run build

# Start Vite development server (http://localhost:5173)
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 📊 Dual Mode: Connected Mode vs Interactive Demo Mode

The frontend automatically detects whether the Django REST Framework backend is reachable at `http://127.0.0.1:8000/api/`:
- **Connected Mode:** Active when the Django dev server is running. Full authentication, server persistence for profile updates, task toggles, and assessment scoring.
- **Interactive Demo Mode:** Active when exploring offline or without starting the backend. Allows complete interactive exploration of all 15 pages, mock diagnostic assessments, task completion persistence in local storage, and transparent skill gap calculation.

---

## 🧪 Automated Test Verification

To run backend tests verifying models, APIs, permissions, and the Skill Intelligence Engine formula:

```powershell
cd backend
python manage.py test tests
```

Output:
```
Creating test database for alias 'default'...
....
----------------------------------------------------------------------
Ran 4 tests in 2.864s

OK
Destroying test database for alias 'default'...
```

To run the reproducible Pandas data cleaning pipeline:

```powershell
python data_pipeline/clean_data.py
```

Output:
```
[SCHEMA CHECK] Roles Catalog: Columns verified (6 columns)
[SCHEMA CHECK] Skill Taxonomy: Columns verified (6 columns)
[SCHEMA CHECK] Synthetic Jobs: Columns verified (12 columns)
[SCHEMA CHECK] Job Skills Mapping: Columns verified (6 columns)
----------------- SUMMARY COUNTS -----------------
  roles_count: 16
  skills_count: 24
  jobs_count: 16
  job_skills_mappings_count: 82
  warnings_count: 0
--------------------------------------------------
```

---

## 📌 Notice on Synthetic Data
All role requirements, company names, job postings, and salary estimations in the dataset are synthetic demonstration benchmarks designed for academic skill mapping. SkillNova does not claim guaranteed placements or verified employment offers.
