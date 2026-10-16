import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { registerUser, setAuthToken } from '../services/api';

export default function Signup({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service to proceed.');
      return;
    }

    setLoading(true);
    try {
      const username = email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
      const res = await registerUser({
        username,
        email,
        password,
        first_name: fullName
      });

      if (res.token) {
        setAuthToken(res.token);
      }
      setSuccess('Account created! Proceeding to onboarding...');
      onLoginSuccess(res.user);
      setTimeout(() => navigate('/onboarding'), 600);
    } catch (err) {
      setError(err.message || 'Could not complete registration. Check credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, #F5F0FF 0%, #FFFFFF 80%)',
      padding: 'var(--space-6) var(--space-4)'
    }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Logo size="lg" showTagline={true} />
      </div>

      <Card style={{ width: '100%', maxWidth: '460px', padding: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--color-text-main)' }}>
          Create student account
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Begin your structured, accessible career preparation today.
        </p>

        {error && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--radius-md)',
            color: '#B91C1C',
            fontSize: 'var(--font-size-xs)',
            marginBottom: 'var(--space-4)'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 'var(--radius-md)',
            color: '#065F46',
            fontSize: 'var(--font-size-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-4)'
          }}>
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="signup-name"
            type="text"
            placeholder="Jane Doe"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            id="signup-email"
            type="email"
            placeholder="jane@college.edu"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="signup-password"
            type="password"
            placeholder="At least 6 characters"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Minimum 6 characters"
            required
          />

          <Input
            label="Confirm Password"
            id="signup-confirm-password"
            type="password"
            placeholder="Repeat password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)', marginTop: '2px' }}
              />
              <span>
                I understand SkillNova is an educational career-readiness tool and does not provide employment guarantees or placement agency services.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%', marginBottom: 'var(--space-4)' }}
          >
            Create Free Account
          </Button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-4)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
