import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does KhelSetu require a high-end smartphone camera?',
      a: 'No. KhelSetu is designed for standard smartphone cameras (720p 30fps). It processes pose frames locally in the browser with high efficiency.'
    },
    {
      q: 'How does KhelSetu prevent fake reps or cheating?',
      a: 'Our state machine tracks joint angle trajectories (elbows, knees, hips) and validates full range of motion. Frame rates, cadence anomalies, and video hashes are validated for integrity.'
    },
    {
      q: 'Can coaches and scouts access athlete profiles?',
      a: 'Yes. Verified coaches, sports academies, and talent scouts can browse verified profiles, filter by district, and invite athletes to official trials.'
    },
    {
      q: 'What is KhelScore?',
      a: 'KhelScore is a standardized 0-100 overall performance metric calculated from strength, endurance, speed, mobility, balance, and form accuracy across assessments.'
    },
    {
      q: 'Is there a mobile application coming soon?',
      a: 'Yes! While we are currently delivering the full commercial web experience first, our API architecture is designed so the upcoming mobile app will use the exact same backend services.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-4">
        <Badge variant="cyan">Frequently Asked Questions</Badge>
        <h1 className="text-4xl font-black text-slate-900 font-display">Got Questions? We Have Answers.</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <Card
              key={i}
              className="cursor-pointer transition-all hover:border-slate-300"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="flex justify-between items-center font-bold text-slate-900 font-display text-base">
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </div>
              {isOpen && <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100 mt-3">{faq.a}</p>}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
