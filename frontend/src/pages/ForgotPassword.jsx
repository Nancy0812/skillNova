import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your registered student email.');
      return;
    }
    setError('');
    // Notice: As per specifications, do not fake that an actual email has been sent.
    setSubmitted(true);
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
        {!submitted ? (
          <>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              Password Recovery
            </h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Enter your email address to submit a password reset request.
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

            <form onSubmit={handleSubmit}>
              <Input
                label="Student Email Address"
                id="recovery-email"
                type="email"
                placeholder="student@example.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                style={{ width: '100%', marginBottom: 'var(--space-4)' }}
              >
                Submit Reset Request
              </Button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-light-lavender)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)'
            }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              Request Received
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              Your password reset request for <strong>{email}</strong> has been recorded in the demonstration portal.
            </p>
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#F5F0FF',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-dark-purple)',
              marginBottom: 'var(--space-6)'
            }}>
              <strong>Note:</strong> Automated outbound SMTP email transmission is not connected in this local development environment. You can sign in using Demo Mode or create a new test account.
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary)' }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
