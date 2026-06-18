export interface Skill {
  id: number;
  name: string;
  category: string;
  description: string;
}

export interface Recommendation {
  id: number;
  recommended_career_title: string;
  career_readiness_score: number;
  skill_gap: Record<string, number>;
  roadmap: Record<string, RoadmapMonth>;
  created_at: string;
}

export interface RoadmapMonth {
  goal: string;
  skills_to_learn: string[];
  resources: string[];
}

export interface AssessmentHistoryItem {
  date: string;
  score: number;
}

export interface CategoryStats {
  category: string;
  averageScore: number;
  skillCount: number;
}