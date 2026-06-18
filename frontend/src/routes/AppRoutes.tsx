import React, { ReactNode } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileSetupPage from '../pages/ProfileSetupPage';
import SkillAssessmentPage from '../pages/SkillAssessmentPage';
import AIDashboard from '../pages/AIDashboard';
import RecommendationHistoryPage from '../pages/RecommendationHistoryPage';

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;  // FIX: wrap in fragment for React 18 compatibility
};

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>  {/* FIX: Routes and Route now imported */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/profile-setup" element={<PublicRoute><ProfileSetupPage /></PublicRoute>} />

      <Route path="/dashboard" element={<PrivateRoute><AIDashboard /></PrivateRoute>} />
      <Route path="/assessment" element={<PrivateRoute><SkillAssessmentPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfileSetupPage /></PrivateRoute>} />
      <Route path="/recommendations" element={<PrivateRoute><RecommendationHistoryPage /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;