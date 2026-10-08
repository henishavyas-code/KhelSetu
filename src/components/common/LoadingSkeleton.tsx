import React from 'react';

export interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = 'h-20 w-full', count = 1 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-slate-800/40 rounded-xl animate-pulse ${className}`} />
      ))}
    </div>
  );
};
