/**
 * SkillNova Centralized Data & State Service
 * Single source of truth for:
 * - Role catalog
 * - Progressive foundational skills
 * - Student profile & target career
 * - Interactive roadmap task completion (persisted in localStorage)
 * - Verifiable diagnostic assessment history & scoring
 * - Derived student progress
 */

import {
  DEMO_ROLES,
  DEMO_SKILLS,
  DEMO_SYNTHETIC_JOBS,
  DEMO_JOB_SKILLS,
  DEMO_RESOURCES,
  DEMO_PROJECTS
} from '../data/demoData.js';
import { getFoundationalSkillsForRole, BEGINNER_ASSESSMENT_QUESTIONS } from '../data/foundationalSkills.js';

const STORAGE_KEY = 'skillnova_student_state_v2';

const INITIAL_DEFAULT_STATE = {
  profile: {
    first_name: 'Alex',
    email: 'alex@college.edu',
    college: 'National Engineering College',
    education_level: 'Undergraduate',
    target_role_id: 'ROLE_DA_01',
    target_role_title: 'Data Analyst',
    target_family: 'Data & Analytics',
    study_hours_per_week: 8,
    learning_style: 'hands-on',
    weekly_goal: 'Understand spreadsheet filtering and basic SQL queries'
  },
  // Map of skillName -> 'Not Started' | 'Learning' | 'Practised'
  skillStatuses: {
    "Spreadsheet Fundamentals": "Learning",
    "Basic SQL": "Not Started",
    "Data Interpretation": "Not Started",
    "Basic Statistics": "Not Started",
    "Charts & Visualizations": "Not Started"
  },
  // List of task IDs marked complete by the user
  completedTaskIds: [],
  // Assessment attempts history
  assessmentHistory: []
};

// Internal cache
let cachedState = null;
const stateChangeListeners = new Set();

export function subscribeToStateChanges(listener) {
  stateChangeListeners.add(listener);
  return () => stateChangeListeners.delete(listener);
}

function notifyListeners() {
  stateChangeListeners.forEach(fn => {
    try { fn(getStudentState()); } catch (e) { console.error(e); }
  });
}

export function getStudentState() {
  if (cachedState) return cachedState;

  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        cachedState = JSON.parse(raw);
        return cachedState;
      }
    }
  } catch (err) {
    console.warn("Storage parse error, using default state:", err);
  }

  cachedState = { ...INITIAL_DEFAULT_STATE };
  saveStudentState(cachedState);
  return cachedState;
}

export function saveStudentState(newState) {
  cachedState = { ...newState };
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedState));
    }
  } catch (err) {
    console.error("Failed to persist state:", err);
  }
  notifyListeners();
}

/**
 * Updates target career role and recalculates foundational skills
 */
export function setTargetCareer(roleId, roleTitle, roleFamily) {
  const state = getStudentState();
  const foundationalSkills = getFoundationalSkillsForRole(roleTitle, roleFamily);

  // Initialize statuses for new role's skills if not already present
  const updatedStatuses = { ...state.skillStatuses };
  foundationalSkills.forEach(skill => {
    if (!updatedStatuses[skill.name]) {
      updatedStatuses[skill.name] = "Not Started";
    }
  });

  const updatedState = {
    ...state,
    profile: {
      ...state.profile,
      target_role_id: roleId,
      target_role_title: roleTitle,
      target_family: roleFamily
    },
    skillStatuses: updatedStatuses
  };

  saveStudentState(updatedState);
  return updatedState;
}

/**
 * Updates profile fields (college, study hours, name, etc.)
 */
export function updateStudentProfile(fields) {
  const state = getStudentState();
  const updatedState = {
    ...state,
    profile: {
      ...state.profile,
      ...fields
    }
  };
  saveStudentState(updatedState);
  return updatedState;
}

/**
 * Gets foundational skills for current student role with real statuses
 */
