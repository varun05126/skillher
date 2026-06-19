import React, { useEffect, useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { List, Sparkles } from 'lucide-react';

const RecommendationHistoryPage: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/ai/recommendations/');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          console.error('Expected an array of recommendations');
          setRecommendations([]);
        }
      } catch (err) {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (authLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-space-deep flex items-center">
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-display text-offwhite">
              Recommendation History
            </h2>
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 rounded-md bg-gold/10 text-offwhite border border-gold/30 hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold font-sans disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate New</span>
            </NavLink>
          </div>

          {error && (
            <GlassCard className="p-4 text-center">
              <p className="text-red-400">{error}</p>
            </GlassCard>
          )}

          {loading && (
            <GlassCard className="p-4 text-center">
              <p className="text-muted/70">Loading...</p>
            </GlassCard>
          )}

          {!loading && !error && recommendations.length === 0 && (
            <GlassCard className="p-6 text-center">
              <h3 className="text-xl font-display text-offwhite mb-4">
                <List className="h-5 w-5" />
                No Recommendations Yet
              </h3>
              <p className="text-muted/70">
                Complete your skill assessment to generate personalized AI skill recommendations.
              </p>
              <NavLink
                to="/assessment"
                className="mt-4 inline-block rounded-md bg-gold/10 text-offwhite border border-gold/30 hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold font-sans disabled:opacity-50"
              >
                Start Assessment
              </NavLink>
            </GlassCard>
          )}

          {!loading && !error && recommendations.length > 0 && (
            <GlassCard className="p-6">
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-offwhite font-medium">{rec.recommended_career_title || 'N/A'}</h3>
                        <p className="text-muted/60 text-sm">
                          <strong>Recommended Skill:</strong> {rec.recommended_career_title || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted/60 text-sm">
                          <strong>Skill Readiness:</strong> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rec.career_readiness_score >= 80 ? 'bg-green-500/20 text-green-400' : rec.career_readiness_score >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {rec.career_readiness_score}/100
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-muted/60 text-sm">
                      {new Date(rec.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm text-muted/70">
                        <span>Skill Gap</span>
                        <span>Readiness</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          {Object.entries(
                            typeof rec.skill_gap === 'object' && rec.skill_gap !== null
                              ? (rec.skill_gap as Record<string, number>)
                              : {}
                          ).map(([skill, gap]: [string, number]) => (
                            <div key={skill} className="flex justify-between text-xs">
                              <span>{skill}</span>
                              <span className={`whitespace-nowrap ${gap >= 80 ? 'text-red-400' : gap >= 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                                {gap}%
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted/70">
                            <strong>Skill Readiness:</strong> {rec.career_readiness_score}/100
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <h4 className="text-offwhite font-medium mb-2">3-Month Roadmap</h4>
                      <div className="space-y-3">
                        {Object.entries(
                          typeof rec.roadmap === 'object' && rec.roadmap !== null
                            ? (rec.roadmap as Record<string, any>)
                            : {}
                        ).map(([month, data]: [string, any]) => (
                          <div key={month}>
                            <h5 className="text-offwhite font-medium">{month.replace('_', ' ')}</h5>
                            <p className="text-muted/70 text-sm">{data.goal || ''}</p>
                            {data.skills_to_learn && data.skills_to_learn.length > 0 && (
                              <div className="mt-1">
                                <strong className="text-muted/70 text-sm">Skills:</strong>
                                <ul className="list-disc list-inside mt-1 text-muted/60 space-y-1">
                                  {data.skills_to_learn.map((skill: string, index: number) => (
                                    <li key={index}>{skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationHistoryPage;