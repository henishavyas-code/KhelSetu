import React from 'react';
import { Assessment } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Camera, CheckCircle, ArrowRight } from 'lucide-react';

export interface AssessmentInstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: Assessment;
  onProceedToCamera: () => void;
}

export const AssessmentInstructionModal: React.FC<AssessmentInstructionModalProps> = ({
  isOpen,
  onClose,
  assessment,
  onProceedToCamera
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={assessment.title} maxWidth="lg">
      <div className="space-y-6">
        {/* Banner */}
        <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100">
          <img src={assessment.thumbnail} alt={assessment.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4 text-white">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 px-2 py-0.5 rounded text-white">
                {assessment.category} · {assessment.difficulty}
              </span>
              <h3 className="text-xl font-bold font-display mt-1">{assessment.title}</h3>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <div>
            <span className="text-slate-500 font-bold block">Target Repetitions</span>
            <span className="font-display font-black text-lg text-emerald-600">{assessment.targetReps} Reps</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block">Duration</span>
            <span className="font-display font-black text-lg text-slate-900">{assessment.durationSeconds} Seconds</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Testing Guidelines</h4>
          <div className="space-y-2">
            {assessment.instructions.map((inst, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Camera Setup Note */}
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900">
          <Camera className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-slate-900">Browser Camera Permission</span>
            <span>You will be prompted for camera permissions next. Ensure full body is framed.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onProceedToCamera}
          >
            Start Camera & Test
          </Button>
        </div>
      </div>
    </Modal>
  );
};
