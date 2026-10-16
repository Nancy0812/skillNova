import React from 'react';

export default function Card({ children, hover = false, className = '', style = {}, onClick, ...props }) {
  return (
    <div
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
