import React from 'react';
import { Award, Zap, Activity, CheckCircle, ShieldCheck } from 'lucide-react';

export const KhelScoreBadge = ({ score = 87.4, size = 'large', breakdown = null }) => {
  const defaultBreakdown = breakdown || {
    strength: 92,
    form: 94,
    consistency: 89,
    cadence: 88,
    reliability: 96
  };

  const isLarge = size === 'large';

  return (
    <div className={`bg-[#0B0F17] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl ${
      isLarge ? 'max-w-md' : 'max-w-xs'
    }`}>
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">KHEL SCORE ENGINE</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          VERIFIED INDEX
        </span>
      </div>

      {/* Center Geometric Radial Display */}
      <div className="flex flex-col items-center justify-center my-4 relative">
        <svg className="w-36 h-36" viewBox="0 0 100 100">
          {/* Outer Track Ring */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="6" />
          {/* Animated Value Arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * score) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
          {/* Inner Geometric Pentagram Grid */}
          <polygon points="50,18 78,38 68,72 32,72 22,38" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
        </svg>

        {/* Numeric Score Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-display text-3xl font-extrabold text-white tracking-tight">{score}</span>
          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">KHEL SCORE</span>
        </div>
      </div>

      {/* Performance Factor Breakdown Grid */}
      <div className="space-y-2 mt-4 pt-4 border-t border-slate-800 text-xs font-mono">
        <div className="flex items-center justify-between text-slate-400">
          <span>Form Accuracy</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${defaultBreakdown.form}%` }}></div>
            </div>
            <span className="text-white font-bold">{defaultBreakdown.form}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Strength Metric</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${defaultBreakdown.strength}%` }}></div>
            </div>
            <span className="text-white font-bold">{defaultBreakdown.strength}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Cadence Stability</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${defaultBreakdown.cadence}%` }}></div>
            </div>
            <span className="text-white font-bold">{defaultBreakdown.cadence}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Reliability Index</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${defaultBreakdown.reliability}%` }}></div>
            </div>
            <span className="text-white font-bold">{defaultBreakdown.reliability}%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
