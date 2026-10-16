import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', to = '/', showTagline = false, light = false }) {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 44
  };

  const textSizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.65rem'
  };

  const px = iconSizes[size] || 34;

  return (
    <Link 
      to={to} 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
      aria-label="SkillNova Home"
    >
      <div 
        style={{
          width: px,
          height: px,
          borderRadius: px * 0.28,
          background: light ? 'rgba(255, 255, 255, 0.18)' : '#F5F0FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: light ? 'none' : '0 2px 8px rgba(117, 72, 216, 0.15)',
          flexShrink: 0
        }}
      >
        <svg viewBox="0 0 48 48" width={px * 0.75} height={px * 0.75} fill="none">
          <defs>
            <linearGradient id="logo-sn-grad" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5932B4" />
              <stop offset="50%" stopColor="#7548D8" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          <path d="M12 36 L20 28 L28 22 L36 12" stroke={light ? '#FFFFFF' : 'url(#logo-sn-grad)'} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="36" r="4.5" fill={light ? '#FFFFFF' : '#7548D8'} />
          <circle cx="20" cy="28" r="4" fill={light ? '#FFFFFF' : '#7548D8'} />
          <circle cx="28" cy="22" r="4.5" fill={light ? '#ECE2FF' : '#A78BFA'} />
          <path d="M36 6 L38 10.5 L42.5 12 L38 13.5 L36 18 L34 13.5 L29.5 12 L34 10.5 Z" fill={light ? '#FFFFFF' : '#7548D8'} />
        </svg>
      </div>
      <div>
        <div style={{
          fontSize: textSizes[size] || '1.25rem',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: light ? '#FFFFFF' : '#241D35',
          lineHeight: 1.15,
          display: 'flex',
          alignItems: 'center'
        }}>
          Skill<span style={{ color: light ? '#F5F0FF' : '#7548D8' }}>Nova</span>
        </div>
        {showTagline && (
          <div style={{
            fontSize: '0.7rem',
            color: light ? 'rgba(255, 255, 255, 0.8)' : '#716B80',
            fontWeight: 500,
            marginTop: '2px'
          }}>
            Your skills. Your next step.
          </div>
        )}
      </div>
    </Link>
  );
}
