import React from 'react';

export default function ProgressBar({ value = 0, max = 100, height = 8, showLabel = false, label = '', style = {} }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: '100%', ...style }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
          <span>{label}</span>
          <span style={{ color: 'var(--color-primary)' }}>{percent}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
