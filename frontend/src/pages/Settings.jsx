import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { updateProfile, logoutUser } from '../services/api';
import { DEMO_ROLES } from '../data/demoData';
import {
  Settings as SettingsIcon,
  User,
  GraduationCap,
  Compass,
  Clock,
  Bell,
  LogOut,
  Save,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function Settings({ user, onProfileUpdated, onLogout, isBackendConnected }) {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || 'Student',
    email: user?.email || 'student@example.edu',
    college: user?.profile?.college || 'National Engineering College',
    education_level: user?.profile?.education_level || 'Undergraduate',
    target_role_title: user?.profile?.target_role_title || 'Frontend Developer',
    target_role_id: user?.profile?.target_role_id || 'ROLE_WD_01',
    target_family: user?.profile?.target_family || 'Web Development',
    study_hours_per_week: user?.profile?.study_hours_per_week || 10,
    learning_style: user?.profile?.learning_style || 'hands-on',
    notifications_enabled: user?.profile?.notifications_enabled !== false
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const updated = await updateProfile({
        college: formData.college,
        education_level: formData.education_level,
        target_role_id: formData.target_role_id,
        target_role_title: formData.target_role_title,
        target_family: formData.target_family,
        study_hours_per_week: formData.study_hours_per_week,
        learning_style: formData.learning_style,
        notifications_enabled: formData.notifications_enabled
      });

      if (onProfileUpdated) {
        onProfileUpdated({
          ...user,
          first_name: formData.first_name,
          email: formData.email,
          profile: {
            ...(user?.profile || {}),
            ...formData
          }
        });
      }

      setSuccessMsg(isBackendConnected
        ? 'Settings saved to server successfully.'
        : 'Settings updated in local session (Demo Mode).'
      );
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Account & Learning Settings"
        subtitle="Manage your profile information, academic details, and career readiness preferences."
        badge={<Badge variant="primary">Preferences</Badge>}
      />

      {/* Persistence Notice */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: isBackendConnected ? '#ECFDF5' : '#F5F0FF',
        border: `1px solid ${isBackendConnected ? '#A7F3D0' : '#DDD6FE'}`,
        color: isBackendConnected ? '#065F46' : 'var(--color-dark-purple)',
        fontSize: 'var(--font-size-xs)',
        marginBottom: 'var(--space-6)'
      }}>
        <Info size={16} />
        <span>
          {isBackendConnected
            ? "Connected to Django backend: Changes will be persisted in your student profile database."
            : "Running in Demo Mode: Preference changes will be saved to your browser session storage."
          }
        </span>
      </div>

      {successMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#065F46',
          fontSize: 'var(--font-size-sm)',
          marginBottom: 'var(--space-6)'
        }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#FEF2F2',
          border: '1px solid #FECACA',
          color: '#B91C1C',
          fontSize: 'var(--font-size-sm)',
          marginBottom: 'var(--space-6)'
        }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} style={{ maxWidth: '720px' }}>
        {/* Profile Card */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--color-primary)" /> Basic Profile Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            <Input
              label="Full Name"
              id="settings-name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              id="settings-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </Card>

        {/* Academic Card */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GraduationCap size={18} color="var(--color-primary)" /> College & Academic Level
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            <Input
              label="College or University"
              id="settings-college"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            />

            <div className="form-group">
              <label className="form-label" htmlFor="settings-education-level">Academic Level</label>
              <select
                id="settings-education-level"
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
        </Card>

        {/* Target Career Card */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} color="var(--color-primary)" /> Target Career Goal
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            Updating your target role dynamically updates your foundational skills, learning roadmap, and diagnostic quizzes across the platform.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="settings-target-family">Career Track / Domain</label>
              <select
                id="settings-target-family"
                className="form-input"
                value={formData.target_family}
                onChange={(e) => {
                  const fam = e.target.value;
                  const matchingRoles = DEMO_ROLES.filter(r => r.family === fam);
                  const firstRole = matchingRoles[0] || DEMO_ROLES[0];
                  setFormData({
                    ...formData,
                    target_family: fam,
                    target_role_id: firstRole.role_id,
                    target_role_title: firstRole.title
                  });
                }}
              >
                {Array.from(new Set(DEMO_ROLES.map(r => r.family))).map(fam => (
                  <option key={fam} value={fam}>{fam}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="settings-target-role">Specific Target Role</label>
              <select
                id="settings-target-role"
                className="form-input"
                value={formData.target_role_id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const roleObj = DEMO_ROLES.find(r => r.role_id === selectedId);
                  if (roleObj) {
                    setFormData({
                      ...formData,
                      target_role_id: roleObj.role_id,
                      target_role_title: roleObj.title,
                      target_family: roleObj.family
                    });
                  }
                }}
              >
                {DEMO_ROLES.filter(r => r.family === formData.target_family).map(r => (
                  <option key={r.role_id} value={r.role_id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Study Availability Card */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--color-primary)" /> Preparation Commitment
          </h3>

          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label" htmlFor="settings-hours">Available Study Hours:</label>
              <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
                {formData.study_hours_per_week} hours/week
              </span>
            </div>
            <input
              id="settings-hours"
              type="range"
              min="4"
              max="30"
              step="2"
              value={formData.study_hours_per_week}
              onChange={(e) => setFormData({ ...formData, study_hours_per_week: parseInt(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="settings-learning-style">Preferred Learning Format</label>
            <select
              id="settings-learning-style"
              className="form-input"
              value={formData.learning_style}
              onChange={(e) => setFormData({ ...formData, learning_style: e.target.value })}
            >
              <option value="hands-on">Hands-on Labs & Practical Projects</option>
              <option value="documentation">Documentation & Guides</option>
              <option value="interactive">Interactive Sandbox & Exercises</option>
            </select>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--color-primary)" /> Notifications
          </h3>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
            <input
              type="checkbox"
              checked={formData.notifications_enabled}
              onChange={(e) => setFormData({ ...formData, notifications_enabled: e.target.checked })}
              style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
            />
            <span>Enable in-app weekly reminder notifications for roadmap milestones</span>
          </label>
        </Card>

        {/* Actions Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            icon={Save}
          >
            Save Changes
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onLogout}
            icon={LogOut}
            style={{ color: '#DC2626', borderColor: '#FECACA' }}
          >
            Sign Out
          </Button>
        </div>
      </form>
    </div>
  );
}
