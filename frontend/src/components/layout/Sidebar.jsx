import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  BarChart2,
  Map,
  BookOpen,
  FolderGit2,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/careers', label: 'Career Explorer', icon: Compass },
  { to: '/assessment', label: 'Skill Assessment', icon: CheckSquare },
  { to: '/skill-gaps', label: 'Skill Gap Analysis', icon: BarChart2 },
  { to: '/roadmap', label: 'Learning Roadmap', icon: Map },
  { to: '/resources', label: 'Learning Resources', icon: BookOpen },
  { to: '/projects', label: 'Practical Projects', icon: FolderGit2 },
  { to: '/progress', label: 'Progress Tracking', icon: TrendingUp },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ user, onLogout, isDemo }) {
  const navigate = useNavigate();

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--color-white)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      {/* Brand Header */}
      <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
        <Logo size="md" showTagline={true} />
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-3)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'var(--color-light-lavender)' : 'transparent',
                transition: 'all var(--transition-fast)'
              })}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User / Mode Footer */}
      <div style={{
        padding: 'var(--space-4) var(--space-4)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: '#FAFAFD'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-light-lavender)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            {user?.first_name ? user.first_name[0].toUpperCase() : 'S'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.first_name || user?.username || 'Student User'}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.profile?.target_role_title || 'Frontend Developer'}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 10px',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            borderRadius: 'var(--radius-sm)',
            transition: 'background-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-light-lavender)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={14} />
          <span>{isDemo ? 'Reset Demo Session' : 'Sign Out'}</span>
        </button>
      </div>
    </aside>
  );
}
