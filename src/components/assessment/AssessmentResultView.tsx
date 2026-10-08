import React from 'react';
import { AssessmentResult } from '../../types';
import { ScoreRing } from '../common/ScoreRing';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  Trophy,
  Brain,
  CheckCircle,
  RotateCcw,
  BarChart2,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface AssessmentResultViewProps {
  result: AssessmentResult;
  onTryAgain: () => void;
  onViewPerformance: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onTryAgain,
  onViewPerformance
}) => {
  const { attempt, breakdown, nextSteps } = result;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300 py-6">
      {/* Header Result Hero Card */}
      <div className="bg-[#11161E] border border-emerald-500/40 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400">
              <Trophy className="w-4 h-4" />
              <span>ASSESSMENT COMPLETED</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display">
              {attempt.assessmentTitle}
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              AI movement analysis recorded {attempt.repetitionsCount} valid repetitions with high form compliance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Reps Logged</span>
                <span className="text-lg font-bold text-white">{attempt.repetitionsCount}</span>
              </div>
              <div className="border-r border-slate-800 h-8 self-center" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Best Rep</span>
                <span className="text-lg font-bold text-emerald-400">{attempt.bestRepScore} / 10</span>
              </div>
              <div className="border-r border-slate-800 h-8 self-center" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Avg Rep</span>
                <span className="text-lg font-bold text-lime-400">{attempt.avgRepScore} / 10</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 bg-[#07090E] p-6 rounded-2xl border border-slate-800/80 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">YOUR SCORE</span>
            <ScoreRing score={attempt.overallScore} size={150} />
          </div>
        </div>
      </div>

      {/* Performance Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metric Bars */}
        <Card className="space-y-5">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <span>Biomechanical Breakdown</span>
          </h3>

          <div className="space-y-4">
            <ProgressBar label="Form Accuracy" value={breakdown.form} color="emerald" />
            <ProgressBar label="Consistency Score" value={breakdown.consistency} color="lime" />
            <ProgressBar label="Speed & Pace" value={breakdown.speed} color="cyan" />
            <ProgressBar label="Range of Motion" value={breakdown.rangeOfMotion} color="emerald" />
          </div>
        </Card>

        {/* AI Insights & Recommendations */}
        <Card className="space-y-5">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <span>AI Movement Insights</span>
          </h3>

          <div className="space-y-3">
            {attempt.aiInsights.map((insight, i) => (
              <div key={i} className="bg-[#07090E] border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>"{insight}"</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Next Steps</h4>
            <div className="space-y-1.5">
              {nextSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <Button
          variant="outline"
          size="md"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={onTryAgain}
        >
          Try Again
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={() => alert('Certificate share link copied to clipboard!')}
          >
            Share Result
          </Button>
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onViewPerformance}
          >
            View Performance Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
