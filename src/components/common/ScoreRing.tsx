import React from 'react';

export interface ScoreRingProps {
  score: number; // 0 to 100
  size?: number; // width/height in px
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label = 'KhelScore',
  sublabel = 'Overall Rating'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display font-black text-3xl text-white tracking-tight leading-none">
          {clampedScore}
        </span>
        {label && <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider mt-1">{label}</span>}
      </div>
    </div>
  );
};
