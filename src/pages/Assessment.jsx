import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CameraAssessment } from '../components/assessment/CameraAssessment';

export const Assessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exerciseParam = searchParams.get('exercise') || 'Push-Ups';

  const [selectedExercise, setSelectedExercise] = useState(exerciseParam);

  useEffect(() => {
    if (searchParams.get('exercise')) {
      setSelectedExercise(searchParams.get('exercise'));
    }
  }, [searchParams]);

  const handleCompleteAssessment = (finalStats) => {
    navigate('/athlete/assessment/result', {
      state: {
        exercise: finalStats.exercise || selectedExercise,
        reps: finalStats.reps,
        validReps: finalStats.validReps,
        formAccuracy: finalStats.formAccuracy,
        duration: finalStats.duration,
        repLogs: finalStats.repLogs
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Assessment Exercise Selector Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Assessment Console</span>
            <h1 className="text-2xl font-bold text-slate-900">Standardized Fitness Assessment</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Exercise:</span>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            >
              <option value="Push-Ups">Push-Ups (Upper Body)</option>
              <option value="Squats">Squats (Lower Body)</option>
              <option value="Jumping Jacks">Jumping Jacks (Full Body)</option>
            </select>
          </div>
        </div>

        {/* Live Camera Assessment Component */}
        <CameraAssessment
          exercise={selectedExercise}
          onComplete={handleCompleteAssessment}
        />

      </div>
    </div>
  );
};
