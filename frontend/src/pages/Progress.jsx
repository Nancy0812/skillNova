import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import EmptyState from '../components/common/EmptyState';
import {
  getGenuineProgress,
  getStudentState,
  subscribeToStateChanges
} from '../services/dataService';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  CheckSquare,
  ArrowRight,
  Compass,
  Award
} from 'lucide-react';

export default function Progress() {
  const [state, setState] = useState(getStudentState());
  const [progress, setProgress] = useState(getGenuineProgress());

  useEffect(() => {
    const unsubscribe = subscribeToStateChanges((updated) => {
      setState({ ...updated });
      setProgress(getGenuineProgress());
    });
    return unsubscribe;
  }, []);

  const targetRole = state.profile?.target_role_title || 'Data Analyst';
  const hasHistory = progress.hasActivity;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <PageHeader
        title="Your Learning Progress"
        subtitle={`Verifiable track record of foundational tasks and quiz results for ${targetRole}.`}
        badge={<Badge variant="primary">{targetRole}</Badge>}
      />

      {/* Real Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-8)'
      }}>
        <Card>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Tasks Completed
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-primary)', margin: '4px 0' }}>
            {progress.completedTasks} / {progress.totalTasks}
          </div>
          <ProgressBar value={progress.completedTasks} max={progress.totalTasks || 1} height={6} />
        </Card>

        <Card>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Skills Practised
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: '#10B981', margin: '4px 0' }}>
            {progress.practisedSkills} / {progress.totalSkills}
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Foundational concepts
          </span>
        </Card>

        <Card>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Diagnostic Quizzes
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-dark-purple)', margin: '4px 0' }}>
            {progress.assessmentAttemptsCount}
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            {progress.averageQuizScore !== null ? `Average: ${progress.averageQuizScore}%` : 'None taken yet'}
          </span>
        </Card>

        <Card>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Weekly Goal
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-main)', margin: '4px 0' }}>
            {state.profile?.study_hours_per_week || 8}h
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Commitment per week
          </span>
        </Card>
      </div>

      {/* Helpful Empty State when No Activity has taken place */}
      {!hasHistory ? (
        <EmptyState
          icon={BookOpen}
          title="Your learning journey begins here"
          description="You haven't completed any tasks or quizzes yet. Pick a foundational skill to read its guide or test your current understanding!"
          actionText="Start First Roadmap Task"
          onAction={() => window.location.href = '/roadmap'}
        />
      ) : (
        /* Genuine Quiz & Assessment History */
        <div>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
            Recent Quiz Attempts & Self-Evaluations
          </h2>

          {progress.assessmentHistory.length === 0 ? (
            <Card style={{ padding: 'var(--space-6)', textAlign: 'center', backgroundColor: '#FAFAFD' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                No diagnostic quizzes completed yet. Test your knowledge on a foundational topic!
              </p>
              <Link to="/assessment">
                <Button variant="primary" size="sm" icon={CheckSquare}>
                  Take a Quick Quiz
                </Button>
              </Link>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {progress.assessmentHistory.map((item) => (
                <Card
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: item.passed ? '#ECFDF5' : '#F5F0FF',
                      color: item.passed ? '#065F46' : 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      {item.score}%
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                        {item.skill_name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {item.date} • {item.correct_count} of {item.total_questions} questions correct
                      </div>
                    </div>
                  </div>

                  <Badge variant={item.passed ? "success" : "primary"}>
                    {item.passed ? "Practised" : "Learning"}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
