import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CareerExplorer from './pages/CareerExplorer';
import SkillAssessment from './pages/SkillAssessment';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

import { checkBackendConnection, getAuthToken, clearAuthToken } from './services/api';
import {
  getStudentState,
  saveStudentState,
  subscribeToStateChanges,
  resetDemoState,
  updateStudentProfile
} from './services/dataService';

export default function App() {
  const navigate = useNavigate();
  const [studentState, setStudentState] = useState(() => getStudentState());

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('skillnova_auth_token') || localStorage.getItem('skillnova_student_state_v2'));
  });

  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [checkingConnection, setCheckingConnection] = useState(true);

  useEffect(() => {
    // Subscribe to centralized state changes
    const unsubscribe = subscribeToStateChanges((updated) => {
      setStudentState({ ...updated });
    });

    async function initSession() {
      const connected = await checkBackendConnection();
      setIsBackendConnected(connected);
      setCheckingConnection(false);
    }

    initSession();
    return unsubscribe;
  }, []);

  const handleLoginSuccess = (userData) => {
    if (userData?.profile) {
      updateStudentProfile(userData.profile);
    }
    setIsAuthenticated(true);
  };

  const handleProfileUpdated = (updatedProfile) => {
    updateStudentProfile(updatedProfile);
  };

  const handleLogout = () => {
    clearAuthToken();
    resetDemoState();
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Construct user object formatted for AppLayout & subcomponents
  const user = {
    first_name: studentState.profile?.first_name || 'Alex',
    email: studentState.profile?.email || 'alex@college.edu',
    profile: studentState.profile
  };

  const renderWithLayout = (Component, extraProps = {}) => (
    <AppLayout
      user={user}
      isDemo={!isBackendConnected}
      onLogout={handleLogout}
      isBackendConnected={isBackendConnected}
    >
      <Component
        user={user}
        onProfileUpdated={handleProfileUpdated}
        onLogout={handleLogout}
        isBackendConnected={isBackendConnected}
        {...extraProps}
      />
    </AppLayout>
  );

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing isAuthenticated={isAuthenticated} />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} isDemo={!isBackendConnected} />} />
      <Route path="/signup" element={<Signup onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/onboarding" element={<Onboarding user={user} onProfileUpdated={handleProfileUpdated} />} />

      {/* Internal Student Application Views */}
      <Route path="/dashboard" element={renderWithLayout(Dashboard)} />
      <Route path="/careers" element={renderWithLayout(CareerExplorer)} />
      <Route path="/assessment" element={renderWithLayout(SkillAssessment)} />
      <Route path="/skill-gaps" element={renderWithLayout(SkillGapAnalysis)} />
      <Route path="/roadmap" element={renderWithLayout(Roadmap)} />
      <Route path="/resources" element={renderWithLayout(Resources)} />
      <Route path="/projects" element={renderWithLayout(Projects)} />
      <Route path="/progress" element={renderWithLayout(Progress)} />
      <Route path="/settings" element={renderWithLayout(Settings)} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}
