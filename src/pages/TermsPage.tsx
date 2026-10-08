import React from 'react';
import { Card } from '../components/common/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-display">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective: August 31, 2026</p>
      </div>

      <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white font-display">1. Platform Usage</h3>
          <p>
            KhelSetu is an AI sports talent testing platform. Users agree to perform physical assessments safely and adhere to official movement posture instructions.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-white font-display">2. Anti-Fraud Policy</h3>
          <p>
            Attempting to manipulate camera streams, spoof joint telemetry data, or bypass movement state machines results in immediate disqualification from official leaderboards and scout rosters.
          </p>
        </section>
      </Card>
    </div>
  );
};
