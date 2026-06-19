import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      // Redirect to dashboard or previous page
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-deep flex items-center">
      <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-center text-3xl font-display text-offwhite">
              Welcome Back
            </h2>
            <p className="text-center text-muted">
              Sign in to your SkillHer account
            </p>
          </div>
          <GlassCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-muted/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-offwhite placeholder-muted/40 focus-visible:ring-2 focus-visible:ring-gold font-sans"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LogIn className="h-5 w-5 text-muted/50" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-offwhite placeholder-muted/40 focus-visible:ring-2 focus-visible:ring-gold font-sans"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gold focus:ring-gold border-muted/30 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-muted">
                    Remember me
                  </label>
                </div>
                <NavLink
                  to="/register"
                  className="text-sm text-muted hover:text-gold"
                >
                  Forgot password?
                </NavLink>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 rounded-md bg-gold/10 text-offwhite border border-gold/30 hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold font-sans disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </GlassCard>
          <div className="text-center text-white/70">
            <NavLink to="/register" className="font-medium text-muted hover:text-gold">
              Don't have an account? Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;