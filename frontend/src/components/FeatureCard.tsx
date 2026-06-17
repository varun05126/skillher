import React from 'react';
import GlassCard from './GlassCard';

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = ({ title, description, icon: Icon }) => {
  return (
    <GlassCard className="flex flex-col items-center text-center space-y-4">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </GlassCard>
  );
};

export default FeatureCard;