import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Save, ArrowRight, Activity, BarChart2, RotateCcw, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import { KhelScoreBadge } from '../components/common/KhelScoreBadge';
import { calculateKhelScoreEngine } from '../utils/scoreEngine';
import { useAssessment } from '../context/AssessmentContext';

export const AthleteAssessmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addAssessment } = useAssessment();

  const assessmentState = location.state || {
    reps: 24,
    validReps: 22,
    formAccuracy: 89,
    duration: 58,
    exercise: 'Push-Ups',
    repLogs: [
      { repNumber: 1, rangeOfMotion: 88, durationSec: 2.1, formQuality: 95, validity: 'VALID' },
      { repNumber: 2, rangeOfMotion: 84, durationSec: 2.3, formQuality: 91, validity: 'VALID' },
      { repNumber: 3, rangeOfMotion: 72, durationSec: 2.0, formQuality: 82, validity: 'VALID' },
      { repNumber: 4, rangeOfMotion: 60, durationSec: 1.8, formQuality: 70, validity: 'PARTIAL' }
    ]
  };

  const scoreData = calculateKhelScoreEngine({
    reps: assessmentState.reps,
    formAccuracy: assessmentState.formAccuracy,
    cadence: 1.8
  });

  const khelScore = Math.min(100, Math.max(50, Math.round(assessmentState.formAccuracy * 0.5 + (assessmentState.validReps / Math.max(1, assessmentState.reps)) * 50)));

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    addAssessment({
      exercise: assessmentState.exercise || 'Push-Ups',
      reps: assessmentState.reps,
      validReps: assessmentState.validReps,
      score: khelScore,
      formAccuracy: assessmentState.formAccuracy,
      duration: assessmentState.duration,
      date: new Date().toISOString()
    });
    setSaved(true);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title Header */}
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Assessment Completed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {assessmentState.exercise} Results
          </h1>
          <p className="text-sm text-slate-600">Standardized Movement & Posture Performance Metrics</p>
        </div>

        {/* KhelScore Core Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
            
            {/* Left Score Display */}
            <div className="md:col-span-5 text-center md:text-left space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">KhelScore</span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-6xl font-extrabold text-[#0B192C]">{khelScore}</span>
                <span className="text-2xl font-bold text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                KhelScore combines measured movement quality, form adherence, and repetition completion into a standardized result.
              </p>
            </div>

            {/* Right Metrics Grid */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Performance Score</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">84</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Form Rating</span>
                <span className="text-2xl font-bold text-emerald-600 mt-1 block">{assessmentState.formAccuracy}%</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Valid Repetitions</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">{assessmentState.validReps} <span className="text-xs font-normal text-slate-500">/ {assessmentState.reps}</span></span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Total Duration</span>
                <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">{formatTimer(assessmentState.duration || 58)}</span>
              </div>
            </div>

          </div>

          {/* Feedback & Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Your Performance
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                Strong overall execution with consistent tempo and proper joint alignment during initial repetitions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
              <h3 className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-600" />
                Areas to Improve
              </h3>
              <p className="text-xs text-orange-800 leading-relaxed font-medium">
                Maintain full extension and complete depth toward the final reps to prevent partial repetition counts.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!saved ? (
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm w-full sm:w-auto shadow-sm transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Result</span>
                </button>
              ) : (
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Result Saved to Account
                </span>
              )}

              <Link
                to="/explore"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm w-full sm:w-auto transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Take Another Assessment</span>
              </Link>
            </div>

            <Link
              to="/athlete/home"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-sm w-full sm:w-auto shadow-sm transition-colors"
            >
              <span>View Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
