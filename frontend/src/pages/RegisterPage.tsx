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
    <div className="min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90">
      <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold gradient-text">
              Create Account
            </h2>
            <p className="text-center text-white/80">
              Join SkillHer to unlock your career potential
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
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:border-transparent"
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
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:border-transparent"
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
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:border-transparent"
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
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:border-transparent"
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
                    <UserPlus className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:border-transparent"
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
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-white/30 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-white/80">
                    I agree to the <a href="#" className="text-pink-400 hover:underline">Terms of Service</a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-indigo-500 disabled:opacity-50 ${
                  loading ? 'cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
          </GlassCard>
          <div className="text-center text-white/70">
            <NavLink to="/login" className="font-medium hover:text-white">
              Already have an account? Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;