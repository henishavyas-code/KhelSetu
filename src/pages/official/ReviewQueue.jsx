import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle, RefreshCw, Eye } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const OfficialReviewQueue = () => {
  const { submissions, updateSubmissionStatus } = useAssessment();

  const flaggedList = submissions.filter(s => s.status === 'Flagged' || s.risk === 'High' || s.risk === 'Medium');

  const [activeFilter, setActiveFilter] = useState('All');

  const handleAction = (id, newStatus) => {
    updateSubmissionStatus(id, newStatus, 'Resolved in Review Queue');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-red-400 uppercase tracking-widest block mb-1">
            SAI FORENSIC INTEGRITY QUEUE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            FRAUD & ANOMALY REVIEW QUEUE
          </h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
            {flaggedList.length} SUBMISSIONS REQUIRING AUDIT
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {flaggedList.map((item) => (
          <div key={item.id} className="bg-[#0B0F17] border border-red-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                    FLAGGED ANOMALY REASON
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.flaggedReason || "Rep cadence exceeds expected threshold"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">ID: {item.id}</span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                  {item.risk} RISK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-500 text-[10px] block">ATHLETE NAME</span>
                <span className="text-white font-bold">{item.athleteName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DISTRICT / STATE</span>
                <span>{item.district}, {item.state}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">EXERCISE / REPS</span>
                <span className="text-emerald-400 font-bold">{item.exercise} ({item.reps} reps)</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">CADENCE DETECTED</span>
                <span className="text-amber-400 font-bold">{item.cadence} reps/sec</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
              <Link
                to={`/official/submissions/${item.id}`}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline"
              >
                <Eye className="w-4 h-4" />
                Inspect Keypoint Timeline & Video Hash →
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction(item.id, 'Verified')}
                  className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
                >
                  DISMISS FLAG & VERIFY
                </button>
                <button
                  onClick={() => handleAction(item.id, 'Rejected')}
                  className="px-3 py-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold transition-colors"
                >
                  REJECT SUBMISSION
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
