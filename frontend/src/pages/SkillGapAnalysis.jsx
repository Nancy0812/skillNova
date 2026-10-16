import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import {
  getCurrentFoundationalSkills,
  getDetailedSkillGapAnalysis,
  getStudentState,
  subscribeToStateChanges
} from '../services/dataService';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Info,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

export default function SkillGapAnalysis() {
  const [state, setState] = useState(getStudentState());

  useEffect(() => {
    const unsubscribe = subscribeToStateChanges((updated) => setState({ ...updated }));
    return unsubscribe;
  }, []);

  const [showFullDatasetProfile, setShowFullDatasetProfile] = useState(false);
  const targetRole = state.profile?.target_role_title || 'Data Analyst';
  const skills = getCurrentFoundationalSkills();
  const detailed = getDetailedSkillGapAnalysis();

  const practisedCount = skills.filter(s => s.status === 'Practised').length;
  const learningCount = skills.filter(s => s.status === 'Learning').length;
  const totalCount = skills.length;
  const coveragePercent = totalCount > 0 ? Math.round((practisedCount / totalCount) * 100) : 0;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <PageHeader
        title="Foundational Skill Coverage"
        subtitle={`See how your current understanding aligns with essential entry-level skills for ${targetRole}.`}
        badge={<Badge variant="primary">{targetRole}</Badge>}
        action={
          <Link to="/roadmap">
            <Button variant="primary" size="sm" icon={ArrowRight}>
              Open Learning Roadmap
            </Button>
          </Link>
        }
      />

      {/* Educational Notice Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        backgroundColor: '#F5F0FF',
        border: '1px solid #EAE5F2',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-dark-purple)',
        fontSize: 'var(--font-size-xs)',
        marginBottom: 'var(--space-6)',
        lineHeight: 1.5
      }}>
        <Info size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Learning Benchmark Notice:</strong> This analysis measures foundational skill familiarity for entry-level preparation. It is an educational roadmap, not a prediction of hiring probability.
        </span>
      </div>

      {/* Summary Card */}
      <Card style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
              Foundational Progress Summary
            </h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {practisedCount > 0
                ? `You have demonstrated ${practisedCount} of ${totalCount} essential skills for ${targetRole}.`
                : `Ready to start? Pick any foundational skill below to review official documentation or take a quick quiz.`
              }
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
              {coveragePercent}%
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Foundational Coverage</div>
          </div>
        </div>

        <ProgressBar value={practisedCount} max={totalCount || 1} height={8} />

        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xs)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            Practised: <strong>{practisedCount}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            Learning: <strong>{learningCount}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#958EA6' }} />
            Not Started: <strong>{totalCount - practisedCount - learningCount}</strong>
          </span>
        </div>
      </Card>

      {/* Progressive Foundational Skills List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {skills.map((skill) => {
          const isPractised = skill.status === 'Practised';
          const isLearning = skill.status === 'Learning';

          return (
            <Card key={skill.id} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
                    {skill.name}
                  </h3>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>

                {isPractised ? (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    padding: '3px 10px',
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
                    padding: '3px 10px',
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
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)'
                  }}>
                    ○ Not Started
                  </span>
                )}
              </div>

              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                <strong>Why this skill matters:</strong> {skill.whyItMatters}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 'var(--space-3)',
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'var(--space-3)'
              }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Recommended starter task: <em>{skill.taskTitle}</em>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={skill.freeResourceUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" icon={ExternalLink}>
                      Free Guide
                    </Button>
                  </a>
                  <Link to="/assessment">
                    <Button variant={isPractised ? "secondary" : "primary"} size="sm">
                      {isPractised ? "Re-Test" : "Take Quiz"}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progressive Disclosure: Dataset Synthetic Job Requirements */}
      <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
        <button
          type="button"
          onClick={() => setShowFullDatasetProfile(!showFullDatasetProfile)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Briefcase size={20} color="var(--color-primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)' }}>
                Explore Synthetic Role Requirements (Dataset Benchmark)
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                View full entry-level requirements, preferred skills, and illustrative salary benchmarks from the SkillNova dataset pack.
              </div>
            </div>
          </div>
          {showFullDatasetProfile ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showFullDatasetProfile && detailed.syntheticJob && (
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Card style={{ backgroundColor: '#FAF8FE', border: '1px solid #DDD6FE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <Badge variant="primary">Synthetic Dataset Benchmark</Badge>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, marginTop: '6px' }}>
                    {detailed.syntheticJob.title} — {detailed.syntheticJob.company}
                  </h4>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                    Location: {detailed.syntheticJob.location} | Illustrative Comp: {detailed.syntheticJob.salary_range_est}
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: '#6B7280',
                backgroundColor: '#F3F4F6',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '16px',
                borderLeft: '3px solid var(--color-primary)'
              }}>
                <strong>Dataset Notice:</strong> {detailed.disclaimer}
              </div>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                {detailed.syntheticJob.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <h5 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    Required Skills (from Job-Skill Matrix)
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {detailed.requiredSkills.map(s => (
                      <div
                        key={s.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-white)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--font-size-xs)'
                        }}
                      >
                        <div>
                          <strong>{s.name}</strong>
                          <span style={{ marginLeft: '6px', color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                            (Weight: {s.importance})
                          </span>
                        </div>
                        <Badge variant={s.status === 'Practised' ? 'success' : s.status === 'Learning' ? 'primary' : 'neutral'}>
                          {s.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Preferred Skills (Optional / Value-Add)
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {detailed.preferredSkills.length > 0 ? detailed.preferredSkills.map(s => (
                      <div
                        key={s.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-white)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--font-size-xs)'
                        }}
                      >
                        <div>
                          <span>{s.name}</span>
                          <span style={{ marginLeft: '6px', color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                            (Weight: {s.importance})
                          </span>
                        </div>
                        <Badge variant={s.status === 'Practised' ? 'success' : s.status === 'Learning' ? 'primary' : 'neutral'}>
                          {s.status}
                        </Badge>
                      </div>
                    )) : (
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', padding: '8px 0' }}>
                        No additional preferred skills specified.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
