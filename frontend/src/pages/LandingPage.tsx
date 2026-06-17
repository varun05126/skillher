import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Server, Sparkles, Brain, HeartPulse } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero
        title="Unlock Your Career Potential"
        subtitle="SkillHer uses AI to analyze your skills and provide personalized career recommendations, learning roadmaps, and skill gap analysis."
        bgImage="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title="Skill Assessment"
              description="Evaluate your current skills across technical, soft, and leadership domains."
              icon={Server}
            />
            <FeatureCard
              title="AI-Powered Recommendations"
              description="Get personalized career suggestions and learning roadmaps based on your skill profile."
              icon={Sparkles}
            />
            <FeatureCard
              title="Skill Gap Analysis"
              description="Identify exactly what skills you need to develop for your target career."
              icon={Brain}
            />
            <FeatureCard
              title="Learning Roadmap"
              description="Follow a structured 3-month plan to bridge your skill gaps and reach your goals."
              icon={HeartPulse}
            />
          </div>
        </div>
      </section>
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold gradient-text mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Server className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Assess</h3>
              <p className="text-white/70">Start by evaluating your current skills across multiple domains.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analyze</h3>
              <p className="text-white/70">Our AI analyzes your skills and generates personalized career recommendations.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advance</h3>
              <p className="text-white/70">Follow your customized learning roadmap to close skill gaps and achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/register" className="inline-block bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
            Get Started Free
          </a>
        </div>
      </section>
    </>
  );
};

export default LandingPage;