import React from 'react';

export default function Badge({ children, variant = 'primary', isSynthetic = false, className = '', style = {} }) {
  if (isSynthetic) {
    return (
      <span className={`badge badge-synthetic ${className}`} style={style}>
        Synthetic Demo
      </span>
    );
  }

  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {children}
    </span>
  );
}
