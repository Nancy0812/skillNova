import React from 'react';

export default function LoadingState({ message = 'Loading details...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-12) var(--space-4)',
      gap: 'var(--space-4)',
      color: 'var(--color-text-secondary)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-light-lavender)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{message}</p>
    </div>
  );
}
