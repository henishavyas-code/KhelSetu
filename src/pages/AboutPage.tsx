import React from 'react';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { ShieldCheck, Target, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">OUR MISSION</Badge>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display">
          Bridging Grassroots Potential With Digital Sports Infrastructure
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          KhelSetu was founded on a simple truth: talent is distributed equally, but opportunity is not. We use computer vision and AI to make professional sports testing accessible to every athlete with a smartphone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="space-y-4">
          <Target className="w-8 h-8 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900 font-display">Democratized Access</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminating financial and geographic barriers by replacing multi-lakh sports lab hardware with accessible AI camera algorithms.
          </p>
        </Card>

        <Card className="space-y-4">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900 font-display">Objective Integrity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standardized mathematical movement scoring ensuring unbiased evaluation for all athletes.
          </p>
        </Card>

        <Card className="space-y-4">
          <Globe className="w-8 h-8 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900 font-display">National Discovery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Connecting village talent directly to national coaches, academies, and Sports Authority initiatives.
          </p>
        </Card>
      </div>
    </div>
  );
};
