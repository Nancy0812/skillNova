/**
 * SkillNova Centralized API Service
 * Coordinates with Django REST Framework when connected, or delegates to unified local dataService in demo mode.
 */

import { DEMO_ROLES, DEMO_RESOURCES, DEMO_PROJECTS } from '../data/demoData.js';
import {
  getStudentState,
  saveStudentState,
  setTargetCareer,
  updateStudentProfile,
  getCurrentFoundationalSkills,
  getCurrentRoadmapTasks,
  toggleRoadmapTask,
  recordAssessmentAttempt,
  getGenuineProgress,
  getQuestionsForSkill,
  resetDemoState,
  getDetailedSkillGapAnalysis,
  getAllTaxonomySkills,
  getSyntheticJobs
} from './dataService.js';

const API_BASE = 'http://127.0.0.1:8000/api';
const TOKEN_KEY = 'skillnova_auth_token';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Check if Django backend is alive
export async function checkBackendConnection() {
  try {
    const res = await fetch(`${API_BASE}/roles/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2000)
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.detail || (typeof data === 'object' ? Object.values(data)[0] : 'Request failed');
    throw new Error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
  }

  return data;
}

// ----------------- AUTHENTICATION & PROFILE -----------------

export async function loginUser(emailOrUsername, password) {
  try {
    return await request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email: emailOrUsername, password })
    });
  } catch (err) {
    // If backend is unavailable, allow smooth demo access
    const state = getStudentState();
    return {
      token: 'demo-session-token',
      user: {
        username: emailOrUsername || state.profile.first_name,
        first_name: state.profile.first_name,
        email: state.profile.email,
        profile: state.profile
      },
      message: 'Logged in (Demo Mode)'
    };
  }
}

export async function registerUser(userData) {
  try {
    return await request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  } catch (err) {
    // Local demo signup fallback
    updateStudentProfile({
      first_name: userData.first_name,
      email: userData.email
    });
    const state = getStudentState();
    return {
      token: 'demo-session-token',
      user: {
        username: userData.username,
        first_name: userData.first_name,
        email: userData.email,
        profile: state.profile
      },
      message: 'Account created in local demo session.'
    };
  }
}

export async function logoutUser() {
  try {
    await request('/auth/logout/', { method: 'POST' });
  } catch (e) {
  } finally {
    clearAuthToken();
  }
}

export async function getProfile() {
  try {
    return await request('/profile/');
  } catch (err) {
    return getStudentState().profile;
  }
}

export async function updateProfile(profileData) {
  try {
    return await request('/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  } catch (err) {
    updateStudentProfile(profileData);
    if (profileData.target_role_id) {
      setTargetCareer(profileData.target_role_id, profileData.target_role_title, profileData.target_family);
    }
    return getStudentState().profile;
  }
}

// ----------------- ROLES & FOUNDATIONAL SKILLS -----------------

export async function getRoles(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    return await request(`/roles/${query ? '?' + query : ''}`);
  } catch (err) {
    let list = [...DEMO_ROLES];
    if (params.family && params.family !== "All Families") {
      list = list.filter(r => r.family.toLowerCase() === params.family.toLowerCase());
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s));
    }
    return list;
  }
}

export async function getRoleById(roleId) {
  try {
    return await request(`/roles/${roleId}/`);
  } catch (err) {
    const role = DEMO_ROLES.find(r => r.role_id === roleId);
    if (!role) throw new Error("Role not found");
    return role;
  }
}

// ----------------- ASSESSMENTS -----------------

export async function getAssessmentQuestions(skillName) {
  try {
    const query = skillName ? `?skill=${encodeURIComponent(skillName)}` : '';
    return await request(`/assessments/questions/${query}`);
  } catch (err) {
    return getQuestionsForSkill(skillName);
  }
}

export async function submitAssessmentAnswers(payload) {
  const skillName = payload.skill_name || 'Foundational Topic';
  const answers = payload.answers || [];
  const questions = getQuestionsForSkill(skillName);

  let correct = 0;
  const detailed = answers.map(a => {
    const q = questions.find(item => item.id === a.question_id);
    const isCorrect = q ? q.correct_option_index === a.selected_index : false;
    if (isCorrect) correct++;
    return {
      question_id: a.question_id,
      question_text: q ? q.question_text : '',
      selected_index: a.selected_index,
      correct_index: q ? q.correct_option_index : 0,
      is_correct: isCorrect,
      explanation: q ? q.explanation : 'Good effort! Continue practicing to reinforce this concept.',
      options: q ? q.options : []
    };
  });

  const total = answers.length || 1;
  const score = Math.round((correct / total) * 100);

  try {
    return await request('/assessments/submit/', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Record into unified local state
    const { newAttempt } = recordAssessmentAttempt(skillName, score, correct, total, detailed);
    return {
      attempt_id: newAttempt.id,
      skill_name: skillName,
      score,
      total_questions: total,
      correct_count: correct,
      passed: score >= 60,
      results: detailed,
      notice: 'Demo diagnostic quiz designed to calibrate learning, not a professional certification.'
    };
  }
}

// ----------------- SKILL GAP ANALYSIS -----------------

export async function calculateSkillGaps() {
  try {
    return await request('/matching/gap-analysis/');
  } catch (err) {
    return getDetailedSkillGapAnalysis();
  }
}

export async function getSkills(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    return await request(`/skills/${query ? '?' + query : ''}`);
  } catch (err) {
    let list = getAllTaxonomySkills();
    if (params.category) {
      list = list.filter(s => s.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return list;
  }
}

export async function getJobs(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    return await request(`/jobs/${query ? '?' + query : ''}`);
  } catch (err) {
    return getSyntheticJobs(params);
  }
}

// ----------------- ROADMAPS -----------------

export async function getCurrentRoadmap() {
  const state = getStudentState();
  const tasks = getCurrentRoadmapTasks();
  const completed = tasks.filter(t => t.is_completed).length;

  return {
    id: 1,
    target_role_id: state.profile.target_role_id,
    target_role_title: state.profile.target_role_title,
    tasks,
    completed_tasks_count: completed,
    total_tasks_count: tasks.length,
    progress_percentage: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
  };
}

export async function toggleTask(taskId) {
  try {
    return await request(`/roadmaps/tasks/${taskId}/toggle/`, { method: 'POST' });
  } catch (err) {
    toggleRoadmapTask(taskId);
    return getCurrentRoadmap();
  }
}

// ----------------- RESOURCES & PROJECTS -----------------

export async function getResources(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    return await request(`/resources/${query ? '?' + query : ''}`);
  } catch (err) {
    let list = [...DEMO_RESOURCES];
    if (params.skill) {
      list = list.filter(r => r.skill_name.toLowerCase().includes(params.skill.toLowerCase()));
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(s) || r.skill_name.toLowerCase().includes(s));
    }
    return list;
  }
}

export async function getProjects(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    return await request(`/projects/${query ? '?' + query : ''}`);
  } catch (err) {
    const state = getStudentState();
    const family = state.profile?.target_family;
    let list = [...DEMO_PROJECTS];
    if (family) {
      const matched = list.filter(p => p.target_role_family.toLowerCase() === family.toLowerCase());
      if (matched.length > 0) return matched;
    }
    return list;
  }
}

// ----------------- PROGRESS TELEMETRY -----------------

export async function getProgressSummary() {
  try {
    return await request('/progress/');
  } catch (err) {
    return getGenuineProgress();
  }
}