export function getCurrentFoundationalSkills() {
  const state = getStudentState();
  const roleTitle = state.profile?.target_role_title || 'Data Analyst';
  const roleFamily = state.profile?.target_family || 'Data & Analytics';

  const baseSkills = getFoundationalSkillsForRole(roleTitle, roleFamily);
  const statuses = state.skillStatuses || {};

  return baseSkills.map(skill => ({
    ...skill,
    status: statuses[skill.name] || "Not Started"
  }));
}

/**
 * Sets a skill status ('Not Started', 'Learning', 'Practised')
 */
export function updateSkillStatus(skillName, newStatus) {
  const state = getStudentState();
  const updatedStatuses = {
    ...state.skillStatuses,
    [skillName]: newStatus
  };

  const updatedState = {
    ...state,
    skillStatuses: updatedStatuses
  };

  saveStudentState(updatedState);
  return updatedState;
}

/**
 * Generates beginner roadmap tasks based on current role's foundational skills
 */
export function getCurrentRoadmapTasks() {
  const state = getStudentState();
  const skills = getCurrentFoundationalSkills();
  const completedIds = new Set(state.completedTaskIds || []);

  return skills.map((skill, index) => {
    const taskId = index + 1;
    return {
      id: taskId,
      week_number: Math.floor(index / 2) + 1,
      skill_name: skill.name,
      title: skill.taskTitle,
      description: skill.taskDescription,
      whyItMatters: skill.whyItMatters,
      resource_url: skill.freeResourceUrl,
      is_completed: completedIds.has(taskId),
      level: skill.level
    };
  });
}

/**
 * Toggles a roadmap task complete / uncomplete
 */
export function toggleRoadmapTask(taskId) {
  const state = getStudentState();
  const completed = new Set(state.completedTaskIds || []);

  if (completed.has(taskId)) {
    completed.delete(taskId);
  } else {
    completed.add(taskId);
  }

  const updatedState = {
    ...state,
    completedTaskIds: Array.from(completed)
  };

  saveStudentState(updatedState);
  return updatedState;
}

/**
 * Records an assessment attempt and marks skill 'Practised' if passed
 */
export function recordAssessmentAttempt(skillName, score, correctCount, totalQuestions, resultsList) {
  const state = getStudentState();
  const passed = score >= 60;

  const newAttempt = {
    id: Date.now(),
    skill_name: skillName,
    score,
    correct_count: correctCount,
    total_questions: totalQuestions,
    passed,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    results: resultsList
  };

  const updatedHistory = [newAttempt, ...(state.assessmentHistory || [])];

  // Update skill status if passed
  const updatedStatuses = { ...state.skillStatuses };
  if (passed) {
    updatedStatuses[skillName] = "Practised";
  } else if (updatedStatuses[skillName] !== "Practised") {
    updatedStatuses[skillName] = "Learning";
  }

  const updatedState = {
    ...state,
    skillStatuses: updatedStatuses,
    assessmentHistory: updatedHistory
  };

  saveStudentState(updatedState);
  return { updatedState, newAttempt };
}

/**
 * Calculates genuine student progress metrics without fake numbers
 */
export function getGenuineProgress() {
  const state = getStudentState();
  const skills = getCurrentFoundationalSkills();
  const tasks = getCurrentRoadmapTasks();

  const totalSkills = skills.length;
  const practisedSkills = skills.filter(s => s.status === "Practised").length;
  const learningSkills = skills.filter(s => s.status === "Learning").length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_completed).length;

  const assessmentAttempts = state.assessmentHistory || [];
  const averageQuizScore = assessmentAttempts.length > 0
    ? Math.round(assessmentAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / assessmentAttempts.length)
    : null;

  const hasActivity = completedTasks > 0 || assessmentAttempts.length > 0 || practisedSkills > 0;

  return {
    totalSkills,
    practisedSkills,
    learningSkills,
    totalTasks,
    completedTasks,
    taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    assessmentAttemptsCount: assessmentAttempts.length,
    averageQuizScore,
    assessmentHistory: assessmentAttempts,
    hasActivity
  };
}

