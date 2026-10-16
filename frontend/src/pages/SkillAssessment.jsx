import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import LoadingState from '../components/common/LoadingState';
import { submitAssessmentAnswers } from '../services/api';
import {
  getCurrentFoundationalSkills,
  getQuestionsForSkill,
  recordAssessmentAttempt,
  getStudentState
} from '../services/dataService';
import {
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function SkillAssessment() {
  const state = getStudentState();
  const foundationalSkills = getCurrentFoundationalSkills();

  // Default to first foundational skill for current role
  const [selectedSkill, setSelectedSkill] = useState(() => foundationalSkills[0]?.name || "Spreadsheet Fundamentals");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedIndex }
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  // Sync skill list if role changes
  useEffect(() => {
    if (!foundationalSkills.some(s => s.name === selectedSkill)) {
      if (foundationalSkills[0]) {
        setSelectedSkill(foundationalSkills[0].name);
      }
    }
  }, [state.profile.target_role_id]);

  useEffect(() => {
    setLoading(true);
    setResults(null);
    setAnswers({});
    setCurrentIndex(0);

    const qList = getQuestionsForSkill(selectedSkill);
    setQuestions(qList || []);
    setLoading(false);
  }, [selectedSkill]);

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionIndex) => {
    if (!currentQ) return;
    setAnswers({
      ...answers,
      [currentQ.id]: optionIndex
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payloadAnswers = Object.entries(answers).map(([qId, sIdx]) => ({
        question_id: parseInt(qId),
        selected_index: sIdx
      }));

      const res = await submitAssessmentAnswers({
        skill_name: selectedSkill,
        answers: payloadAnswers
      });

      setResults(res);
    } catch (err) {
      console.error("Submit quiz error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setResults(null);
    setAnswers({});
    setCurrentIndex(0);
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <PageHeader
        title="Foundational Skill Quiz"
        subtitle={`Practice short diagnostic quizzes for your ${state.profile.target_role_title} path.`}
        badge={<Badge variant="primary">{state.profile.target_role_title}</Badge>}
      />

      {/* Skill Selector Tabs based on Target Role */}
      {!results && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Choose a foundational topic to practice:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {foundationalSkills.map(skill => {
              const isSelected = selectedSkill === skill.name;
              const isPractised = skill.status === 'Practised';

              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.name)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-light-lavender)' : 'var(--color-white)',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {isPractised && <span style={{ color: '#065F46' }}>✓</span>}
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <LoadingState message={`Loading beginner questions for ${selectedSkill}...`} />
      ) : results ? (
        /* Results View (Supportive, No Harsh Red Warning Colors!) */
        <div>
          <Card style={{ padding: 'var(--space-8)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: results.passed ? '#ECFDF5' : '#F5F0FF',
              color: results.passed ? '#065F46' : 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)'
            }}>
              {results.passed ? <CheckCircle size={32} /> : <Sparkles size={30} />}
            </div>

            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              {results.passed ? 'Great job! Concept Practised' : 'Good Effort! Keep Building Confidence'}
            </h2>

            <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, color: 'var(--color-primary)', margin: 'var(--space-2) 0' }}>
              {results.score}%
            </div>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto var(--space-4)', lineHeight: 1.6 }}>
              You answered <strong>{results.correct_count}</strong> of <strong>{results.total_questions}</strong> questions correctly for <strong>{selectedSkill}</strong>.
              {results.passed
                ? ' This skill is now recorded as "Practised" in your learning profile.'
                : ' Review the quick concept notes below and try again anytime.'}
            </p>

            <div style={{
              padding: '10px 14px',
              backgroundColor: '#FAFAFD',
              borderRadius: '8px',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              maxWidth: '520px',
              margin: '0 auto var(--space-6)',
              lineHeight: 1.5,
              border: '1px solid var(--color-border)'
            }}>
              <strong>Friendly note:</strong> This quiz is designed to build foundational confidence. It is a self-assessment tool, not a formal certification exam.
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button variant="outline" onClick={handleRetake} icon={RotateCcw}>
                Retake Quiz
              </Button>
              <Link to="/dashboard">
                <Button variant="primary" icon={ArrowRight}>
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </Card>

          {/* Friendly Concept Explanations */}
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
            Concept Review & Notes
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {(results.results || []).map((r, i) => (
              <Card key={i} style={{ borderLeft: `4px solid ${r.is_correct ? '#10B981' : '#A78BFA'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: r.is_correct ? '#065F46' : 'var(--color-primary)' }}>
                    {r.is_correct ? '✓ Correct understanding' : 'ℹ Concept Review'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>• Question {i + 1}</span>
                </div>

                <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '8px' }}>
                  {r.question_text}
                </div>

                <div style={{
                  padding: '10px 12px',
                  backgroundColor: '#FAFAFD',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  lineHeight: 1.5
                }}>
                  <strong>Why this matters:</strong> {r.explanation}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : questions.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p>No questions found for {selectedSkill}. Choose another topic above.</p>
        </Card>
      ) : (
        /* Active Quiz View: One Question at a Time */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
              Topic: {selectedSkill}
            </span>
          </div>

          <ProgressBar value={currentIndex + 1} max={questions.length} height={6} style={{ marginBottom: 'var(--space-6)' }} />

          <Card style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: 'var(--space-6)' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                {currentIndex + 1}
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, lineHeight: 1.4 }}>
                {currentQ.question_text}
              </h3>
            </div>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 'var(--space-8)' }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? 'var(--color-light-lavender)' : 'var(--color-white)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: 'var(--font-size-sm)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                icon={ArrowLeft}
              >
                Previous
              </Button>

              {isLast ? (
                <Button
                  variant="primary"
                  loading={submitting}
                  disabled={answers[currentQ.id] === undefined}
                  onClick={handleSubmit}
                  icon={CheckCircle}
                >
                  Complete Quiz
                </Button>
              ) : (
                <Button
                  variant="primary"
                  disabled={answers[currentQ.id] === undefined}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  Next Question <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
