import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const SkillAssessmentPage: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [skills, setSkills] = useState<Array<{ id: number; name: string; category: string; description: string }>>([]);
  const [skillScores, setSkillScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch skills and user assessments from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/ai/skills/');
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      }
    };

    const fetchAssessments = async () => {
      try {
        const response = await fetch('/api/ai/assessment/');
        if (response.ok) {
          const assessmentsData = await response.json();
          // Assuming assessmentsData is an array of { date: string, scores: Record<string, number> }
          if (Array.isArray(assessmentsData) && assessmentsData.length > 0) {
            // Use the most recent assessment for pre-filling the form
            const latestAssessment = assessmentsData[0];
            if (latestAssessment.scores) {
              setSkillScores(latestAssessment.scores);
            }
          }
        } else {
          console.warn('Failed to fetch assessments');
        }
      } catch (err) {
        console.error('Failed to fetch assessments:', err);
      }
    };

    fetchSkills();
    fetchAssessments();
  }, []);

  const handleChange = (skillName: string, value: string) => {
    const score = parseInt(value, 10);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      setSkillScores((prev) => ({ ...prev, [skillName]: score }));
    } else {
      // Optionally, clear invalid input
      setSkillScores((prev) => {
        const newPrev = { ...prev };
        delete newPrev[skillName];
        return newPrev;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (Object.keys(skillScores).length === 0) {
        setError('Please provide at least one skill score');
        return;
      }
      const response = await fetch('/api/ai/assessment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skill_scores: skillScores }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Assessment submission failed');
      }
      setSuccess('Assessment saved successfully!');
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to submit assessment');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90">
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold gradient-text">
              Skill Assessment
            </h2>
            <p className="text-center text-white/80">
              Rate your proficiency in each skill from 0 (no knowledge) to 100 (expert)
            </p>
          </div>
          <GlassCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {skills.length === 0 ? (
                <p className="text-white/50 text-center py-4">Loading skills...</p>
              ) : (
                <>
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{skill.name}</h3>
                          <p className="text-white/60 text-sm">{skill.description}</p>
                        </div>
                        <div className="w-20">
                          <div className="flex items-center space-x-2">
                            <span className="text-white/50 w-8 text-center">{skillScores[skill.name] || 0}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skillScores[skill.name] || 0}
                          onChange={(e) => handleChange(skill.name, e.target.value)}
                          className="w-full h-2 bg-white/10 rounded-lg"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-1">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
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
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-indigo-500 disabled:opacity-50 ${
                    loading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Assessment'}
                </button>
              </div>
            </form>
          </GlassCard>
          <div className="text-center text-white/70">
            <NavLink to="/login" className="font-medium hover:text-white">
              Back to login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentPage;