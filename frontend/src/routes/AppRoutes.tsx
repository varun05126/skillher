import React, { ReactNode } from 'react';
import { Navigate, useLocation, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileSetupPage from '../pages/ProfileSetupPage';
import SkillAssessmentPage from '../pages/SkillAssessmentPage';
import AIDashboard from '../pages/AIDashboard';
import RecommendationHistoryPage from '../pages/RecommendationHistoryPage';

// Public route component that redirects to dashboard if authenticated (for landing, login, register)
const PublicRoute: React.FC<{ path: string; element: ReactNode }> = ({ path, element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // If user is logged in and trying to access login/register/landing, redirect to dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <Route path={path} element={element} />;
};

// Private route component that redirects to login if not authenticated
const PrivateRoute: React.FC<{ path: string; element: ReactNode }> = ({ path, element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // While loading, show a loading message in the route
    return <Route path={path} element={<div className="flex h-[60vh] items-center justify-center">Loading...</div>} />;
  }

  return user ? <Route path={path} element={element} /> : <Navigate to="/login" state={{ from: location }} replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes (landing, login, register) */}
      <PublicRoute path="/" element={<LandingPage />} />
      <PublicRoute path="/login" element={<LoginPage />} />
      <PublicRoute path="/register" element={<RegisterPage />} />
      <PublicRoute path="/profile-setup" element={<ProfileSetupPage />} />

      {/* Protected routes (requires authentication) */}
      <PrivateRoute path="/dashboard" element={<AIDashboard />} />
      <PrivateRoute path="/assessment" element={<SkillAssessmentPage />} />
      <PrivateRoute path="/profile" element={<ProfileSetupPage />} />
      <PrivateRoute path="/recommendations" element={<RecommendationHistoryPage />} />

      {/* Fallback for 404 - redirect to landing */}
      <Navigate to="/" replace />
    </Routes>
  );
};

export default AppRoutes;