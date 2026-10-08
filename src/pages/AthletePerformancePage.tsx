import React from 'react';
import { MOCK_PERFORMANCE_METRICS } from '../data/mockProfiles';
import { ChartCard } from '../components/common/ChartCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { ScoreRing } from '../components/common/ScoreRing';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { BarChart2, Award, Zap, Activity, Flame } from 'lucide-react';

export const AthletePerformancePage: React.FC = () => {
  const { khelScore, categoryScores, progressTrend, personalBests } = MOCK_PERFORMANCE_METRICS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-white font-display">Performance Intelligence</h1>
        <p className="text-xs text-slate-400">Biomechanical analytics across six athletic core pillars.</p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center text-center p-6 space-y-2 border-emerald-500/30">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">YOUR KHELSCORE</span>
          <ScoreRing score={khelScore} size={140} />
          <Badge variant="emerald">Bronze Level Tier</Badge>
        </Card>

        <div className="md:col-span-2">
          <ChartCard
            title="KhelScore Progress Trajectory"
            subtitle="Historical score progression over recent testing sessions"
            data={progressTrend}
            height={220}
          />
        </div>
      </div>

      {/* Six Fitness Pillar Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-5">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <span>Athletic Category Breakdown</span>
          </h3>

          <div className="space-y-4">
            {categoryScores.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-white">{cat.category}</span>
                  <span className="text-emerald-400 font-mono font-bold">{cat.score} / {cat.maxScore}</span>
                </div>
                <ProgressBar value={cat.score} showValueText={false} color="emerald" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Personal Bests & Records</span>
          </h3>

          <div className="space-y-3">
            {personalBests.map((pb) => (
              <div key={pb.assessmentId} className="bg-[#07090E] border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{pb.assessmentTitle}</h4>
                  <span className="text-[10px] text-slate-400">Achieved on {pb.achievedAt}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-400 font-mono">{pb.score} PTS</span>
                  <span className="block text-[10px] text-slate-400 font-mono">{pb.reps} Reps</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
