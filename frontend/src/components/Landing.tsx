import React, { useState, useEffect, useRef } from 'react';
import Constellation from './Constellation';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Refs for staggered animation elements
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  // Refs for new sections
  const howItWorksRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduceMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Remove animation classes if reduced motion is enabled
        [
          headlineRef,
          inputRef,
          paragraphRef,
          ctaRef,
          constellationRef,
          howItWorksRef,
          featuresRef,
          benefitsRef,
          finalCtaRef,
        ].forEach((ref) => {
          if (ref.current) {
            ref.current.classList.remove('fade-in-up');
            ref.current.style.animationDelay = '0s';
          }
        });
      } else {
        // Add animation classes with staggered delay
        const refs = [
          { ref: headlineRef, delay: 0 },
          { ref: inputRef, delay: 100 },
          { ref: paragraphRef, delay: 200 },
          { ref: ctaRef, delay: 300 },
          { ref: constellationRef, delay: 400 },
          { ref: howItWorksRef, delay: 500 },
          { ref: featuresRef, delay: 600 },
          { ref: benefitsRef, delay: 700 },
          { ref: finalCtaRef, delay: 800 },
        ];
        refs.forEach(({ ref, delay }) => {
          if (ref.current) {
            ref.current.classList.add('fade-in-up');
            ref.current.style.animationDelay = `${delay}ms`;
          }
        });
      }
    };

    // Initial check
    handleReduceMotion({ matches: mediaQuery.matches } as MediaQueryListEvent);
    mediaQuery.addEventListener('change', handleReduceMotion);

    return () => {
      mediaQuery.removeEventListener('change', handleReduceMotion);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate('/register', {
        state: {
          initialSkill: inputValue,
        },
      });
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-space-deep text-offwhite p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-display text-center mb-6 leading-tight"
        >
          Built for <span className="italic text-gold">her next move.</span>
        </h1>

        {/* Pill-shaped input bar */}
        <div ref={inputRef} className="relative mb-6 flex w-full max-w-xl">
          <input
            type="text"
            placeholder="What skill are you ready to learn?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSubmit}
            className="flex-1 rounded-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold text-offwhite placeholder-muted/60"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="absolute right-0 top-0 bottom-0 ml-3 rounded-full bg-white flex items-center justify-center w-12 h-12 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowRight className="h-5 w-5 text-space-deep" />
          </button>
        </div>

        {/* Supporting paragraph */}
        <p
          ref={paragraphRef}
          className="text-lg text-muted text-center mb-8 max-w-xl"
        >
          Skillher gives personalized skill recommendations for women based on
          interests, current skills, and career goals — real courses, real
          outcomes, not generic suggestions.
        </p>

        {/* Secondary CTA */}
        <div className="mb-10">
          <button
            ref={ctaRef}
            type="button"
            className="rounded-full px-6 py-3 border border-gold/30 text-offwhite hover:border-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            See how it works
          </button>
        </div>

        {/* Constellation */}
        <div ref={constellationRef} className="mb-6">
          <Constellation />
        </div>

        {/* Eyebrow label */}
        <p className="mb-6 text-xs tracking-widest uppercase text-muted">
          MATCHES SKILLS ACROSS CATEGORIES
        </p>

        {/* Horizontally scrollable chip row */}
        <div className="relative w-full max-w-xl">
          <div className="overflow-x-auto flex gap-2 px-2 pb-1 scrollbar-hide">
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Tech & Coding
            </button>
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Design
            </button>
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Business & Finance
            </button>
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Healthcare
            </button>
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Trades & Crafts
            </button>
            <button
              className="rounded-full px-4 py-2 border border-muted/30 text-sm text-muted hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold transition-colors"
            >
              Communication
            </button>
          </div>
          {/* Right-edge fade-out mask */}
          <div className="absolute inset-y-0 right-0 w-10 pointer-none">
            <div className="h-full bg-gradient-to-r from-space-deep via-space-deep to-transparent" />
          </div>
        </div>

        {/* Section 1 — How SkillHer Works */}
        <section
          ref={howItWorksRef}
          id="how-it-works"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            How SkillHer Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">1. Take Skill Assessment</h3>
              <p className="text-muted">
                Complete our comprehensive skill assessment to identify your
                current strengths and areas for growth.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">2. Get AI Recommendations</h3>
              <p className="text-muted">
                Receive personalized course and learning path recommendations
                based on your assessment results and career goals.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">3. Follow Personalized Learning Path</h3>
              <p className="text-muted">
                Follow a customized roadmap with milestones, progress tracking,
                and career growth insights.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — Platform Features */}
        <section
          ref={featuresRef}
          id="features"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Platform Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                {/* Icon placeholder - you can replace with actual icons */}
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Skill Assessment</h3>
              <p className="text-muted text-center">
                Comprehensive evaluation of your current skills and knowledge
                gaps across technical and soft skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
              <p className="text-muted text-center">
                Personalized learning recommendations powered by advanced AI
                that adapts to your learning style and pace.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-6-8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Skill Gap Analysis</h3>
              <p className="text-muted text-center">
                Identify exactly what skills you need to reach your target
                role and get targeted learning recommendations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8zm0-8v4h4V8h-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Learning Roadmaps</h3>
              <p className="text-muted text-center">
                Step-by-step learning paths with milestones, resources, and
                timelines tailored to your goals and schedule.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 012-2h6a2 2 0 012 2v6m-8 0V9a4 4 0 014-4h6a4 4 0 014 4v2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted text-center">
                Visualize your learning journey with detailed analytics,
                completion rates, and skill mastery levels.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Career Growth Insights</h3>
              <p className="text-muted text-center">
                Get data-driven insights on career trajectories, salary
                benchmarks, and skill demand trends in your industry.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Benefits */}
        <section
          ref={benefitsRef}
          id="benefits"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Real Benefits, Real Results
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Identify Strengths</h3>
              <p className="text-muted">
                Discover your unique skill profile and leverage your natural
                talents for career advancement.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Discover Skill Gaps</h3>
              <p className="text-muted">
                Pinpoint exactly what you need to learn to qualify for your
                dream role and stay competitive.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Learn Faster</h3>
              <p className="text-muted">
                Skip the guesswork with personalized recommendations that
                match your learning style and goals.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Build Confidence</h3>
              <p className="text-muted">
                Gain confidence in your abilities with structured learning
                paths and measurable progress.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Improve Employability</h3>
              <p className="text-muted">
                Acquire in-demand skills that employers are actively seeking
                in today's job market.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 — Final CTA */}
        <section
          ref={finalCtaRef}
          id="final-cta"
          className="mb-16 py-12 bg-space-black/20 rounded-2xl"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready for your next move?
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              Start your personalized journey to career growth today.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                className="flex-1 md:flex-none rounded-full px-8 py-4 bg-gold text-space-deep font-semibold hover:bg-gold/90 transition-colors"
              >
                Get Started
              </button>
              <button
                className="flex-1 md:flex-none rounded-full px-8 py-4 border border-gold/50 text-offwhite hover:border-gold transition-colors"
              >
                Take Assessment
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;