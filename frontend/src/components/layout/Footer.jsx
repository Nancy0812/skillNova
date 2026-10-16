import React from 'react';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-white)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-12) 0 var(--space-8)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-8)'
        }}>
          <div>
            <Logo size="md" showTagline={true} />
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--space-3)',
              maxWidth: '300px'
            }}>
              Accessible career-readiness guidance for college students. Understand requirements, analyze skill gaps, and follow a clear roadmap.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-sm)' }}>
              <li><Link to="/careers">Career Explorer</Link></li>
              <li><Link to="/assessment">Skill Assessment</Link></li>
              <li><Link to="/skill-gaps">Skill Gap Analysis</Link></li>
              <li><Link to="/roadmap">Learning Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Free Learning
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-sm)' }}>
              <li><Link to="/resources">Curated Free Resources</Link></li>
              <li><Link to="/projects">Practical Student Projects</Link></li>
              <li><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">MDN Web Docs</a></li>
              <li><a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">Python Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Notice & Ethics
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              SkillNova is an educational career-readiness platform. All synthetic job benchmarks are for skill mapping only and do not constitute job vacancies or placement guarantees.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} SkillNova. Career readiness, made accessible.
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <span>Synthetic Dataset Pack v1</span>
            <span>Zero Paid Guidance Lock-in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
