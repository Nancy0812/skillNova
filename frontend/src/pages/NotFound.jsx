import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound({ isAuthenticated }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, #F5F0FF 0%, #FFFFFF 80%)',
      padding: 'var(--space-6) var(--space-4)',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Logo size="lg" showTagline={true} />
      </div>

      <Card style={{ maxWidth: '480px', width: '100%', padding: 'var(--space-10)' }}>
        <div style={{
          fontSize: '5rem',
          fontWeight: 900,
          color: 'var(--color-primary)',
          lineHeight: 1,
          marginBottom: 'var(--space-2)'
        }}>
          404
        </div>

        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
          Page Not Found
        </h2>

        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
          The page or skill path you requested doesn't exist or may have been relocated in the platform curriculum.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <Button variant="primary" icon={ArrowLeft}>
              {isAuthenticated ? "Back to Dashboard" : "Back to Home"}
            </Button>
          </Link>
          <Link to="/careers">
            <Button variant="outline" icon={Compass}>
              Explore Careers
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
