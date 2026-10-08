import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValueText?: boolean;
  color?: 'emerald' | 'lime' | 'amber' | 'cyan' | 'rose';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValueText = true,
  color = 'emerald',
  size = 'md'
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  const colorStyles = {
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    lime: 'bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]',
    amber: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    cyan: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]',
    rose: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showValueText) && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
          {label && <span>{label}</span>}
          {showValueText && <span className="font-mono text-emerald-400 font-bold">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${heightStyles[size]}`}>
        <div
          className={`${heightStyles[size]} ${colorStyles[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
