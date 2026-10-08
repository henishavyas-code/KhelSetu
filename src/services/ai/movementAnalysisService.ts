import { MovementState } from '../../types';
import { calculateJointAngle, Point2D } from '../../utils/mathUtils';

export interface MovementAnalysisResult {
  state: MovementState;
  repCompleted: boolean;
  currentAngle: number;
  formScore: number;
  feedback: string;
  paceQuality: 'GOOD' | 'FAST' | 'SLOW';
}

export class MovementAnalysisService {
  private currentState: MovementState = 'IDLE';
  private repCount = 0;
  private minAngleAchieved = 180;
  private lastRepTimestamp = 0;
  private formScoreAccumulator: number[] = [];

  reset() {
    this.currentState = 'IDLE';
    this.repCount = 0;
    this.minAngleAchieved = 180;
    this.lastRepTimestamp = 0;
    this.formScoreAccumulator = [];
  }

  analyzePushupFrame(
    shoulder: Point2D,
    elbow: Point2D,
    wrist: Point2D,
    hip: Point2D,
    timestampMs: number
  ): MovementAnalysisResult {
    const elbowAngle = calculateJointAngle(shoulder, elbow, wrist);
    const hipAngle = calculateJointAngle(shoulder, hip, { x: hip.x, y: hip.y + 0.3 }); // Back alignment proxy

    let repCompleted = false;
    let feedback = 'Keep posture steady';
    let formScore = 85;

    // Form evaluation
    if (hipAngle < 155) {
      feedback = 'Keep your back straight';
      formScore -= 15;
    } else {
      feedback = 'Good posture';
    }

    // State machine transitions
    if (this.currentState === 'IDLE' || this.currentState === 'GET_READY') {
      if (elbowAngle > 150) {
        this.currentState = 'START';
        feedback = 'Begin exercise';
      }
    } else if (this.currentState === 'START' || this.currentState === 'UP') {
      if (elbowAngle < 100) {
        this.currentState = 'DOWN';
        this.minAngleAchieved = elbowAngle;
        feedback = 'Going down...';
      }
    } else if (this.currentState === 'DOWN') {
      if (elbowAngle < this.minAngleAchieved) {
        this.minAngleAchieved = elbowAngle;
      }

      if (elbowAngle < 90) {
        feedback = 'Good depth!';
      } else {
        feedback = 'Go deeper';
      }

      if (elbowAngle > 150) {
        // Rep completed!
        this.currentState = 'UP';
        this.repCount++;
        repCompleted = true;

        const duration = (timestampMs - this.lastRepTimestamp) / 1000;
        this.lastRepTimestamp = timestampMs;

        if (this.minAngleAchieved <= 90) {
          formScore += 10;
          feedback = 'Excellent repetition!';
        } else {
          feedback = 'Push up complete. Try deeper next rep.';
        }

        this.formScoreAccumulator.push(formScore);
      }
    }

    let paceQuality: 'GOOD' | 'FAST' | 'SLOW' = 'GOOD';

    return {
      state: this.currentState,
      repCompleted,
      currentAngle: elbowAngle,
      formScore: Math.max(50, Math.min(100, formScore)),
      feedback,
      paceQuality
    };
  }

  analyzeSquatFrame(
    hip: Point2D,
    knee: Point2D,
    ankle: Point2D,
    shoulder: Point2D,
    timestampMs: number
  ): MovementAnalysisResult {
    const kneeAngle = calculateJointAngle(hip, knee, ankle);
    let repCompleted = false;
    let feedback = 'Stand tall to start';
    let formScore = 88;

    if (this.currentState === 'IDLE' || this.currentState === 'START') {
      if (kneeAngle < 140) {
        this.currentState = 'DOWN';
        this.minAngleAchieved = kneeAngle;
        feedback = 'Descending...';
      }
    } else if (this.currentState === 'DOWN') {
      if (kneeAngle < this.minAngleAchieved) {
        this.minAngleAchieved = kneeAngle;
      }

      if (kneeAngle <= 95) {
        feedback = 'Deep squat reached!';
      } else {
        feedback = 'Go deeper below knees';
      }

      if (kneeAngle > 160) {
        this.currentState = 'START';
        this.repCount++;
        repCompleted = true;
        feedback = 'Great squat!';
        this.formScoreAccumulator.push(formScore);
      }
    }

    return {
      state: this.currentState,
      repCompleted,
      currentAngle: kneeAngle,
      formScore,
      feedback,
      paceQuality: 'GOOD'
    };
  }
}

export const movementAnalysisService = new MovementAnalysisService();
