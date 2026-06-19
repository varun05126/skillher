import React, { useState, useEffect, useRef } from 'react';
import Constellation from './Constellation';
import { ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  // Refs for staggered animation elements
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduceMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Remove animation classes if reduced motion is enabled
        [headlineRef, inputRef, paragraphRef, ctaRef, constellationRef].forEach(
          (ref) => {
            if (ref.current) {
              ref.current.classList.remove('fade-in-up');
              ref.current.style.animationDelay = '0s';
            }
          }
        );
      } else {
        // Add animation classes with staggered delay
        const refs = [
          { ref: headlineRef, delay: 0 },
          { ref: inputRef, delay: 100 },
          { ref: paragraphRef, delay: 200 },
          { ref: ctaRef, delay: 300 },
          { ref: constellationRef, delay: 400 },
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
    console.log('Input value:', inputValue);
    // In a real app, we would process the input here
  };

  return (
    <div className="min-h-screen bg-space-deep text-offwhite flex flex-col items-center justify-center p-6">
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
    </div>
  );
};

export default Landing;