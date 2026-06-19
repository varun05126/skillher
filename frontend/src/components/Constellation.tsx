import React from 'react';

const Constellation: React.FC = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[300px]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Dots */}
        <circle cx="20" cy="80" r="2" className="fill-white twinkle-1" />
        <circle cx="30" cy="70" r="1.5" className="fill-gold twinkle-2" />
        <circle cx="45" cy="55" r="2" className="fill-white twinkle-3" />
        <circle cx="60" cy="40" r="1.5" className="fill-gold twinkle-4" />
        <circle cx="75" cy="25" r="2" className="fill-white twinkle-5" />
        <circle cx="90" cy="10" r="1.5" className="fill-gold twinkle-6" />

        {/* Lines connecting the dots */}
        <line x1="20" y1="80" x2="30" y2="70" stroke="white" strokeWidth="0.5" className="opacity-20" />
        <line x1="30" y1="70" x2="45" y2="55" stroke="white" strokeWidth="0.5" className="opacity-20" />
        <line x1="45" y1="55" x2="60" y2="40" stroke="white" strokeWidth="0.5" className="opacity-20" />
        <line x1="60" y1="40" x2="75" y2="25" stroke="white" strokeWidth="0.5" className="opacity-20" />
        <line x1="75" y1="25" x2="90" y2="10" stroke="white" strokeWidth="0.5" className="opacity-20" />

        {/* Shooting star */}
        <defs>
          <linearGradient id="shootingStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="0"
          x2="20"
          y2="0"
          stroke="url(#shootingStarGradient)"
          strokeWidth="2"
          className="shooting-star"
        />
      </svg>
    </div>
  );
};

export default Constellation;