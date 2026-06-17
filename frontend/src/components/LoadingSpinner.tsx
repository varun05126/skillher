import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-12 w-12 items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
    </div>
  );
};

export default LoadingSpinner;