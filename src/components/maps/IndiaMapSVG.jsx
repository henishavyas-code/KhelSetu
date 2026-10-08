import React, { useState } from 'react';
import { MapPin, Activity, ShieldCheck } from 'lucide-react';

export const IndiaMapSVG = () => {
  const [selectedRegion, setSelectedRegion] = useState({
    name: 'Gujarat',
    district: 'Kheda',
    assessments: 4842,
    athletes: 1842,
    topScore: 87.4,
    status: 'ACTIVE TELEMETRY'
  });

  const regions = [
    { name: 'Gujarat', district: 'Kheda', x: 120, y: 220, assessments: 4842, athletes: 1842, topScore: 87.4 },
    { name: 'Rajasthan', district: 'Jaipur', x: 150, y: 170, assessments: 3126, athletes: 1126, topScore: 85.2 },
    { name: 'Bihar', district: 'Patna', x: 260, y: 190, assessments: 3808, athletes: 1408, topScore: 82.5 },
    { name: 'Odisha', district: 'Bhubaneswar', x: 270, y: 240, assessments: 2986, athletes: 986, topScore: 86.8 },
    { name: 'Assam', district: 'Guwahati', x: 330, y: 170, assessments: 2742, athletes: 742, topScore: 84.1 },
    { name: 'Maharashtra', district: 'Pune', x: 160, y: 270, assessments: 2410, athletes: 920, topScore: 83.0 }
  ];

  return (
    <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1 block">
            DISTRICT TELEMETRY MAP · DEMO DATA
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            FROM THE FIELD. TO THE FUTURE.
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Live Signals Active</span>
          </div>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            DEMO DATASET
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* SVG India Geometric Map Visual */}
        <div className="lg:col-span-7 relative h-[380px] bg-[#07090E] rounded-xl border border-slate-800 flex items-center justify-center p-4">
          
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

          <svg className="w-full h-full max-h-[350px]" viewBox="0 0 400 400">
            {/* Abstract India Outline Contour (Stylized Poly Vector) */}
            <path
              d="M 160,60 L 220,50 L 240,90 L 310,120 L 370,160 L 330,200 L 280,200 L 280,260 L 230,340 L 190,380 L 170,300 L 130,280 L 100,240 L 80,210 L 130,190 L 140,130 Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Connecting Telemetry Lines */}
            {regions.map((r, i) => (
              <g key={r.name}>
                <line
                  x1={r.x}
                  y1={r.y}
                  x2={regions[(i + 1) % regions.length].x}
                  y2={regions[(i + 1) % regions.length].y}
                  stroke="rgba(16, 185, 129, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </g>
            ))}

            {/* Regional Node Points */}
            {regions.map((r) => {
              const isSelected = selectedRegion.name === r.name;
              return (
                <g
                  key={r.name}
                  onClick={() => setSelectedRegion({ ...r, status: 'ACTIVE TELEMETRY' })}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse */}
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r={isSelected ? 16 : 10}
                    fill={isSelected ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r={isSelected ? 7 : 4}
                    fill={isSelected ? '#10B981' : '#FF6B00'}
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Label */}
                  <text
                    x={r.x + 12}
                    y={r.y + 4}
                    fill={isSelected ? '#10B981' : '#94A3B8'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontFamily="monospace"
                  >
                    {r.name} ({r.district})
                  </text>
                </g>
              );
            })}
          </svg>

        </div>

        {/* Selected Region Telemetry Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#07090E] border border-emerald-500/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">SELECTED DISTRICT NODE</span>
                <h4 className="font-display text-2xl font-bold text-white">{selectedRegion.district}, {selectedRegion.name}</h4>
              </div>
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block mb-1">TOTAL ASSESSMENTS</span>
                <span className="text-white text-lg font-bold">{selectedRegion.assessments.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block mb-1">ATHLETES RECORDED</span>
                <span className="text-emerald-400 text-lg font-bold">{selectedRegion.athletes.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">DISTRICT TOP SCORE</span>
              <span className="text-amber-400 font-bold text-base">{selectedRegion.topScore} KHEL SCORE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              ● Local AI mobile nodes operate offline in rural grounds of {selectedRegion.district}, queuing biometric pose datasets for automatic upload when connectivity is restored.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
