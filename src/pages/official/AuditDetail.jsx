import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, Smartphone, MapPin, Clock, ArrowLeft, Play, RefreshCw, XCircle } from 'lucide-react';
import { PoseSkeleton } from '../../components/common/PoseSkeleton';
import { useAssessment } from '../../context/AssessmentContext';

export const OfficialAuditDetail = () => {
  const { id } = useParams();
  const { submissions, updateSubmissionStatus } = useAssessment();

  // Find submission or default to first
  const sub = submissions.find(s => s.id === id) || submissions[0];

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [auditDecision, setAuditDecision] = useState(sub.status);
  const [actionSuccess, setActionSuccess] = useState(null);

  const timeline = sub.telemetryTimeline && sub.telemetryTimeline.length > 0 ? sub.telemetryTimeline : [
    { time: "00:00", rep: 0, elbowAngle: 175, state: "READY", cadence: 0.0, confidence: 0.98 },
    { time: "00:02", rep: 1, elbowAngle: 84, state: "DOWN", cadence: 1.7, confidence: 0.96 },
    { time: "00:04", rep: 2, elbowAngle: 172, state: "UP", cadence: 1.8, confidence: 0.97 },
    { time: "00:06", rep: 3, elbowAngle: 86, state: "DOWN", cadence: 1.8, confidence: 0.95 },
    { time: "00:08", rep: 4, elbowAngle: 174, state: "UP", cadence: 1.8, confidence: 0.96 }
  ];

  const currentFrame = timeline[activeFrameIndex];

  const handleAuditAction = (newStatus, reason = null) => {
    updateSubmissionStatus(sub.id, newStatus, reason);
    setAuditDecision(newStatus);
    setActionSuccess(`Submission ${sub.id} status updated to ${newStatus}`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/official/submissions"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Submissions Audit Table
        </Link>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
          SAI FORENSIC AUDIT CONSOLE v1.0
        </span>
      </div>

      {/* HEADER BANNER */}
      <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold">SUBMISSION ID</span>
              <span className="font-mono text-lg font-bold text-white">{sub.id}</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                auditDecision === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                auditDecision === 'Flagged' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {auditDecision.toUpperCase()}
              </span>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-white">
              {sub.athleteName} · <span className="text-slate-400">{sub.district}, {sub.state}</span>
            </h1>
          </div>

          {/* Explicit Audit Decision Actions */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => handleAuditAction('Verified')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              MARK VERIFIED
            </button>
            <button
              onClick={() => handleAuditAction('Flagged', 'Manual SAI Official Audit Flag')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              FLAG FOR REVIEW
            </button>
          </div>
        </div>

        {/* Quick Performance Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-2">
          <div>
            <span className="text-slate-400 text-[10px] block">TEST EXERCISE</span>
            <span className="text-white font-bold text-base">{sub.exercise}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">TOTAL REPETITIONS</span>
            <span className="text-emerald-400 font-bold text-base">{sub.reps} reps</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">KHEL SCORE INDEX</span>
            <span className="text-amber-400 font-bold text-base">{sub.score} / 100</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">REPETITION CADENCE</span>
            <span className="text-slate-200 font-bold text-base">{sub.cadence} reps/sec</span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl font-mono text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
          <Link to="/athlete/history" className="text-emerald-400 hover:underline font-bold">
            Verify Status in Athlete History →
          </Link>
        </div>
      )}

      {/* FORENSIC VIDEO PLAYER & TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Video / Skeleton Player (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                FRAME-BY-FRAME POSE RECONSTRUCTION
              </span>
              <span>TIMELINE TIMESTAMP: <span className="text-emerald-400 font-bold">{currentFrame?.time}</span></span>
            </div>

            {/* Skeleton Player */}
            <div className="h-[340px] relative">
              <PoseSkeleton
                exercise={sub.exercise}
                state={currentFrame?.state}
                repCount={currentFrame?.rep}
                angle={currentFrame?.elbowAngle || currentFrame?.torsoAngle || 90}
              />
            </div>

            {/* TIMELINE SCRUB MARKERS */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                CLICK TIMELINE MARKERS TO SCRUB KEYPOINTS:
              </span>
              <div className="grid grid-cols-5 gap-2 font-mono text-xs">
                {timeline.map((item, idx) => (
                  <button
                    key={item.time}
                    onClick={() => setActiveFrameIndex(idx)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      activeFrameIndex === idx
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="block text-[10px] text-slate-500">{item.time}</span>
                    <span className="block font-bold">{item.state}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Forensic Integrity Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-5 font-mono text-xs">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 pb-3 border-b border-slate-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              CRYPTOGRAPHIC EVIDENCE LOGS
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-slate-400 text-[10px] block mb-1">SHA-256 VIDEO FINGERPRINT</span>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-[10px] text-emerald-400 break-all">
                  {sub.videoHash}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block mb-1">RECORDING DEVICE SIGNATURE</span>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  {sub.device}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block mb-1">CAPTURE GPS COORDINATES</span>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {sub.gpsLocation}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block mb-1">RECORDED TIMESTAMP</span>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {sub.timestamp}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
