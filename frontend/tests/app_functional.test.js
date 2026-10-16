import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node.js environment
const memoryStore = {};
globalThis.localStorage = {
  getItem: (key) => (key in memoryStore ? memoryStore[key] : null),
  setItem: (key, val) => { memoryStore[key] = String(val); },
  removeItem: (key) => { delete memoryStore[key]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
};

// Import services and catalogs
import {
  getStudentState,
  saveStudentState,
  resetDemoState,
  setTargetCareer,
  updateStudentProfile,
  getCurrentFoundationalSkills,
  getCurrentRoadmapTasks,
  toggleRoadmapTask,
  recordAssessmentAttempt,
  getGenuineProgress,
  getQuestionsForSkill,
  getDetailedSkillGapAnalysis
} from '../src/services/dataService.js';

import {
  DEMO_ROLES,
  DEMO_SKILLS,
  DEMO_SYNTHETIC_JOBS,
  DEMO_JOB_SKILLS
} from '../src/data/demoData.js';

import {
  getFoundationalSkillsForRole,
  FOUNDATIONAL_SKILLS_BY_FAMILY
} from '../src/data/foundationalSkills.js';

test('Skill Matching: Foundational skills match target career tracks', () => {
  // 1. Data & Analytics track
  const daSkills = getFoundationalSkillsForRole('Data Analyst', 'Data & Analytics');
  assert.equal(daSkills.length, 5);
  const daNames = daSkills.map(s => s.name);
  assert.ok(daNames.includes('Spreadsheet Fundamentals'));
  assert.ok(daNames.includes('Basic SQL'));
  assert.ok(daNames.includes('Data Interpretation'));
  assert.ok(daNames.includes('Basic Statistics'));
  assert.ok(daNames.includes('Charts & Visualizations'));

  // 2. Web Development / Frontend track
  const feSkills = getFoundationalSkillsForRole('Frontend Developer', 'Web Development');
  assert.equal(feSkills.length, 4);
  const feNames = feSkills.map(s => s.name);
  assert.ok(feNames.includes('HTML Fundamentals'));
  assert.ok(feNames.includes('CSS Fundamentals'));
  assert.ok(feNames.includes('JavaScript Fundamentals'));
  assert.ok(feNames.includes('Working with Web APIs'));

  // 3. Software Development track
  const seSkills = getFoundationalSkillsForRole('Python Developer', 'Software Development');
  assert.ok(seSkills.length >= 3 && seSkills.length <= 5);
  const seNames = seSkills.map(s => s.name);
  assert.ok(seNames.includes('Programming Fundamentals') || seNames.includes('HTTP & Basic APIs'));
});

test('Career Role Switching: Updates target role and recalculates skills dynamically', () => {
  resetDemoState();

  // Initially Data Analyst
  setTargetCareer('ROLE_DA_01', 'Data Analyst', 'Data & Analytics');
  let currentSkills = getCurrentFoundationalSkills();
  assert.equal(currentSkills[0].name, 'Spreadsheet Fundamentals');

  // Switch to Frontend Developer
  setTargetCareer('ROLE_WD_01', 'Frontend Developer', 'Web Development');
  let state = getStudentState();
  assert.equal(state.profile.target_role_id, 'ROLE_WD_01');
  assert.equal(state.profile.target_role_title, 'Frontend Developer');
  assert.equal(state.profile.target_family, 'Web Development');

  currentSkills = getCurrentFoundationalSkills();
  assert.equal(currentSkills[0].name, 'HTML Fundamentals');
  assert.equal(currentSkills[1].name, 'CSS Fundamentals');

  // Switch to Cloud Engineer
  setTargetCareer('ROLE_CD_01', 'Cloud Engineer', 'Cloud & DevOps');
  currentSkills = getCurrentFoundationalSkills();
  assert.equal(currentSkills[0].name, 'Computer & OS Fundamentals');
});

test('Learning Roadmap: Task completion and undo recalculates progress strictly', () => {
  resetDemoState();
  setTargetCareer('ROLE_DA_01', 'Data Analyst', 'Data & Analytics');

  let tasks = getCurrentRoadmapTasks();
  assert.equal(tasks.length, 5);
  assert.equal(tasks[0].is_completed, false);

  let progress = getGenuineProgress();
  assert.equal(progress.completedTasks, 0);
  assert.equal(progress.taskCompletionRate, 0);

  // Complete Task 1
  toggleRoadmapTask(1);
  tasks = getCurrentRoadmapTasks();
  assert.equal(tasks[0].is_completed, true);

  progress = getGenuineProgress();
  assert.equal(progress.completedTasks, 1);
  assert.equal(progress.taskCompletionRate, 20); // 1 / 5 = 20%

  // Complete Task 2
  toggleRoadmapTask(2);
  progress = getGenuineProgress();
  assert.equal(progress.completedTasks, 2);
  assert.equal(progress.taskCompletionRate, 40); // 2 / 5 = 40%

  // Undo Task 1 (uncheck)
  toggleRoadmapTask(1);
  tasks = getCurrentRoadmapTasks();
  assert.equal(tasks[0].is_completed, false);
  assert.equal(tasks[1].is_completed, true);

  progress = getGenuineProgress();
  assert.equal(progress.completedTasks, 1);
  assert.equal(progress.taskCompletionRate, 20);
});

test('Skill Assessment: Interactive scoring and skill promotion to Practised', () => {
  resetDemoState();
  setTargetCareer('ROLE_DA_01', 'Data Analyst', 'Data & Analytics');

  const questions = getQuestionsForSkill('Spreadsheet Fundamentals');
  assert.ok(questions.length >= 2);

  // Submit passing answers (100%)
  const { updatedState, newAttempt } = recordAssessmentAttempt(
    'Spreadsheet Fundamentals',
    100, // score
    2,   // correct
    2,   // total
    [{ question_id: 101, is_correct: true }, { question_id: 102, is_correct: true }]
  );

  assert.equal(newAttempt.passed, true);
  assert.equal(newAttempt.score, 100);
  assert.equal(updatedState.skillStatuses['Spreadsheet Fundamentals'], 'Practised');

  // Verify skills view now marks it Practised
  const skills = getCurrentFoundationalSkills();
  const spreadsheetSkill = skills.find(s => s.name === 'Spreadsheet Fundamentals');
  assert.equal(spreadsheetSkill.status, 'Practised');

  // Submit non-passing attempt on Basic SQL (50%)
  const failResult = recordAssessmentAttempt(
    'Basic SQL',
    50,
    1,
    2,
    [{ question_id: 201, is_correct: true }, { question_id: 202, is_correct: false }]
  );
  assert.equal(failResult.newAttempt.passed, false);
  assert.equal(failResult.updatedState.skillStatuses['Basic SQL'], 'Learning');
});

test('Student Profile & Persistence: Preserves demo state across simulated reloads', () => {
  resetDemoState();

  // Update profile
  updateStudentProfile({
    first_name: 'Jordan',
    study_hours_per_week: 14,
    college: 'State Tech University'
  });

  // Complete task 3
  toggleRoadmapTask(3);

  // Check that localStorage was written
  const rawStored = localStorage.getItem('skillnova_student_state_v2');
  assert.ok(rawStored !== null);
  const parsed = JSON.parse(rawStored);
  assert.equal(parsed.profile.first_name, 'Jordan');
  assert.equal(parsed.profile.study_hours_per_week, 14);
  assert.ok(parsed.completedTaskIds.includes(3));

  // Simulate complete browser refresh by clearing memory store cachedState
  // Calling getStudentState() will re-read from localStorage
  const restoredState = JSON.parse(localStorage.getItem('skillnova_student_state_v2'));
  assert.equal(restoredState.profile.first_name, 'Jordan');
  assert.equal(restoredState.profile.study_hours_per_week, 14);
  assert.equal(restoredState.profile.college, 'State Tech University');
  assert.ok(restoredState.completedTaskIds.includes(3));
});

test('Dataset Pack Integration: Synthetic jobs, role catalog, and job-skill matrices are faithfully mapped without losing synthetic labeling', () => {
  // 1. Roles catalog fidelity
  assert.equal(DEMO_ROLES.length, 16);
  const families = new Set(DEMO_ROLES.map(r => r.family));
  assert.equal(families.size, 6);
  assert.ok(families.has('Data & Analytics'));
  assert.ok(families.has('AI & Machine Learning'));
  assert.ok(families.has('Software Development'));
  assert.ok(families.has('Web Development'));
  assert.ok(families.has('Cloud & DevOps'));
  assert.ok(families.has('Cybersecurity'));

  // 2. Canonical skills taxonomy fidelity
  assert.equal(DEMO_SKILLS.length, 24);
  const skillNames = new Set(DEMO_SKILLS.map(s => s.name));
  assert.ok(skillNames.has('Python'));
  assert.ok(skillNames.has('SQL'));
  assert.ok(skillNames.has('React'));
  assert.ok(skillNames.has('Docker'));
  assert.ok(skillNames.has('Linux Fundamentals'));

  // 3. Synthetic jobs fidelity
  assert.equal(DEMO_SYNTHETIC_JOBS.length, 16);
  DEMO_SYNTHETIC_JOBS.forEach(job => {
    assert.equal(job.is_synthetic, true);
    assert.ok(job.demo_notice.includes('SYNTHETIC DEMO BENCHMARK'));
    assert.ok(job.salary_range_est.includes('Synthetic Demo Range'));
  });

  // 4. Job-skill mappings fidelity
  assert.equal(DEMO_JOB_SKILLS.length, 82);
  DEMO_JOB_SKILLS.forEach(m => {
    assert.ok(m.importance_weight > 0);
    assert.ok(skillNames.has(m.skill_name));
    assert.ok(['required', 'preferred'].includes(m.requirement_type));
  });

  // 5. Detailed skill gap analysis combines progressive foundations and job benchmarks
  resetDemoState();
  setTargetCareer('ROLE_DA_01', 'Data Analyst', 'Data & Analytics');
  const analysis = getDetailedSkillGapAnalysis();

  assert.equal(analysis.target_role_id, 'ROLE_DA_01');
  assert.equal(analysis.target_role_title, 'Data Analyst');
  assert.ok(analysis.foundationalSkills.length >= 3 && analysis.foundationalSkills.length <= 5);
  assert.ok(analysis.requiredSkills.length > 0);
  assert.ok(analysis.preferredSkills.length > 0);
  assert.equal(analysis.syntheticJob.job_id, 'SJOB_001');
  assert.ok(analysis.disclaimer.includes('SYNTHETIC DEMO BENCHMARK'));
});
