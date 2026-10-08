import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: string;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  highlight = false
}) => {
  return (
    <div
      className={`bg-white border ${
        highlight ? 'border-emerald-500/60 ring-2 ring-emerald-500/10 shadow-md' : 'border-slate-200/80 shadow-xs'
      } rounded-2xl p-5 flex items-center justify-between transition-all hover:border-slate-300`}
    >
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-tight">{value}</span>
          {trend && <span className="text-xs font-bold text-emerald-600">{trend}</span>}
        </div>
        {subtext && <p className="text-xs text-slate-500 font-medium">{subtext}</p>}
      </div>
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
};
