import React from 'react';
import { BookOpen, HelpCircle, Dumbbell, Award, FileText, CheckCircle2 } from 'lucide-react';

export const ResourcesPage = () => {
  const faqs = [
    {
      q: 'What camera setup is required for accurate assessment?',
      a: 'Place your smartphone on a stable surface at waist level, approximately 6 to 8 feet away from where you perform the exercise. Ensure side-profile visibility so joint angles are clearly visible.'
    },
    {
      q: 'Is video footage uploaded or recorded?',
      a: 'Pose estimation occurs locally on your device. Video frames are processed in real-time memory and are not uploaded or stored without your explicit authorization.'
    },
    {
      q: 'How is KhelScore calculated?',
      a: 'KhelScore is calculated using a composite weighted index of completed valid repetitions, form accuracy percentage, and repetition cadence consistency.'
    },
    {
      q: 'Can coaches review assessment submissions?',
      a: 'Yes, registered coaches and organizations can review verified assessment submissions from their assigned athletes.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">KhelSetu Resources</h1>
          <p className="text-sm text-slate-600">Guides, movement standards, training tips, and frequently asked questions.</p>
        </div>

        {/* Resources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 card-hover-shadow">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Assessment Guides</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Step-by-step camera setup, lighting conditions, and form requirements for Push-Ups, Squats, and Jumping Jacks.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 card-hover-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Training Tips</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeted exercises to improve shoulder stability, core strength, knee alignment, and endurance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 card-hover-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Movement Guides</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Understanding joint angle flexions, velocity thresholds, and posture feedback indicators.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