/**
 * Gets diagnostic questions for a skill
 */
export function getQuestionsForSkill(skillName) {
  if (BEGINNER_ASSESSMENT_QUESTIONS[skillName]) {
    return BEGINNER_ASSESSMENT_QUESTIONS[skillName];
  }
  // Generic fallback beginner question
  return [
    {
      id: 901,
      skill_name: skillName,
      question_text: `What is the primary role of ${skillName} in an entry-level workflow?`,
      options: [
        `It provides foundational knowledge and repeatable practice for daily tasks`,
        `It replaces the entire operating system`,
        `It is only used once in production and never again`,
        `It has no relation to the role`
      ],
      correct_option_index: 0,
      explanation: `${skillName} gives students essential technical building blocks to solve routine entry-level problems with confidence.`
    }
  ];
}

/**
 * Resets local demo progress back to initial clean state
 */
export function resetDemoState() {
  cachedState = { ...INITIAL_DEFAULT_STATE };
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedState));
    }
  } catch (e) {}
  notifyListeners();
  return cachedState;
}

/**
 * Returns all canonical skills from the skill taxonomy dataset
 */
export function getAllTaxonomySkills() {
  return [...DEMO_SKILLS];
}

/**
 * Returns synthetic job benchmarks from the dataset
 */
export function getSyntheticJobs(params = {}) {
  let list = [...DEMO_SYNTHETIC_JOBS];
  if (params.role_id) {
    list = list.filter(j => j.role_id === params.role_id);
  }
  if (params.family) {
    list = list.filter(j => j.role_family.toLowerCase() === params.family.toLowerCase());
  }
  return list;
}

/**
 * Progressive Skill Gap Analysis:
 * Combines 3-5 foundational starter skills with the role's synthetic job requirements
 * from data/raw/ datasets, clearly distinguishing required vs preferred skills.
 */
export function getDetailedSkillGapAnalysis() {
  const state = getStudentState();
  const roleId = state.profile?.target_role_id || 'ROLE_DA_01';
  const roleTitle = state.profile?.target_role_title || 'Data Analyst';
  const roleFamily = state.profile?.target_family || 'Data & Analytics';

  // 1. Foundational starter skills (3 to 5 beginner topics)
  const foundationalSkills = getCurrentFoundationalSkills();

  // 2. Synthetic job requirements from dataset
  const job = DEMO_SYNTHETIC_JOBS.find(j => j.role_id === roleId);
  const mappings = job ? DEMO_JOB_SKILLS.filter(m => m.job_id === job.job_id) : [];

  const statuses = state.skillStatuses || {};

  const requiredSkills = mappings
    .filter(m => m.requirement_type === 'required')
    .map(m => ({
      name: m.skill_name,
      importance: m.importance_weight,
      status: statuses[m.skill_name] || 'Not Started'
    }));

  const preferredSkills = mappings
    .filter(m => m.requirement_type === 'preferred')
    .map(m => ({
      name: m.skill_name,
      importance: m.importance_weight,
      status: statuses[m.skill_name] || 'Not Started'
    }));

  const foundationalPractised = foundationalSkills.filter(s => s.status === 'Practised').length;
  const foundationalTotal = foundationalSkills.length;

  return {
    target_role_id: roleId,
    target_role_title: roleTitle,
    target_family: roleFamily,
    foundationalSkills,
    foundationalPractised,
    foundationalTotal,
    foundationalCoverage: foundationalTotal > 0 ? Math.round((foundationalPractised / foundationalTotal) * 100) : 0,
    syntheticJob: job || null,
    requiredSkills,
    preferredSkills,
    disclaimer: "SYNTHETIC DEMO BENCHMARK: Requirements and salary estimates are illustrative examples from the SkillNova Synthetic Dataset Pack v1 for learning calibration only."
  };
}
