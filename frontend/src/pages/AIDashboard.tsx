import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Sparkles, RefreshCw, List } from 'lucide-react';

const AIDashboard: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Array<any>>([]);
  const [generating, setGenerating] = useState(false);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/ai/recommendations/');
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      }
    };

    fetchRecommendations();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ai/recommendations/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate recommendation');
      }
      const newRecommendation = await response.json();
      setRecommendations((prev: Array<any>) => [newRecommendation, ...prev]);
    } catch (err: any) {
      // In a real app, we would show an error message
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90">
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold gradient-text">
              AI Dashboard
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 ${
                  generating ? 'cursor-not-allowed' : ''
                }`}
              >
                {generating ? (
                  <span className="flex items-center">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Recommendation</span>
                  </span>
                )}
              </button>
              <NavLink
                to="/assessment"
                className="text-white/70 hover:text-white px-3 py-1 rounded-md hover:bg-white/10"
              >
                <span>New Assessment</span>
              </NavLink>
            </div>
          </div>

          {/* Latest Recommendation Card */}
          {recommendations.length > 0 ? (
            <GlassCard className="p-6">
              <div className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="h-5 w-5" />
                    Latest Recommendation
                  </h3>
                  <div className="space-y-3">
                    <div className="text-white/80">
                      <strong>Recommended Career:</strong> {recommendations[0].recommended_career_title || 'N/A'}
                    </div>
                    <div className="text-white/80">
                      <strong>Career Readiness Score:</strong> {recommendations[0].career_readiness_score}/100
                    </div>
                    <div className="text-white/80">
                      <strong>Skill Gap:</strong>
                      <div className="mt-2 space-y-1">
                        {Object.entries((recommendations[0].skill_gap || {}) as Record<string, number>).map(([skill, gap]: [string, number]) => (
                          <div key={skill} className="flex justify-between text-sm">
                            <span>{skill}</span>
                            <span className={`whitespace-nowrap ${gap >= 80 ? 'text-red-400' : gap >= 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {gap}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-white/80">
                      <strong>3-Month Roadmap:</strong>
                      <div className="mt-2 space-y-3">
                        {Object.entries(recommendations[0].roadmap || {}).map(([month, data]: [string, any]) => (
                          <div key={month} className="border-t pt-4 first:border-t-0 first:pt-0">
                            <h4 className="font-medium text-white">{month.replace('_', ' ')}</h4>
                            <p className="text-white/70 text-sm">{data.goal || ''}</p>
                            {data.skills_to_learn && data.skills_to_learn.length > 0 && (
                              <div className="mt-2">
                                <strong className="text-white/80">Skills to learn:</strong>
                                <ul className="list-disc list-inside mt-1 text-white/70 space-y-1">
                                  {data.skills_to_learn.map((skill: string) => (
                                    <li key={skill}>{skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {data.resources && data.resources.length > 0 && (
                              <div className="mt-2">
                                <strong className="text-white/80">Resources:</strong>
                                <ul className="list-disc list-inside mt-1 text-white/70 space-y-1">
                                  {data.resources.map((resource: string, index: number) => (
                                    <li key={index}>{resource}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <NavLink
                    to="/recommendations"
                    className="text-white/70 hover:text-white px-3 py-1 rounded-md hover:bg-white/10"
                  >
                    <List className="h-4 w-4 mr-2" />
                    View All Recommendations
                  </NavLink>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                <Sparkles className="h-5 w-5" />
                No Recommendations Yet
              </h3>
              <p className="text-white/70">
                Complete your skill assessment to generate personalized AI career recommendations.
              </p>
              <NavLink
                to="/assessment"
                className="mt-4 inline-block bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                Start Assessment
              </NavLink>
            </GlassCard>
          )}

          {/* Recommendation History */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <List className="h-5 w-5" />
              Recommendation History
            </h3>
            {recommendations.length > 1 ? (
              <div className="space-y-4">
                {recommendations.slice(1).map((rec) => (
                  <GlassCard key={rec.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{rec.recommended_career_title || 'N/A'}</h4>
                        <p className="text-white/60 text-sm">
                          {new Date(rec.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rec.career_readiness_score >= 80 ? 'bg-green-500/20 text-green-400' : rec.career_readiness_score >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {rec.career_readiness_score}/100
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-white/70 text-sm">
                      {Object.keys(rec.skill_gap || {}).length > 0 && (
                        <span>
                          Top gap: {Object.entries((rec.skill_gap || {}) as Record<string, number>).reduce((a, b) => (a[1] > b[1] ? a : b))[0]} ({Math.max(...Object.values((rec.skill_gap || {}) as Record<string, number>))}%)
                        </span>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-4">
                No past recommendations.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;