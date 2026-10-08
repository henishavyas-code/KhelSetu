import React from 'react';

export const PoseSkeleton = ({ exercise = 'Push-up', state = 'READY', repCount = 0, angle = 90 }) => {
  // Trigonometric coordinate mapping based on exercise & angle
  // Angle parameter (0 to 180 deg) controls joint flex
  const flexRatio = Math.max(0, Math.min(1, (180 - angle) / 90)); // 0 = straight/up, 1 = deep flex/down

  // Push-up pose points (horizontal profile view)
  const pushupPoints = {
    head: { x: 320, y: 150 + flexRatio * 50 },
    neck: { x: 290, y: 170 + flexRatio * 45 },
    shoulder: { x: 270, y: 180 + flexRatio * 45 },
    elbow: { x: 270 - flexRatio * 30, y: 220 + flexRatio * 20 },
    wrist: { x: 270 - flexRatio * 20, y: 260 },
    hip: { x: 180, y: 190 + flexRatio * 20 },
    knee: { x: 110, y: 200 + flexRatio * 15 },
    ankle: { x: 40, y: 210 + flexRatio * 10 }
  };

  // Sit-up pose points (side profile view flexed at hips)
  const situpPoints = {
    head: { x: 120 + (1 - flexRatio) * 120, y: 260 - (1 - flexRatio) * 110 },
    neck: { x: 140 + (1 - flexRatio) * 100, y: 250 - (1 - flexRatio) * 90 },
    shoulder: { x: 160 + (1 - flexRatio) * 80, y: 240 - (1 - flexRatio) * 75 },
    elbow: { x: 140 + (1 - flexRatio) * 70, y: 210 - (1 - flexRatio) * 60 },
    wrist: { x: 180 + (1 - flexRatio) * 60, y: 200 - (1 - flexRatio) * 50 },
    hip: { x: 240, y: 260 },
    knee: { x: 280, y: 200 },
    ankle: { x: 330, y: 260 }
  };

  const pts = exercise === 'Push-up' ? pushupPoints : situpPoints;

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#07090E] rounded-xl overflow-hidden border border-emerald-500/20">
      
      {/* Biometric Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

      {/* Radar Scanline Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 animate-radar pointer-events-none"></div>

      {/* Angle Data Callout Overlay */}
      <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono backdrop-blur-md z-10 flex flex-col gap-0.5">
        <span className="text-slate-400 text-[10px] uppercase">Joint Telemetry Angle</span>
        <span className="text-emerald-400 font-bold text-sm">{Math.round(angle)}°</span>
      </div>

      <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono backdrop-blur-md z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-slate-300">CONFIDENCE: <span className="text-emerald-400 font-bold">96.4%</span></span>
      </div>

      {/* Vector Keypoint SVG Skeleton */}
      <svg className="w-full h-[320px] max-w-[420px] relative z-0" viewBox="0 0 400 300">
        
        {/* Ground Reference Plane */}
        <line x1="20" y1="265" x2="380" y2="265" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
        <text x="340" y="282" fill="#64748B" fontSize="10" fontFamily="monospace">GROUND PLANE</text>

        {/* Vector Bones / Limbs */}
        <g stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">
          {/* Head to Neck */}
          <line x1={pts.head.x} y1={pts.head.y} x2={pts.neck.x} y2={pts.neck.y} />
          {/* Spine (Neck to Hip) */}
          <line x1={pts.neck.x} y1={pts.neck.y} x2={pts.hip.x} y2={pts.hip.y} />
          {/* Shoulder to Elbow */}
          <line x1={pts.shoulder.x} y1={pts.shoulder.y} x2={pts.elbow.x} y2={pts.elbow.y} />
          {/* Elbow to Wrist */}
          <line x1={pts.elbow.x} y1={pts.elbow.y} x2={pts.wrist.x} y2={pts.wrist.y} stroke="#38BDF8" />
          {/* Hip to Knee */}
          <line x1={pts.hip.x} y1={pts.hip.y} x2={pts.knee.x} y2={pts.knee.y} />
          {/* Knee to Ankle */}
          <line x1={pts.knee.x} y1={pts.knee.y} x2={pts.ankle.x} y2={pts.ankle.y} />
        </g>

        {/* Joint Keypoint Nodes */}
        <g fill="#07090E" stroke="#10B981" strokeWidth="3">
          {/* Head circle */}
          <circle cx={pts.head.x} cy={pts.head.y} r="14" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
          <circle cx={pts.head.x} cy={pts.head.y} r="4" fill="#10B981" />

          {/* Key joints */}
          <circle cx={pts.shoulder.x} cy={pts.shoulder.y} r="6" className="joint-pulse" />
          <circle cx={pts.elbow.x} cy={pts.elbow.y} r="7" fill="#38BDF8" stroke="#38BDF8" className="drop-shadow-[0_0_6px_#38BDF8]" />
          <circle cx={pts.wrist.x} cy={pts.wrist.y} r="5" />
          <circle cx={pts.hip.x} cy={pts.hip.y} r="7" className="joint-pulse" />
          <circle cx={pts.knee.x} cy={pts.knee.y} r="6" />
          <circle cx={pts.ankle.x} cy={pts.ankle.y} r="5" />
        </g>

        {/* Dynamic Joint Angle Arc Indicator */}
        <path
          d={`M ${pts.shoulder.x} ${pts.shoulder.y} L ${pts.elbow.x} ${pts.elbow.y} L ${pts.wrist.x} ${pts.wrist.y}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        
        {/* Label for Elbow Joint */}
        <text
          x={pts.elbow.x + 12}
          y={pts.elbow.y - 8}
          fill="#F59E0B"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {Math.round(angle)}°
        </text>
      </svg>

      {/* Movement State Overlay Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-lg text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">STATE:</span>
          <span className={`font-bold px-2 py-0.5 rounded text-xs ${
            state === 'DOWN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            state === 'UP' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
            'bg-slate-800 text-slate-300'
          }`}>
            {state}
          </span>
        </div>
        <div className="text-slate-400">
          REPS: <span className="text-white font-extrabold text-sm">{repCount}</span>
        </div>
      </div>

    </div>
  );
};
