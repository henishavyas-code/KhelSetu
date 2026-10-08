import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowLeft, History } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const AthleteHistory = () => {
  const { submissions } = useAssessment();

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <Link to="/athlete/home" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Assessment History</h1>
          </div>

          <span className="px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
            {submissions.length} Total Assessments
          </span>
        </div>

        {/* History Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Assessment Records Log</span>
            <span>Sorted by Recent</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Record ID</th>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Exercise</th>
                  <th className="py-3.5 px-6">Reps</th>
                  <th className="py-3.5 px-6">KhelScore</th>
                  <th className="py-3.5 px-6 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{sub.id}</td>
                    <td className="py-4 px-6 text-slate-500">{sub.timestamp || sub.date || 'Recent'}</td>
                    <td className="py-4 px-6 font-bold text-orange-600">{sub.exercise}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{sub.reps} reps</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold text-sm">{sub.score}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
