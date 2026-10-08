import React from 'react';
import { LeaderboardEntry } from '../../types';
import { AthleteAvatar } from './AthleteAvatar';
import { Badge } from './Badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  onClick?: (entry: LeaderboardEntry) => void;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, onClick }) => {
  const isTop3 = entry.rank <= 3;

  const top3RankColors = {
    1: 'bg-amber-400 text-slate-950 font-black shadow-sm',
    2: 'bg-slate-300 text-slate-950 font-black shadow-sm',
    3: 'bg-amber-600 text-white font-black shadow-sm'
  };

  return (
    <div
      onClick={() => onClick && onClick(entry)}
      className={`flex items-center justify-between p-4 rounded-xl transition-all border ${
        entry.isCurrentUser
          ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-4">
        {/* Rank Badge */}
        <div className="flex flex-col items-center justify-center w-8 shrink-0">
          {isTop3 ? (
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                top3RankColors[entry.rank as 1 | 2 | 3]
              }`}
            >
              #{entry.rank}
            </span>
          ) : (
            <span className="font-mono text-sm font-bold text-slate-500">#{entry.rank}</span>
          )}
        </div>

        {/* Avatar & Athlete Details */}
        <div className="flex items-center gap-3">
          <AthleteAvatar src={entry.athleteAvatar} name={entry.athleteName} level={entry.level} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors font-display">
                {entry.athleteName}
              </h4>
              {entry.isCurrentUser && (
                <span className="px-1.5 py-0.2 text-[10px] font-black bg-emerald-600 text-white rounded">YOU</span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {entry.sport} · <span className="text-slate-600">{entry.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Score & Rank Change */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">KhelScore</span>
          <span className="font-display font-black text-lg text-emerald-600">{entry.khelScore}</span>
        </div>

        <div className="flex items-center justify-center w-6">
          {entry.rankChange > 0 ? (
            <span className="flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="w-4 h-4 mr-0.5" />+{entry.rankChange}
            </span>
          ) : entry.rankChange < 0 ? (
            <span className="flex items-center text-xs font-bold text-rose-600">
              <TrendingDown className="w-4 h-4 mr-0.5" />
              {entry.rankChange}
            </span>
          ) : (
            <Minus className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>
    </div>
  );
};
