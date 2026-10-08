import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Camera, Cpu, Activity, Award, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">UNDER THE HOOD</Badge>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display">
          How KhelSetu AI Evaluates Movement
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          KhelSetu combines WebRTC camera APIs with trigonometric biomechanical joint tracking to score repetitions, cadence, and form accuracy in real time.
        </p>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">1. Frame Capture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The browser captures 30 to 60 frames per second using standard device camera hardware.
          </p>
        </Card>

        <Card className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">2. Joint Detection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Computer vision maps 33 key skeletal landmarks (shoulders, elbows, hips, knees, ankles).
          </p>
        </Card>

        <Card className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">3. State Machine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Trigonometric angle state machines evaluate inflection points to register verified reps.
          </p>
        </Card>

        <Card className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">4. Scoring & Insights</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Overall KhelScore (0-100) is generated alongside actionable coaching feedback.
          </p>
        </Card>
      </div>

      {/* CTA Box */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 font-display">Ready to Test Your Form?</h3>
        <p className="text-xs text-slate-600">Take your first AI camera assessment in less than 2 minutes.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/app/dashboard')} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Start Assessment Now
        </Button>
      </div>
    </div>
  );
};
