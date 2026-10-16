import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { Compass, ArrowRight, User } from 'lucide-react';

export default function Navbar({ isAuthenticated = false, isDemo = true }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--color-border)',
      transition: 'all var(--transition-fast)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        <Logo size="md" showTagline={false} />

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)'
        }}>
          <a href="#features" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
            Features
          </a>
          <a href="#how-it-works" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
            How It Works
          </a>
          <a href="#about" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
            About
          </a>
          <Link to="/careers" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary)' }}>
            Career Explorer
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm" icon={User}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button variant="primary" size="sm">
                  Get Started <ArrowRight size={14} />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
