import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this content.',
  retryAction
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-8) var(--space-6)',
      border: '1px solid #FECACA',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: '#FEF2F2',
      color: '#991B1B',
      margin: 'var(--space-4) 0'
    }}>
      <AlertCircle size={36} style={{ marginBottom: 'var(--space-3)' }} />
      <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
        {title}
      </h4>
      <p style={{ fontSize: 'var(--font-size-sm)', maxWidth: '440px', marginBottom: retryAction ? 'var(--space-4)' : 0 }}>
        {message}
      </p>
      {retryAction && (
        <Button variant="secondary" size="sm" onClick={retryAction}>
          Try Again
        </Button>
      )}
    </div>
  );
}
