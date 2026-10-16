import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import {
  getCurrentRoadmapTasks,
  toggleRoadmapTask,
  getStudentState,
  subscribeToStateChanges
} from '../services/dataService';
import {
  CheckCircle,
  Circle,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  Target
} from 'lucide-react';

export default function Roadmap() {
  const [state, setState] = useState(getStudentState());
  const [tasks, setTasks] = useState(getCurrentRoadmapTasks());

  useEffect(() => {
    const unsubscribe = subscribeToStateChanges((updated) => {
      setState({ ...updated });
      setTasks(getCurrentRoadmapTasks());
    });
    return unsubscribe;
  }, []);

  const targetRole = state.profile?.target_role_title || 'Data Analyst';
  const completedCount = tasks.filter(t => t.is_completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (taskId) => {
    toggleRoadmapTask(taskId);
  };

  // Identify next uncompleted task
  const nextTask = tasks.find(t => !t.is_completed);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <PageHeader
        title="Beginner Learning Roadmap"
        subtitle={`A manageable, step-by-step checklist to build confidence in ${targetRole}.`}
        badge={<Badge variant="primary">{targetRole}</Badge>}
      />

      {/* Progress & Next Step Card */}
      <Card style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
              Roadmap Progress
            </h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {completedCount === 0
                ? 'Check off tasks as you finish reading guides or practicing exercises.'
                : `${completedCount} of ${totalCount} beginner tasks completed.`}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
              {progressPercent}%
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tasks Done</div>
          </div>
        </div>

        <ProgressBar value={completedCount} max={totalCount || 1} height={8} />

        {/* Friendly Next Step Callout */}
        {nextTask ? (
          <div style={{
            marginTop: 'var(--space-4)',
            padding: '12px 14px',
            backgroundColor: '#F5F0FF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #EAE5F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--color-primary)" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-dark-purple)' }}>
                <strong>Recommended Next:</strong> {nextTask.title} ({nextTask.skill_name})
              </span>
            </div>
            {nextTask.resource_url && (
              <a href={nextTask.resource_url} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={ExternalLink}>
                  Open Guide
                </Button>
              </a>
            )}
          </div>
        ) : (
          <div style={{
            marginTop: 'var(--space-4)',
            padding: '12px 14px',
            backgroundColor: '#ECFDF5',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600
          }}>
            🎉 Excellent work! You have completed all foundational tasks for {targetRole}.
          </div>
        )}
      </Card>

      {/* Task Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {tasks.map((task) => {
          const isDone = task.is_completed;

          return (
            <Card
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px 20px',
                backgroundColor: isDone ? '#FAFAFD' : 'var(--color-white)',
                border: isDone ? '1px solid #E5E7EB' : '1px solid var(--color-border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <button
                type="button"
                onClick={() => handleToggle(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDone ? '#10B981' : '#D1D5DB',
                  padding: 0,
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={isDone ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
              >
                {isDone ? <CheckCircle size={24} /> : <Circle size={24} />}
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontWeight: 700,
                    fontSize: 'var(--font-size-base)',
                    textDecoration: isDone ? 'line-through' : 'none',
                    color: isDone ? 'var(--color-text-secondary)' : 'var(--color-text-main)'
                  }}>
                    {task.title}
                  </span>
                  <Badge variant="primary">{task.skill_name}</Badge>
                </div>

                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '8px'
                }}>
                  {task.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                  {task.resource_url && (
                    <a
                      href={task.resource_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600,
                        color: 'var(--color-primary)'
                      }}
                    >
                      <ExternalLink size={12} /> Free Reference Documentation
                    </a>
                  )}

                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    • {task.whyItMatters}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
