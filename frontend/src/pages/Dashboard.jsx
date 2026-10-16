import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import LoadingState from '../components/common/LoadingState';
import {
  getCurrentFoundationalSkills,
  getCurrentRoadmapTasks,
  getGenuineProgress,
  getStudentState,
  subscribeToStateChanges
} from '../services/dataService';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  CheckSquare,
  Compass,
  Clock,
  Target,
  ExternalLink
} from 'lucide-react';

export default function Dashboard() {
  const [state, setState] = useState(getStudentState());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Subscribe to centralized state changes
    const unsubscribe = subscribeToStateChanges((updatedState) => {
      setState({ ...updatedState });
    });
    return unsubscribe;
  }, []);

  const profile = state.profile || {};
  const targetRole = profile.target_role_title || 'Data Analyst';
  const foundationalSkills = getCurrentFoundationalSkills();
  const tasks = getCurrentRoadmapTasks();
  const progress = getGenuineProgress();

  // Find next uncompleted task or first skill that is not Practised
  const nextSkillToLearn = foundationalSkills.find(s => s.status !== 'Practised') || foundationalSkills[0];
  const nextTask = tasks.find(t => !t.is_completed) || tasks[0];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* 1. Welcoming Heading & Target Career */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Career Readiness Dashboard
          </span>
          <Badge variant="primary">{targetRole}</Badge>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
          Welcome back, {profile.first_name || 'Student'}!
        </h1>

        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
          Learn at your pace. Build confidence one foundational skill at a time.
        </p>
      </div>

      {/* 2. One Clear Recommended Next Step */}
      {nextSkillToLearn && (
        <Card style={{
          backgroundColor: '#F5F0FF',
          borderColor: '#EAE5F2',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            <Sparkles size={16} /> Recommended Next Step
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            <div style={{ maxWidth: '620px' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: 'var(--space-2)' }}>
                {nextSkillToLearn.name}
              </h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
                {nextSkillToLearn.whyItMatters}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                <span>Curated task: <strong>{nextTask?.title || nextSkillToLearn.taskTitle}</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Link to="/roadmap">
                <Button variant="primary" size="md" icon={BookOpen}>
                  Start Learning
                </Button>
              </Link>
              <Link to="/assessment">
                <Button variant="secondary" size="md" icon={CheckSquare}>
                  Take Quick Quiz
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Grid: 3. "Your Learning" Progress Card & 5. Weekly Learning Goal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
      }}>
        {/* 3. Small "Your Learning" Progress Card */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
              Your Learning Progress
            </h3>
            <Link to="/progress" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
              View Details →
            </Link>
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            {progress.completedTasks > 0
              ? `${progress.completedTasks} of ${progress.totalTasks} foundational tasks completed.`
              : 'Begin your roadmap to start marking off completed tasks.'
            }
          </p>

          <ProgressBar
            value={progress.completedTasks}
            max={progress.totalTasks || 1}
            height={8}
            showLabel={true}
            label="Foundational Completion"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xs)' }}>
            <span>Skills Practised: <strong>{progress.practisedSkills} / {progress.totalSkills}</strong></span>
            <span>Quizzes Taken: <strong>{progress.assessmentAttemptsCount}</strong></span>
          </div>
        </Card>

        {/* 5. Simple Weekly Learning Goal */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={16} color="var(--color-primary)" />
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>Weekly Learning Goal</h3>
            </div>
            <Link to="/settings" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
              Edit Goal →
            </Link>
          </div>

          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-primary)', margin: 'var(--space-2) 0' }}>
            {profile.study_hours_per_week || 8} hours / week
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
            Focus: <strong>{profile.weekly_goal || `Build confidence in ${nextSkillToLearn?.name || 'core fundamentals'}`}</strong>
          </p>

          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            A gentle 1 to 2 hours every couple of days builds lasting technical confidence.
          </div>
        </Card>
      </div>

      {/* 4. Short List of Foundational Skills (3 to 5 skills) */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-text-main)' }}>
              Foundational Skills for {targetRole}
            </h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Master these essential starter concepts first before moving to advanced topics.
            </p>
          </div>
          <Link to="/skill-gaps">
            <Button variant="outline" size="sm">
              Full Gap Breakdown →
            </Button>
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {foundationalSkills.map((skill) => {
            const isPractised = skill.status === 'Practised';
            const isLearning = skill.status === 'Learning';

            return (
              <Card
                key={skill.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: 'var(--color-white)',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {skill.name}
                    </h3>

                    {/* Friendly non-intimidating badges */}
                    {isPractised ? (
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #A7F3D0'
                      }}>
                        ✓ Practised
                      </span>
                    ) : isLearning ? (
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: '#F5F0FF',
                        color: '#7548D8',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #DDD6FE'
                      }}>
                        ● Learning
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#FAFAFD',
                        color: '#716B80',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--color-border)'
                      }}>
                        ○ Not Started
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {skill.whyItMatters}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <a href={skill.freeResourceUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" icon={ExternalLink}>
                      Read Guide
                    </Button>
                  </a>
                  <Link to="/assessment">
                    <Button variant={isPractised ? "secondary" : "primary"} size="sm">
                      {isPractised ? "Re-Quiz" : "Quick Quiz"}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 6. Link to Explore More Careers and Skills */}
      <Card style={{
        backgroundColor: '#FAFAFD',
        border: '1px dashed var(--color-border)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)'
      }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '2px' }}>
            Looking for a different direction?
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Switch roles anytime to explore foundational skills across Web, Backend, Data, AI, Cloud, and Security tracks.
          </p>
        </div>

        <Link to="/careers">
          <Button variant="secondary" size="md" icon={Compass}>
            Explore 16 Career Tracks <ArrowRight size={14} />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
