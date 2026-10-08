import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Activity, CheckCircle2, Play, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            Platform Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">How KhelSetu Works</h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Standardized movement assessment technology designed to measure physical performance using a smartphone camera.
          </p>
        </div>

        {/* 6 Step Visual Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { step: '01', title: 'Prepare', desc: 'Choose your movement assessment (Push-Ups, Squats, or Jumping Jacks) and position your smartphone 6-8 feet away.' },
            { step: '02', title: 'Capture', desc: 'Your device camera observes your movement trajectory in real-time with full privacy.' },
            { step: '03', title: 'Analyze', desc: 'Pose estimation identifies key body landmarks (shoulders, elbows, hips, knees, ankles) to compute movement angles.' },
            { step: '04', title: 'Assess', desc: 'The velocity state machine validates repetition completeness and monitors body posture alignment.' },
            { step: '05', title: 'Understand', desc: 'Receive your detailed KhelScore breakdown covering performance, form accuracy, and consistency.' },
            { step: '06', title: 'Improve', desc: 'Save your result to your profile to track performance trajectory and personal bests over time.' }
          ].map(item => (
            <div key={item.step} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 card-hover-shadow">
              <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Step {item.step}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to take your first assessment?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test your movement form and calculate your KhelScore in under 2 minutes.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              to="/assessment"
              className="flex items-center gap-2 px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Assessment</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
