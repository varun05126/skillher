import React, { ReactNode } from 'react';
import { Navigate, useLocation, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Private route component that redirects to login if not authenticated
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

// Public route component that redirects to dashboard if authenticated (for landing, login, register)
const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // If user is logged in and trying to access login/register/landing, redirect to dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
};

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileSetupPage from '../pages/ProfileSetupPage';
import SkillAssessmentPage from '../pages/SkillAssessmentPage';
import AIDashboard from '../pages/AIDashboard';
import RecommendationHistoryPage from '../pages/RecommendationHistoryPage';

const AppRoutes: React.FC = () => {
  return (
    <>
      {/* Public routes (landing, login, register) */}
      <PublicRoute>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
      </PublicRoute>

      {/* Protected routes (requires authentication) */}
      <PrivateRoute>
        <Route path="/dashboard" element={<AIDashboard />} />
        <Route path="/assessment" element={<SkillAssessmentPage />} />
        <Route path="/profile" element={<ProfileSetupPage />} />
        <Route path="/recommendations" element={<RecommendationHistoryPage />} />
        {/* Add other protected routes here */}
      </PrivateRoute>

      {/* Fallback for 404 - we can redirect to landing or show a 404 page */}
      <Navigate to="/" replace />
    </>
  );
};

export default AppRoutes;