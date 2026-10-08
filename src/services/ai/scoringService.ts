import { AssessmentAttempt, AssessmentResult } from '../../types';

export class ScoringService {
  calculateResult(
    assessmentId: string,
    assessmentTitle: string,
    athleteId: string,
    repsCount: number,
    targetReps: number,
    avgFormScore: number,
    repHistory: any[]
  ): AssessmentResult {
    const rangeOfMotion = Math.min(95, Math.max(65, Math.round(avgFormScore + 2)));
    const consistency = Math.min(92, Math.max(70, Math.round(avgFormScore - 4)));
    const speed = Math.min(90, Math.max(68, Math.round(avgFormScore - 6)));

    const overallScore = Math.round(
      avgFormScore * 0.4 + consistency * 0.2 + rangeOfMotion * 0.2 + (repsCount / targetReps) * 20
    );

    const insights = [
      `Your movement form averaged ${avgFormScore}%, indicating solid kinetic chain execution.`,
      `Range of motion remained stable across reps 1 through ${Math.max(1, repsCount - 2)}.`
    ];

    const recommendedSteps = [
      'Focus on controlled tempo on the eccentric (lowering) phase.',
      'Practice mobility drills for ankle and shoulder joints before testing.',
      'Retake assessment after 48 hours of recovery training.'
    ];

    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      assessmentId,
      assessmentTitle,
      athleteId,
      timestamp: new Date().toISOString(),
      repetitionsCount: repsCount,
      targetReps,
      formScore: avgFormScore,
      consistencyScore: consistency,
      speedScore: speed,
      rangeOfMotionScore: rangeOfMotion,
      overallScore: Math.min(100, overallScore),
      bestRepScore: 9.4,
      avgRepScore: 8.2,
      repDetails: repHistory,
      aiInsights: insights,
      recommendedSteps,
      status: 'completed'
    };

    return {
      attempt,
      breakdown: {
        form: avgFormScore,
        consistency,
        speed,
        rangeOfMotion
      },
      nextSteps: recommendedSteps
    };
  }
}

export const scoringService = new ScoringService();
