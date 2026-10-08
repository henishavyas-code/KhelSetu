import React from 'react';
import { Card } from '../components/common/Card';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-display">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 31, 2026</p>
      </div>

      <Card className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white font-display">1. Camera Data & Pose Processing</h3>
          <p>
            KhelSetu processes video frames strictly inside the local browser client for pose keypoint extraction. Video streams are not stored on remote servers without explicit user recording consent.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-white font-display">2. Athlete Biometric Data</h3>
          <p>
            Biomechanical performance metrics (joint angles, rep counts, form scores, KhelScore) are encrypted and linked securely to the athlete profile for leaderboard and scouting discovery.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-white font-display">3. Scout Access & Verification</h3>
          <p>
            Athletes control whether their profile is public or restricted to certified sports federations and registered scouts.
          </p>
        </section>
      </Card>
    </div>
  );
};
