import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        username,
      });
      // Redirect to profile setup after registration
      navigate('/profile-setup', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
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
              Create Account
            </h2>
            <p className="text-center text-muted">
              Join SkillHer to unlock your skill potential
            </p>
          </div>
          <GlassCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-muted/50" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-offwhite placeholder-muted/40 focus-visible:ring-2 focus-visible:ring-gold font-sans"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                  />
                </div>
              </div>
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
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-muted/50" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-offwhite placeholder-muted/40 focus-visible:ring-2 focus-visible:ring-gold font-sans"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-muted/50" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-offwhite placeholder-muted/40 focus-visible:ring-2 focus-visible:ring-gold font-sans"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-muted/50" />
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
                    id="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-gold focus:ring-gold border-muted/30 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-muted">
                    I agree to the <a href="#" className="hover:text-gold hover:underline">Terms of Service</a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 rounded-md bg-gold/10 text-offwhite border border-gold/30 hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold font-sans disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
          </GlassCard>
          <div className="text-center text-muted">
            <NavLink to="/login" className="font-medium text-muted hover:text-gold">
              Already have an account? Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;