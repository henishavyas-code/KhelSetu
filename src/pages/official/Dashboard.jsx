import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Activity, CheckCircle2, AlertTriangle, ArrowRight, FileCheck, Layers } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const OfficialDashboard = () => {
  const { submissions } = useAssessment();
  const flaggedItems = submissions.filter(s => s.status === 'Flagged' || s.risk === 'High');

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-2xl">
              <ShieldCheck className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Admin & Official Console</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">National Assessment Platform Operations</h1>
              <p className="text-xs text-slate-500">System analytics, athlete management, and verification queue</p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            ● ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Registered Athletes</span>
            <span className="text-3xl font-extrabold text-slate-900">1,248</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Assessments</span>
            <span className="text-3xl font-extrabold text-slate-900">4,892</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Verified Records</span>
            <span className="text-3xl font-extrabold text-emerald-600">4,460</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Verification</span>
            <span className="text-3xl font-extrabold text-orange-600">{flaggedItems.length || 3}</span>
          </div>
        </div>

        {/* Management Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/official/submissions"
            className="bg-white border border-slate-200 hover:border-orange-500 p-6 rounded-3xl shadow-sm space-y-3 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">Submissions Audit</h3>
              <p className="text-xs text-slate-500 mt-1">Inspect and verify recorded movement assessments across districts.</p>
            </div>
          </Link>

          <Link
            to="/official/review"
            className="bg-white border border-slate-200 hover:border-red-500 p-6 rounded-3xl shadow-sm space-y-3 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors">Verification Queue</h3>
              <p className="text-xs text-slate-500 mt-1">Review flagged posture and cadence anomaly submissions.</p>
            </div>
          </Link>

          <Link
            to="/official/analytics"
            className="bg-white border border-slate-200 hover:border-blue-500 p-6 rounded-3xl shadow-sm space-y-3 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">Platform Analytics</h3>
              <p className="text-xs text-slate-500 mt-1">View state-wise, age-group, and sport performance metrics.</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};
