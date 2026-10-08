import React, { useEffect, useRef } from 'react';
import { Assessment } from '../../types';
import { useCamera } from '../../hooks/useCamera';
import { useAssessment } from '../../hooks/useAssessment';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatSecondsToMMSS } from '../../utils/formatters';
import {
  Camera,
  CameraOff,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Activity,
  ShieldCheck,
  Zap,
  Volume2
} from 'lucide-react';

export interface CameraAssessmentViewProps {
  assessment: Assessment;
  onFinish: () => void;
  onCancel: () => void;
}

export const CameraAssessmentView: React.FC<CameraAssessmentViewProps> = ({
  assessment,
  onFinish,
  onCancel
}) => {
  const { videoRef, cameraState, startCamera, stopCamera } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    isStarted,
    isPaused,
    isCompleted,
    elapsedSeconds,
    repsCount,
    currentFormScore,
    movementState,
    feedback,
    result,
    startAssessment,
    pauseAssessment,
    resumeAssessment,
    finishAssessment,
    incrementRepManual
  } = useAssessment(assessment);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Canvas pose keypoint animation frame loop
  useEffect(() => {
    let animationFrameId: number;

    const renderOverlay = () => {
      if (canvasRef.current && videoRef.current && cameraState.isStreaming) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const w = canvasRef.current.width;
          const h = canvasRef.current.height;
          ctx.clearRect(0, 0, w, h);

          if (isStarted && !isPaused) {
            // Draw simulated biometric skeleton line overlays on video feed
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth = 3;
            ctx.fillStyle = '#22C55E';

            // Keypoints
            const points = [
              { x: w * 0.5, y: h * 0.25 }, // Head
              { x: w * 0.42, y: h * 0.38 }, // L Shoulder
              { x: w * 0.58, y: h * 0.38 }, // R Shoulder
              { x: w * 0.38, y: h * 0.52 }, // L Elbow
              { x: w * 0.62, y: h * 0.52 }, // R Elbow
              { x: w * 0.35, y: h * 0.65 }, // L Wrist
              { x: w * 0.65, y: h * 0.65 }, // R Wrist
              { x: w * 0.45, y: h * 0.60 }, // L Hip
              { x: w * 0.55, y: h * 0.60 }, // R Hip
              { x: w * 0.44, y: h * 0.78 }, // L Knee
              { x: w * 0.56, y: h * 0.78 }, // R Knee
              { x: w * 0.43, y: h * 0.92 }, // L Ankle
              { x: w * 0.57, y: h * 0.92 }  // R Ankle
            ];

            points.forEach((p) => {
              ctx.beginPath();
              ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
              ctx.fill();
              ctx.stroke();
            });

            // Lines
            ctx.beginPath();
            ctx.moveTo(points[1].x, points[1].y);
            ctx.lineTo(points[2].x, points[2].y);
            ctx.lineTo(points[8].x, points[8].y);
            ctx.lineTo(points[7].x, points[7].y);
            ctx.closePath();
            ctx.stroke();

            // Draw arms
            ctx.beginPath();
            ctx.moveTo(points[1].x, points[1].y);
            ctx.lineTo(points[3].x, points[3].y);
            ctx.lineTo(points[5].x, points[5].y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(points[2].x, points[2].y);
            ctx.lineTo(points[4].x, points[4].y);
            ctx.lineTo(points[6].x, points[6].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderOverlay);
    };

    renderOverlay();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cameraState.isStreaming, isStarted, isPaused, videoRef]);

  const handleFinishAndSave = () => {
    finishAssessment();
    onFinish();
  };

  return (
    <div className="relative min-h-[85vh] bg-[#07090E] rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
      {/* Top Telemetry Header Bar */}
      <div className="bg-[#0D1117]/90 backdrop-blur-md p-4 border-b border-slate-800/80 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h3 className="text-base font-bold text-white font-display">{assessment.title}</h3>
            <span className="text-[11px] text-slate-400 font-medium">AI Pose & Movement Telemetry</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#11161E] border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">AI STATUS:</span>
            <span className="text-emerald-400 font-mono">
              {cameraState.isStreaming ? 'TRACKING' : 'READY'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#11161E] border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-white">
            <span>TIMER:</span>
            <span className="text-emerald-400 text-sm">
              {formatSecondsToMMSS(assessment.durationSeconds - elapsedSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Camera Stream / Overlay Container */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[460px]">
        {cameraState.hasPermission === false ? (
          <div className="p-8 text-center max-w-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <CameraOff className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Camera Permission Required</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Camera access was denied or unavailable. Please enable your camera permissions in browser settings, or use manual rep verification mode below.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => startCamera()}>
                Retry Camera
              </Button>
              <Button variant="primary" size="sm" onClick={startAssessment}>
                Start Manual Mode
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* HTML5 Live Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />

            {/* Pose Overlay Canvas */}
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100"
            />

            {/* Live Telemetry Heads-Up Display (HUD) */}
            {isStarted && (
              <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                {/* Top Overlay Indicators */}
                <div className="flex justify-between items-start">
                  {/* Rep Counter Box */}
                  <div className="bg-[#07090E]/85 backdrop-blur-md border border-emerald-500/40 p-4 rounded-xl shadow-2xl space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                      REPETITIONS
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-4xl text-emerald-400 tracking-tight font-mono">
                        {repsCount.toString().padStart(2, '0')}
                      </span>
                      <span className="text-sm font-bold text-slate-400 font-mono">
                        / {assessment.targetReps}
                      </span>
                    </div>
                  </div>

                  {/* Live Form Score & Pace */}
                  <div className="bg-[#07090E]/85 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl space-y-2 text-right">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                        FORM RATING
                      </span>
                      <span className="font-display font-black text-2xl text-lime-400 font-mono">
                        {currentFormScore}%
                      </span>
                    </div>
                    <Badge variant="emerald">PACE: GOOD</Badge>
                  </div>
                </div>

                {/* Bottom Real-time AI Feedback Banner */}
                <div className="bg-[#07090E]/90 backdrop-blur-md border border-emerald-500/50 p-4 rounded-xl shadow-2xl max-w-lg mx-auto w-full flex items-center justify-between gap-4 animate-bounce-short">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                        AI LIVE FEEDBACK
                      </span>
                      <p className="text-sm font-bold text-white font-display">{feedback}</p>
                    </div>
                  </div>

                  {/* Manual rep count boost button for demo flexibility */}
                  <button
                    onClick={incrementRepManual}
                    className="pointer-events-auto bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
                  >
                    + Log Rep
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-[#0D1117] p-4 border-t border-slate-800/80 flex items-center justify-between z-20">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Exit
        </Button>

        <div className="flex items-center gap-3">
          {!isStarted ? (
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play className="w-5 h-5 fill-current" />}
              onClick={startAssessment}
            >
              Start Recording & Test
            </Button>
          ) : isPaused ? (
            <Button
              variant="primary"
              size="md"
              leftIcon={<Play className="w-4 h-4 fill-current" />}
              onClick={resumeAssessment}
            >
              Resume Test
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Pause className="w-4 h-4" />}
              onClick={pauseAssessment}
            >
              Pause
            </Button>
          )}

          {isStarted && (
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleFinishAndSave}
            >
              Complete & View Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
