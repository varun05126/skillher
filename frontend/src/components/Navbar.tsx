import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, User, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  // In a real app, we would get the user from context or state
  const user = { name: 'User', email: 'user@example.com' };

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="gradient-text text-2xl font-bold">SkillHer</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/profile" className="text-white/70 hover:text-white transition-colors">
              <User className="h-4 w-4" />
              <span className="ml-2">{user.name}</span>
            </Link>
            <Link to="/assessment" className="text-white/70 hover:text-white transition-colors">
              <Search className="h-4 w-4" />
              <span className="ml-2">Assessment</span>
            </Link>
            <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">
              <Menu className="h-4 w-4" />
              <span className="ml-2">Dashboard</span>
            </Link>
            <button
              onClick={() => {
                // Logout logic (remove token, redirect)
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="text-white/70 hover:text-white transition-colors flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-white/70 hover:text-white transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;