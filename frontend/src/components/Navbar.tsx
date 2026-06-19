import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Menu,
  LogOut,
  Search,
  Sparkles,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const isAuthenticated = !!user && !loading;

  return (
    <nav className="bg-space-deep/80 backdrop-blur-sm border-b border-space-black/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-offwhite">SkillHer</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors ml-4 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </NavLink>
              </>
            )}
            {isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Menu className="h-4 w-4" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/assessment"
                  className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors ml-4 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Search className="h-4 w-4" />
                  <span>Assessment</span>
                </NavLink>
                <NavLink
                  to="/recommendations"
                  className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors ml-4 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Recommendations</span>
                </NavLink>
                <div className="relative ml-4">
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-offwhite/70 hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button className="text-offwhite/70 hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;