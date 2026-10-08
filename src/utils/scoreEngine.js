// KHELSETU PROTOTYPE SCORE ENGINE
export const calculateKhelScoreEngine = ({ reps = 0, formAccuracy = 92, cadence = 1.8 }) => {
  // 1. Movement Quality Score (40% weight)
  const movementQuality = Math.min(100, Math.max(50, formAccuracy));

  // 2. Repetition Performance (25% weight)
  // Benchmark target: 35 reps = 100%
  const repRatio = Math.min(1.0, reps / 35);
  const repPerformance = Math.round(50 + (repRatio * 50));

  // 3. Movement Consistency (20% weight)
  // Optimal cadence: 1.5 - 2.2 reps/sec
  const cadenceDiff = Math.abs(cadence - 1.8);
  const consistency = Math.max(60, Math.round(95 - (cadenceDiff * 20)));

  // 4. Movement Control / Stability (15% weight)
  const control = Math.round(movementQuality * 0.95);

  // Overall Weighted Score
  const rawScore = (movementQuality * 0.40) + (repPerformance * 0.25) + (consistency * 0.20) + (control * 0.15);
  const khelScore = Number(rawScore.toFixed(1));

  return {
    khelScore,
    breakdown: {
      movementQuality,
      repPerformance,
      consistency,
      control
    }
  };
};
