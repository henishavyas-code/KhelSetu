import { useState, useEffect, useRef, useCallback } from 'react';
import { Assessment, AssessmentResult, MovementState } from '../types';
import { movementAnalysisService } from '../services/ai/movementAnalysisService';
import { scoringService } from '../services/ai/scoringService';
import { assessmentService } from '../services/assessmentService';

export function useAssessment(assessment: Assessment | null) {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [repsCount, setRepsCount] = useState(0);
  const [currentFormScore, setCurrentFormScore] = useState(85);
  const [movementState, setMovementState] = useState<MovementState>('IDLE');
  const [feedback, setFeedback] = useState('Position yourself in frame');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const timerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play audio beep when rep completes
  const playRepBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  const startAssessment = useCallback(() => {
    movementAnalysisService.reset();
    setIsStarted(true);
    setIsPaused(false);
    setIsCompleted(false);
    setElapsedSeconds(0);
    setRepsCount(0);
    setCurrentFormScore(88);
    setMovementState('START');
    setFeedback('Get ready to begin!');
    setResult(null);
  }, []);

  const pauseAssessment = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAssessment = useCallback(() => {
    setIsPaused(false);
  }, []);

  const finishAssessment = useCallback(async () => {
    if (!assessment) return;
    setIsStarted(false);
    setIsCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const calculatedResult = scoringService.calculateResult(
      assessment.id,
      assessment.title,
      'ath-profile-cur',
      repsCount,
      assessment.targetReps,
      currentFormScore,
      []
    );

    setResult(calculatedResult);
    await assessmentService.saveAttempt(calculatedResult.attempt);
  }, [assessment, repsCount, currentFormScore]);

  // Timer loop
  useEffect(() => {
    if (isStarted && !isPaused && !isCompleted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          if (assessment && next >= assessment.durationSeconds) {
            finishAssessment();
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused, isCompleted, assessment, finishAssessment]);

  // Simulation pulse for rep processing during camera view
  const processFrameData = useCallback((keypoints: any[]) => {
    if (!isStarted || isPaused || isCompleted || !assessment) return;

    // Call movement analysis engine
    // For demo/simulated posture movements when video active
    const simulatedAngle = Math.floor(80 + Math.random() * 90);
    setMovementState('DOWN');
    setCurrentFormScore(Math.floor(82 + Math.random() * 12));
  }, [isStarted, isPaused, isCompleted, assessment]);

  const incrementRepManual = useCallback(() => {
    setRepsCount((prev) => {
      const next = prev + 1;
      playRepBeep();
      setFeedback(`Excellent repetition! (${next}/${assessment?.targetReps || 25})`);
      return next;
    });
  }, [assessment, playRepBeep]);

  return {
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
    processFrameData,
    incrementRepManual
  };
}
