import React from 'react';
import { MOCK_ASSESSMENT_ATTEMPTS } from '../data/mockProfiles';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { formatDate } from '../utils/formatters';
import { History, Activity, Award } from 'lucide-react';

export const AthleteHistoryPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-white font-display">Assessment Logs & History</h1>
        <p className="text-xs text-slate-400">Authenticated recording logs of past AI camera evaluation sessions.</p>
      </div>

      <div className="space-y-4">
        {MOCK_ASSESSMENT_ATTEMPTS.map((attempt) => (
          <Card key={attempt.id} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">{attempt.assessmentTitle}</h3>
                <span className="text-xs text-slate-400">{formatDate(attempt.timestamp)}</span>
              </div>
              <Badge variant="emerald">{attempt.status.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-[#07090E] p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Reps Logged</span>
                <span className="font-mono font-bold text-white text-base">{attempt.repetitionsCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Form Rating</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{attempt.formScore}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Range of Motion</span>
                <span className="font-mono font-bold text-lime-400 text-base">{attempt.rangeOfMotionScore}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Overall Score</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{attempt.overallScore}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-white">AI Insights:</span>
              <p className="text-slate-400 leading-relaxed">{attempt.aiInsights[0]}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
