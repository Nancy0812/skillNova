import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X, Info, Wifi, WifiOff } from 'lucide-react';

export default function AppLayout({ children, user, isDemo, onLogout, isBackendConnected }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <div style={{ display: 'none', md: 'block' }} className="desktop-sidebar">
        <Sidebar user={user} isDemo={isDemo} onLogout={onLogout} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(36, 29, 53, 0.45)',
            display: 'flex'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{ width: '280px', height: '100%', backgroundColor: 'var(--color-white)', zIndex: 1001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <Sidebar user={user} isDemo={isDemo} onLogout={onLogout} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="main-content">
        {/* Demo Mode / Connection Banner */}
        <div className="demo-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isBackendConnected ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#065F46', fontWeight: 600 }}>
                <Wifi size={14} /> Backend Connected (Django DRF + SQLite)
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#6D28D9', fontWeight: 600 }}>
                <Info size={14} /> Interactive Demo Mode (Local Benchmarks & Offline Storage)
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
            <span>Target: <strong>{user?.profile?.target_role_title || 'Data Analyst'}</strong></span>
          </div>
        </div>

        {/* Mobile Header Bar */}
        <header className="mobile-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-white)'
        }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{ padding: '6px', borderRadius: '4px', color: 'var(--color-text-main)' }}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={22} />
          </button>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
            Skill<span style={{ color: 'var(--color-primary)' }}>Nova</span>
          </div>
          <div style={{ width: '28px' }} />
        </header>

        {/* Page Children Container */}
        <main className="page-container">
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .desktop-sidebar {
            display: block !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
