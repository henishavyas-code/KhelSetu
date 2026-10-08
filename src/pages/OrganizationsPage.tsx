import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Building2, ShieldCheck, Database, Award, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

export const OrganizationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">FOR SPORTS BODIES & ACADEMIES</Badge>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display">
          BUILD A STRONGER SPORTS PIPELINE
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          KhelSetu enables sports organizations, academies, schools, and talent programs to assess athletes at scale using standardized digital performance data.
        </p>
      </div>

      {/* Core Workflow */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl space-y-8 shadow-xl">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400">INSTITUTIONAL PIPELINE</span>
          <h2 className="text-2xl md:text-3xl font-black font-display">Screen, Assess, Analyze & Identify</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center font-bold text-xs">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-emerald-400 block font-mono">01 SCREEN</span>
            <span className="mt-1 block text-slate-200">Mass Registration</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-emerald-400 block font-mono">02 ASSESS</span>
            <span className="mt-1 block text-slate-200">Camera Evaluation</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-emerald-400 block font-mono">03 ANALYZE</span>
            <span className="mt-1 block text-slate-200">KhelScore Rating</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-emerald-400 block font-mono">04 IDENTIFY</span>
            <span className="mt-1 block text-slate-200">District Benchmarking</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-emerald-400 block font-mono">05 DEVELOP</span>
            <span className="mt-1 block text-slate-200">Scout Recruitment</span>
          </div>
        </div>
      </div>

      {/* Audiences Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">State & District Sports Authorities</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conduct state-wide mass fitness screening drives with zero hardware costs using existing smartphones.
          </p>
          <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> District talent heatmaps</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Anti-cheat telemetry logs</div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">Accredited Sports Academies</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standardize intake selection trials with biomechanical objective scores.
          </p>
          <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standardized physical testing</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Objective score verification</div>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 font-display">Partner With KhelSetu</h3>
        <p className="text-xs text-slate-600">Inquire about institutional API access, custom assessment protocols, and scout consoles.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/contact')} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Contact Institutional Team
        </Button>
      </div>
    </div>
  );
};
