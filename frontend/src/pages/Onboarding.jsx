import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { DEMO_ROLES } from '../data/demoData';
import { updateProfile } from '../services/api';
import {
  GraduationCap,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

const COMMON_SKILLS = [
  "HTML/CSS", "JavaScript", "React", "Python", "SQL",
  "Git & GitHub", "Docker", "Linux Fundamentals", "RESTful APIs",
  "Pandas & NumPy", "Data Visualization", "Statistics & Probability"
];

export default function Onboarding({ user, onProfileUpdated }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = useState({
    college: user?.profile?.college || 'National Engineering College',
    education_level: user?.profile?.education_level || 'Undergraduate',
    target_family: user?.profile?.target_family || 'Web Development',
    target_role_id: user?.profile?.target_role_id || 'ROLE_WD_01',
    target_role_title: user?.profile?.target_role_title || 'Frontend Developer',
    existing_skills: user?.profile?.self_reported_skills || ['HTML/CSS', 'JavaScript'],
    study_hours_per_week: user?.profile?.study_hours_per_week || 10,
    learning_style: user?.profile?.learning_style || 'hands-on'
  });

  const [saving, setSaving] = useState(false);

  // Available sub-roles filtered by selected family
  const currentFamilyRoles = DEMO_ROLES.filter(r => r.family === formData.target_family);

  const handleFamilyChange = (fam) => {
    const roles = DEMO_ROLES.filter(r => r.family === fam);
    setFormData({
      ...formData,
      target_family: fam,
      target_role_id: roles[0]?.role_id || '',
      target_role_title: roles[0]?.title || ''
    });
  };

  const toggleSkill = (skill) => {
    const exists = formData.existing_skills.includes(skill);
    const updated = exists
      ? formData.existing_skills.filter(s => s !== skill)
      : [...formData.existing_skills, skill];
    setFormData({ ...formData, existing_skills: updated });
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await updateProfile({
        college: formData.college,
        education_level: formData.education_level,
        target_role_id: formData.target_role_id,
        target_role_title: formData.target_role_title,
        target_family: formData.target_family,
        study_hours_per_week: formData.study_hours_per_week,
        learning_style: formData.learning_style,
        self_reported_skills: formData.existing_skills
      });
    } catch (err) {
      console.warn('Backend profile update note:', err.message);
    } finally {
      setSaving(false);
      onProfileUpdated({
        ...user,
        profile: {
          ...(user?.profile || {}),
          ...formData
        }
      });
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(ellipse at 50% 0%, #F5F0FF 0%, #FFFFFF 80%)',
      padding: 'var(--space-8) var(--space-4)'
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        {/* Header & Step progress */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Logo size="md" showTagline={false} />
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
            Personalize Your Readiness Journey
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Step {step} of {totalSteps}: {
              step === 1 ? 'Education & College' :
              step === 2 ? 'Target Career & Role' :
              step === 3 ? 'Current Skills' :
              step === 4 ? 'Study Availability' : 'Review & Confirm'
            }
          </p>
          <div style={{ maxWidth: '280px', margin: 'var(--space-3) auto 0' }}>
            <ProgressBar value={step} max={totalSteps} height={6} />
          </div>
        </div>

        <Card style={{ padding: 'var(--space-8)' }}>
          {/* STEP 1: Education */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                <GraduationCap size={24} />
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Where are you studying?
                </h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                Tell us about your current university and degree level so we calibrate entry-level benchmarks.
              </p>

              <Input
                label="College or University Name"
                id="onboard-college"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. National Institute of Technology"
                required
              />

              <div className="form-group">
                <label className="form-label" htmlFor="education-level-select">Current Academic Level</label>
                <select
                  id="education-level-select"
                  className="form-input"
                  value={formData.education_level}
                  onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                >
                  <option value="Undergraduate (Year 1-2)">Undergraduate (Year 1-2)</option>
                  <option value="Undergraduate (Pre-final Year)">Undergraduate (Pre-final Year)</option>
                  <option value="Undergraduate (Final Year)">Undergraduate (Final Year)</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Career Family & Role */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                <Compass size={24} />
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Select your target career track
                </h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                Choose the role family and specific entry-level role you want to prepare for.
              </p>

              <div className="form-group">
                <label className="form-label">Role Family</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: 'var(--space-4)' }}>
                  {[
                    "Web Development", "Software Development", "Data & Analytics",
                    "AI & Machine Learning", "Cloud & DevOps", "Cybersecurity"
                  ].map((fam) => (
                    <button
                      key={fam}
                      type="button"
                      onClick={() => handleFamilyChange(fam)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${formData.target_family === fam ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        backgroundColor: formData.target_family === fam ? 'var(--color-light-lavender)' : 'var(--color-white)',
                        color: formData.target_family === fam ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: 600,
                        fontSize: 'var(--font-size-sm)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sub-Role</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentFamilyRoles.map((r) => (
                    <label
                      key={r.role_id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${formData.target_role_id === r.role_id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        backgroundColor: formData.target_role_id === r.role_id ? '#F5F0FF' : 'var(--color-white)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="target_role"
                        checked={formData.target_role_id === r.role_id}
                        onChange={() => setFormData({ ...formData, target_role_id: r.role_id, target_role_title: r.title })}
                        style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{r.title}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          {r.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Current Skills */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={24} />
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  What skills do you already possess?
                </h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                Select technologies you are comfortable with. Don't worry if this list is small — SkillNova will build the roadmap for the rest!
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {COMMON_SKILLS.map((skill) => {
                  const selected = formData.existing_skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: `1.5px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        backgroundColor: selected ? 'var(--color-primary)' : 'var(--color-white)',
                        color: selected ? 'var(--color-white)' : 'var(--color-text-main)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {selected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Study Hours & Preferences */}
          {step === 4 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                <Clock size={24} />
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Study Availability & Preferences
                </h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                How much weekly time can you dedicate towards career preparation alongside academic coursework?
              </p>

              <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" htmlFor="study-hours-slider">Hours per week:</label>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                    {formData.study_hours_per_week} hours/week
                  </span>
                </div>
                <input
                  id="study-hours-slider"
                  type="range"
                  min="4"
                  max="30"
                  step="2"
                  value={formData.study_hours_per_week}
                  onChange={(e) => setFormData({ ...formData, study_hours_per_week: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  <span>4 hrs (Light)</span>
                  <span>10-15 hrs (Recommended)</span>
                  <span>30 hrs (Intensive)</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="learning-style-select">Preferred Learning Style</label>
                <select
                  id="learning-style-select"
                  className="form-input"
                  value={formData.learning_style}
                  onChange={(e) => setFormData({ ...formData, learning_style: e.target.value })}
                >
                  <option value="hands-on">Hands-on & Project-Driven (Recommended)</option>
                  <option value="documentation">Documentation & Official Guides</option>
                  <option value="interactive">Interactive Quizzes & Sandbox Tutorials</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review */}
          {step === 5 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                <Sparkles size={24} />
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Review your profile setup
                </h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                Confirm your selections to generate your customized SkillNova roadmap.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#FAFAFD', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>College & Degree</span>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{formData.college} ({formData.education_level})</div>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Target Role Benchmark</span>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)' }}>
                    {formData.target_role_title} <Badge variant="primary" style={{ marginLeft: '6px' }}>{formData.target_family}</Badge>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Self-Reported Skills</span>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {formData.existing_skills.length ? (
                      formData.existing_skills.map(s => <Badge key={s} variant="primary">{s}</Badge>)
                    ) : (
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>None selected yet (we'll start from basics)</span>
                    )}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Weekly Commitment</span>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{formData.study_hours_per_week} hours/week • {formData.learning_style}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'var(--space-8)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-border)'
          }}>
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} icon={ArrowLeft}>
                Back
              </Button>
            ) : <div />}

            {step < totalSteps ? (
              <Button variant="primary" onClick={() => setStep(step + 1)}>
                Next Step <ArrowRight size={16} />
              </Button>
            ) : (
              <Button variant="primary" loading={saving} onClick={handleFinish} icon={Sparkles}>
                Generate My Roadmap
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
