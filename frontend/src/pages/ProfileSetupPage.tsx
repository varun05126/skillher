import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const ProfileSetupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // We'll add more profile fields as needed, but for now let's keep it simple
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [loading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize form with user data if available
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile({ first_name: firstName, last_name: lastName });
      setSuccess('Profile updated successfully!');
      // Redirect to skill assessment after a short delay
      setTimeout(() => {
        navigate('/assessment');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLocalLoading(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90">
      <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold gradient-text">
              Complete Your Profile
            </h2>
            <p className="text-center text-white/80">
              Help us get to know you better
            </p>
          </div>
          <GlassCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
              {error && (
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-md text-sm">
                  {success}
                </div>
              )}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || authLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-indigo-500 disabled:opacity-50 ${
                    loading || authLoading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {loading || authLoading ? 'Saving...' : 'Save & Continue'}
                </button>
              </div>
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

export default ProfileSetupPage;