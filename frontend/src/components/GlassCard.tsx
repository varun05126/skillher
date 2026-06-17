import React from 'react';

const GlassCard: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;