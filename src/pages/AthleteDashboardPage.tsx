import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/common/StatCard';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { AssessmentInstructionModal } from '../components/assessment/AssessmentInstructionModal';
import { CameraAssessmentView } from '../components/assessment/CameraAssessmentView';
import { AssessmentResultView } from '../components/assessment/AssessmentResultView';
import { Modal } from '../components/common/Modal';
import { CURRENT_ATHLETE_PROFILE } from '../data/mockProfiles';
import { ASSESSMENTS_DATA } from '../data/assessmentsData';
import { Assessment } from '../types';
import { Award, Trophy, Activity, Flame, Play, ArrowRight } from 'lucide-react';

export const AthleteDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [activeStep, setActiveStep] = useState<'none' | 'instructions' | 'camera' | 'results'>('none');

  const handleStartCard = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setActiveStep('instructions');
  };

  const handleProceedToCamera = () => {
    setActiveStep('camera');
  };

  const handleFinishCamera = () => {
    setActiveStep('results');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Grassroots Athlete Portal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 font-display">
            Good morning, {CURRENT_ATHLETE_PROFILE.name}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            Ready to test your physical abilities today? Your next assessment boosts your Speed & Explosiveness score.
          </p>
        </div>

        <button
          onClick={() => handleStartCard(ASSESSMENTS_DATA[0])}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 text-sm transition-all cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Quick Assessment</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="KhelScore"
          value={CURRENT_ATHLETE_PROFILE.khelScore}
          subtext="Overall Rating"
          icon={<Award className="w-5 h-5" />}
          highlight
        />

        <StatCard
          label="Level"
          value={CURRENT_ATHLETE_PROFILE.level}
          subtext="Tier Badge"
          icon={<Trophy className="w-5 h-5" />}
        />

        <StatCard
          label="Assessments"
          value={CURRENT_ATHLETE_PROFILE.totalAssessments}
          subtext="Completed Tests"
          icon={<Activity className="w-5 h-5" />}
        />

        <StatCard
          label="National Rank"
          value={`#${CURRENT_ATHLETE_PROFILE.rankGlobal}`}
          subtext="+5 positions up"
          trend="+5"
          icon={<Trophy className="w-5 h-5" />}
        />

        <StatCard
          label="Active Streak"
          value={`${CURRENT_ATHLETE_PROFILE.streakDays} Days`}
          subtext="Consistency"
          icon={<Flame className="w-5 h-5" />}
        />
      </div>

      {/* Main Action Section: Continue Your Assessment */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Continue Your Assessment</h2>
            <p className="text-xs text-slate-600 font-medium">Select an assessment to log reps and measure your performance score.</p>
          </div>

          <button
            onClick={() => navigate('/app/assessments')}
            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Exercise Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASSESSMENTS_DATA.slice(0, 6).map((item, i) => (
            <AssessmentCard
              key={item.id}
              assessment={item}
              bestScore={84 + (i * 2) % 10}
              onStart={handleStartCard}
              featured={i === 0}
            />
          ))}
        </div>
      </div>

      {/* Modal / Assessment Flow Overlays */}
      {selectedAssessment && activeStep === 'instructions' && (
        <AssessmentInstructionModal
          isOpen={true}
          onClose={() => setActiveStep('none')}
          assessment={selectedAssessment}
          onProceedToCamera={handleProceedToCamera}
        />
      )}

      {selectedAssessment && activeStep === 'camera' && (
        <Modal isOpen={true} onClose={() => setActiveStep('none')} maxWidth="2xl">
          <CameraAssessmentView
            assessment={selectedAssessment}
            onFinish={handleFinishCamera}
            onCancel={() => setActiveStep('none')}
          />
        </Modal>
      )}

      {selectedAssessment && activeStep === 'results' && (
        <Modal isOpen={true} onClose={() => setActiveStep('none')} maxWidth="xl">
          <AssessmentResultView
            result={{
              attempt: {
                id: 'att-cur',
                assessmentId: selectedAssessment.id,
                assessmentTitle: selectedAssessment.title,
                athleteId: CURRENT_ATHLETE_PROFILE.id,
                timestamp: new Date().toISOString(),
                repetitionsCount: 14,
                targetReps: selectedAssessment.targetReps,
                formScore: 86,
                consistencyScore: 80,
                speedScore: 78,
                rangeOfMotionScore: 84,
                overallScore: 82,
                bestRepScore: 9.4,
                avgRepScore: 8.3,
                repDetails: [],
                aiInsights: [
                  'Your movement depth consistently passed target angle threshold.',
                  'Cadence remained smooth with zero joint alignment wobble.'
                ],
                recommendedSteps: [
                  'Maintain heel stability on descent.',
                  'Retake test in 24 hours to track velocity curve.'
                ],
                status: 'completed'
              },
              breakdown: {
                form: 86,
                consistency: 80,
                speed: 78,
                rangeOfMotion: 84
              },
              nextSteps: ['Maintain heel stability', 'Practice 3 sets of 15 controlled reps']
            }}
            onTryAgain={() => setActiveStep('camera')}
            onViewPerformance={() => {
              setActiveStep('none');
              navigate('/app/performance');
            }}
          />
        </Modal>
      )}
    </div>
  );
};
