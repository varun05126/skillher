import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Sparkles, RefreshCw, List, BarChart3, Activity } from 'lucide-react';

const AIDashboard: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Array<any>>([]);
  const [generating, setGenerating] = useState(false);
  const [skills, setSkills] = useState<Array<{ id: number; name: string; category: string; description: string }>>([]);
  const [skillScores, setSkillScores] = useState<Record<string, number>>({});
  const [assessmentHistory, setAssessmentHistory] = useState<Array<{ date: string; score: number }>>([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch skills and user assessment data
  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const skillsResponse = await fetch('/api/ai/skills/');
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkills(skillsData);
        }

        const assessmentsResponse = await fetch('/api/ai/assessment/');
        if (assessmentsResponse.ok) {
          const assessmentsData = await assessmentsResponse.json();
          if (Array.isArray(assessmentsData) && assessmentsData.length > 0) {
            const latestAssessment = assessmentsData[0];
            if (latestAssessment.scores) {
              setSkillScores(latestAssessment.scores);
            }
            // FIX: explicit types on reduce accumulator to avoid unknown[] error
            const recentAssessments = assessmentsData
              .slice(0, 6)
              .map((assessment: any) => {
                const scoreValues = Object.values(assessment.scores || {}) as number[];
                const avg =
                  scoreValues.length > 0
                    ? scoreValues.reduce((a: number, b: number) => a + b, 0) / scoreValues.length
                    : 0;
                return { date: assessment.date as string, score: avg };
              });
            setAssessmentHistory(recentAssessments);
          }
        }
      } catch (err) {
        console.error('Failed to fetch skill data:', err);
        // Fallback mock data
        setSkills([
          { id: 1, name: 'JavaScript', category: 'Technical', description: 'Web programming language' },
          { id: 2, name: 'Python', category: 'Technical', description: 'Backend programming language' },
          { id: 3, name: 'Communication', category: 'Soft Skills', description: 'Verbal and written communication' },
          { id: 4, name: 'Leadership', category: 'Leadership', description: 'Team leadership and management' },
        ]);
        setSkillScores({
          JavaScript: 75,
          Python: 60,
          Communication: 85,
          Leadership: 70,
        });
        setAssessmentHistory([
          { date: '2026-06-01', score: 70 },
          { date: '2026-06-08', score: 72 },
          { date: '2026-06-15', score: 75 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchSkillData();
  }, []);

  // Derived metrics — now actually used in JSX
  const overallSkillScore =
    Object.keys(skillScores).length > 0
      ? Math.round(
          Object.values(skillScores).reduce((sum, score) => sum + score, 0) /
            Object.keys(skillScores).length
        )
      : 0;

  const skillStrengthsCount = Object.values(skillScores).filter((s) => s >= 80).length;
  const skillGapsCount = Object.values(skillScores).filter((s) => s < 60).length;

  const learningStreak =
    assessmentHistory.length > 0
      ? Math.floor(
          (new Date().getTime() -
            new Date(assessmentHistory[assessmentHistory.length - 1].date).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // De-duped category averages
  const categoryStats: { category: string; averageScore: number }[] = Array.from(
    new Map(
      skills.map((skill) => {
        const peers = skills.filter((s) => s.category === skill.category);
        const avg =
          peers.length > 0
            ? Math.round(
                peers.reduce((sum, s) => sum + (skillScores[s.name] || 0), 0) / peers.length
              )
            : 0;
        return [skill.category, { category: skill.category, averageScore: avg }];
      })
    ).values()
  );

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ai/recommendations/generate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate recommendation');
      }
      const newRecommendation = await response.json();
      setRecommendations((prev: Array<any>) => [newRecommendation, ...prev]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (authLoading || loading) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90">
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold gradient-text">Skill Dashboard</h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 ${
                  generating ? 'cursor-not-allowed' : ''
                }`}
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
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

          {/* Skill Overview */}
          <GlassCard className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                {/* FIX: wrapped icon + text in flex span so they sit on the same line */}
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Skill Overview</span>
                </h3>
                <div className="text-right space-y-1">
                  <p className="text-white/60 text-sm">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Metrics — now use dynamic state */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Overall Skill Score</p>
                  <p className="text-3xl font-bold text-white mb-1">{overallSkillScore}%</p>
                  <p className="text-white/60">Skill Proficiency</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Skill Strengths</p>
                  <p className="text-2xl font-bold text-white">{skillStrengthsCount}</p>
                  <p className="text-white/60">Above 80%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Skill Gaps</p>
                  <p className="text-2xl font-bold text-white">{skillGapsCount}</p>
                  <p className="text-white/60">Below 60%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Learning Progress</p>
                  <p className="text-2xl font-bold text-white">{learningStreak}</p>
                  <p className="text-white/60">Days tracked</p>
                </div>
              </div>

              {/* Dynamic category bars */}
              <div className="mt-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Skills by Category
                </h4>
                <div className="space-y-3">
                  {categoryStats.map(({ category, averageScore }) => (
                    <div key={category} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-white/80 font-medium">{category}</p>
                        <p className="text-white/60 text-xs">{averageScore}% average</p>
                      </div>
                      <div className="w-32">
                        <div className="bg-white/20 rounded-full h-2.5 mb-1">
                          <div
                            className={`h-2.5 rounded-full ${
                              averageScore >= 80
                                ? 'bg-green-400'
                                : averageScore >= 60
                                ? 'bg-yellow-400'
                                : 'bg-red-400'
                            }`}
                            style={{ width: `${averageScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic assessment history bars */}
              <div className="mt-6">
                <h4 className="text-white font-bold mb-3">Recent Assessments</h4>
                <div className="space-y-2">
                  {assessmentHistory.map((entry, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-20 text-right text-white/60 text-xs">
                        {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/10 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                            style={{ width: `${Math.round(entry.score)}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-10 text-left text-white">{Math.round(entry.score)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Latest Recommendation */}
          {recommendations.length > 0 ? (
            <GlassCard className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Latest Recommendation</span>
                </h3>
                <div className="space-y-3">
                  <div className="text-white/80">
                    <strong>Recommended Skill:</strong>{' '}
                    {recommendations[0].recommended_career_title || 'N/A'}
                  </div>
                  <div className="text-white/80">
                    <strong>Skill Readiness Score:</strong>{' '}
                    {recommendations[0].career_readiness_score}/100
                  </div>
                  <div className="text-white/80">
                    <strong>Skill Gap:</strong>
                    <div className="mt-2 space-y-1">
                      {Object.entries(
                        (recommendations[0].skill_gap || {}) as Record<string, number>
                      ).map(([skill, gap]: [string, number]) => (
                        <div key={skill} className="flex justify-between text-sm">
                          <span>{skill}</span>
                          <span
                            className={`whitespace-nowrap ${
                              gap >= 80
                                ? 'text-red-400'
                                : gap >= 60
                                ? 'text-yellow-400'
                                : 'text-green-400'
                            }`}
                          >
                            {gap}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/80">
                    <strong>3-Month Roadmap:</strong>
                    <div className="mt-2 space-y-3">
                      {Object.entries(recommendations[0].roadmap || {}).map(
                        ([month, data]: [string, any]) => (
                          <div key={month} className="border-t pt-4 first:border-t-0 first:pt-0">
                            <h4 className="font-medium text-white">
                              {month.replace('_', ' ')}
                            </h4>
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
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  {/* FIX: added inline-flex items-center so icon and text align */}
                  <NavLink
                    to="/recommendations"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white px-3 py-1 rounded-md hover:bg-white/10"
                  >
                    <List className="h-4 w-4" />
                    View All Recommendations
                  </NavLink>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6 text-center">
              {/* FIX: icon inside h3 needs flex to sit beside text */}
              <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span>No Recommendations Yet</span>
              </h3>
              <p className="text-white/70">
                Complete your skill assessment to generate personalized AI skill recommendations.
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
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <List className="h-5 w-5" />
              <span>Recommendation History</span>
            </h3>
            {recommendations.length > 1 ? (
              <div className="space-y-4">
                {recommendations.slice(1).map((rec) => (
                  <GlassCard key={rec.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">
                          {rec.recommended_career_title || 'N/A'}
                        </h4>
                        <p className="text-white/60 text-sm">
                          {new Date(rec.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80">
                          <strong>Recommended Skill:</strong>{' '}
                          {rec.recommended_career_title || 'N/A'}
                        </div>
                        <div className="text-white/80 mt-1">
                          <strong>Skill Readiness:</strong>{' '}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rec.career_readiness_score >= 80
                                ? 'bg-green-500/20 text-green-400'
                                : rec.career_readiness_score >= 60
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {rec.career_readiness_score}/100
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-white/70 text-sm">
                      {Object.keys(rec.skill_gap || {}).length > 0 && (
                        <span>
                          Top gap:{' '}
                          {
                            Object.entries(
                              (rec.skill_gap || {}) as Record<string, number>
                            ).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
                          }{' '}
                          (
                          {Math.max(
                            ...Object.values(
                              (rec.skill_gap || {}) as Record<string, number>
                            )
                          )}
                          %)
                        </span>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-4">No past recommendations.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIDashboard;