import React from 'react';

const Hero: React.FC<{
  title: string;
  subtitle: string;
  bgImage?: string;
}> = ({ title, subtitle, bgImage }) => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-purple-900/80 to-black/90 bg-cover bg-center"
             style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`
          gradient-text
          text-4xl md:text-5xl lg:text-6xl
          font-bold
          mb-4
        `}>
          {title}
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;