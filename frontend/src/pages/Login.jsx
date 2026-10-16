import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { loginUser, setAuthToken } from '../services/api';

export default function Login({ onLoginSuccess, isDemo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please provide both email/username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.token) {
        setAuthToken(res.token);
      }
      setSuccess('Login successful! Redirecting...');
      onLoginSuccess(res.user);
      setTimeout(() => navigate('/dashboard'), 600);
    } catch (err) {
      // If error from server, show server message or allow instant demo access
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      username: 'demo_student',
      first_name: 'Demo Student',
      email: 'student@skillnova.demo',
      profile: {
        college: 'National Engineering College',
        education_level: 'Undergraduate',
        target_role_id: 'ROLE_WD_01',
        target_role_title: 'Frontend Developer',
        target_family: 'Web Development',
        study_hours_per_week: 10
      }
    });
    navigate('/dashboard');
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

      <Card style={{ width: '100%', maxWidth: '440px', padding: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--color-text-main)' }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Sign in to your SkillNova student roadmap.
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
            label="Email or Username"
            id="login-email"
            type="text"
            placeholder="student@example.edu"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="login-password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 'var(--font-size-xs)',
            marginBottom: 'var(--space-6)'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              Remember me
            </label>

            <Link to="/forgot-password" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%', marginBottom: 'var(--space-4)' }}
          >
            Sign In
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleDemoLogin}
            style={{ width: '100%' }}
          >
            Explore in Demo Mode <ArrowRight size={14} />
          </Button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
