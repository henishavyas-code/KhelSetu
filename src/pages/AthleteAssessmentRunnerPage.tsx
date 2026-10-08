import React, { useState } from 'react';
import { ASSESSMENTS_DATA } from '../data/assessmentsData';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { AssessmentInstructionModal } from '../components/assessment/AssessmentInstructionModal';
import { CameraAssessmentView } from '../components/assessment/CameraAssessmentView';
import { AssessmentResultView } from '../components/assessment/AssessmentResultView';
import { Modal } from '../components/common/Modal';
import { Assessment } from '../types';

export const AthleteAssessmentRunnerPage: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [activeStep, setActiveStep] = useState<'none' | 'instructions' | 'camera' | 'results'>('none');

  const handleStartCard = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setActiveStep('instructions');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-white font-display">Assessments Catalog</h1>
        <p className="text-xs text-slate-400">Select an assessment to evaluate your performance using camera AI.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASSESSMENTS_DATA.map((item) => (
          <AssessmentCard key={item.id} assessment={item} onStart={handleStartCard} />
        ))}
      </div>

      {selectedAssessment && activeStep === 'instructions' && (
        <AssessmentInstructionModal
          isOpen={true}
          onClose={() => setActiveStep('none')}
          assessment={selectedAssessment}
          onProceedToCamera={() => setActiveStep('camera')}
        />
      )}

      {selectedAssessment && activeStep === 'camera' && (
        <Modal isOpen={true} onClose={() => setActiveStep('none')} maxWidth="2xl">
          <CameraAssessmentView
            assessment={selectedAssessment}
            onFinish={() => setActiveStep('results')}
            onCancel={() => setActiveStep('none')}
          />
        </Modal>
      )}

      {selectedAssessment && activeStep === 'results' && (
        <Modal isOpen={true} onClose={() => setActiveStep('none')} maxWidth="xl">
          <AssessmentResultView
            result={{
              attempt: {
                id: 'att-cur-2',
                assessmentId: selectedAssessment.id,
                assessmentTitle: selectedAssessment.title,
                athleteId: 'ath-profile-cur',
                timestamp: new Date().toISOString(),
                repetitionsCount: 16,
                targetReps: selectedAssessment.targetReps,
                formScore: 88,
                consistencyScore: 82,
                speedScore: 80,
                rangeOfMotionScore: 86,
                overallScore: 84,
                bestRepScore: 9.6,
                avgRepScore: 8.5,
                repDetails: [],
                aiInsights: ['Excellent joint angle trajectory.'],
                recommendedSteps: ['Practice daily.'],
                status: 'completed'
              },
              breakdown: { form: 88, consistency: 82, speed: 80, rangeOfMotion: 86 },
              nextSteps: ['Maintain good tempo']
            }}
            onTryAgain={() => setActiveStep('camera')}
            onViewPerformance={() => setActiveStep('none')}
          />
        </Modal>
      )}
    </div>
  );
};
