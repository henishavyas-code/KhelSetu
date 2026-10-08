import React from 'react';
import { Assessment } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { Play, Clock, Target } from 'lucide-react';

export interface AssessmentCardProps {
  assessment: Assessment;
  bestScore?: number;
  onStart: (assessment: Assessment) => void;
  featured?: boolean;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  bestScore,
  onStart,
  featured = false
}) => {
  return (
    <div
      className={`bg-white border ${
        featured ? 'border-emerald-500/80 ring-2 ring-emerald-500/10 shadow-md' : 'border-slate-200/80 shadow-xs'
      } rounded-2xl overflow-hidden flex flex-col justify-between card-hover-shadow group`}
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={assessment.thumbnail}
          alt={assessment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="emerald">{assessment.category}</Badge>
          <Badge variant="slate">{assessment.difficulty}</Badge>
        </div>

        {bestScore && (
          <div className="absolute bottom-3 right-3 bg-white text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-black tracking-wider font-mono shadow-md border border-emerald-100">
            BEST: {bestScore}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-display line-clamp-1">
            {assessment.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{assessment.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{assessment.durationSeconds}s duration</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Target: {assessment.targetReps} reps</span>
          </div>
        </div>

        <Button
          variant={featured ? 'primary' : 'secondary'}
          size="sm"
          className="w-full"
          leftIcon={<Play className="w-4 h-4 fill-current" />}
          onClick={() => onStart(assessment)}
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
};
