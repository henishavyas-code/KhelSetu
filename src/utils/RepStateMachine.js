import { calculate3PointAngle, calculateAngularVelocity, smoothAngle, calculateLandmarkConfidence } from './angleUtils';

/**
 * KHELSETU REAL-TIME POSE STATE MACHINE
 * Supports Standard Assessments:
 * 1. Push-Ups (READY, DOWN, MOVING UP, UP, MOVING DOWN)
 * 2. Squats (STANDING, DESCENDING, BOTTOM, ASCENDING)
 * 3. Jumping Jacks (CLOSED, OPEN)
 */
export class RepStateMachine {
  constructor(exerciseType = 'Push-Ups') {
    this.setExercise(exerciseType);
  }

  normalizeExerciseName(type) {
    if (!type) return 'Push-Ups';
    const lower = type.toLowerCase().replace(/[^a-z]/g, '');
    if (lower.includes('squat')) return 'Squats';
    if (lower.includes('jack')) return 'Jumping Jacks';
    return 'Push-Ups';
  }

  setExercise(exerciseType) {
    this.exerciseType = this.normalizeExerciseName(exerciseType);
    this.reset();
  }

  reset() {
    this.state = 'CALIBRATING';
    this.reps = 0;
    this.validReps = 0;
    this.calibrationFrameCount = 0;
    this.requiredCalibrationFrames = 10;
    
    this.smoothedAngle = null;
    this.lastAngle = null;
    this.lastTimestamp = null;
    this.currentVelocity = 0.0;
    
    this.phaseStartAngle = null;
    this.phaseStartTime = null;
    this.minDisplacementDeg = 40.0;
    this.minVelocityThreshold = 15.0;
    
    this.repLogs = [];
    this.formAccuracies = [];
    this.lastRepTimestamp = 0;
    this.minRepCooldownMs = 700;
    this.feedback = 'Position body inside camera frame';
  }

  processLandmarks(landmarks, now = Date.now()) {
    // 1. NO ATHLETE DETECTION GATE
    if (!landmarks || landmarks.length < 27) {
      this.state = 'NO_ATHLETE';
      this.calibrationFrameCount = 0;
      return {
        detected: false,
        message: 'NO ATHLETE DETECTED - Position yourself inside the camera frame',
        reps: this.reps,
        validReps: this.validReps,
        angle: this.smoothedAngle || 180,
        velocity: 0,
        state: 'NO ATHLETE',
        confidence: 0,
        formAccuracy: this.getAverageFormAccuracy(),
        assessmentQuality: 'INSUFFICIENT',
        cadence: this.calculateCadence(),
        repLogs: this.repLogs,
        feedback: 'Position full body in frame'
      };
    }

    // Determine primary side confidence
    const leftConf = calculateLandmarkConfidence(landmarks, [11, 13, 15, 23, 25, 27]);
    const rightConf = calculateLandmarkConfidence(landmarks, [12, 14, 16, 24, 26, 28]);
    const isLeft = leftConf >= rightConf;
    const confidence = Math.max(leftConf, rightConf);

    // 2. POSE QUALITY & CALIBRATION CHECK
    if (confidence < 0.55) {
      this.state = 'CALIBRATING';
      this.calibrationFrameCount = 0;
      return {
        detected: false,
        message: 'POSE LOST - Ensure good lighting and unobstructed camera view',
        reps: this.reps,
        validReps: this.validReps,
        angle: this.smoothedAngle || 180,
        velocity: 0,
        state: 'POSE LOST',
        confidence: Math.round(confidence * 100),
        formAccuracy: this.getAverageFormAccuracy(),
        assessmentQuality: 'INSUFFICIENT',
        cadence: this.calculateCadence(),
        repLogs: this.repLogs,
        feedback: 'Adjust lighting or camera distance'
      };
    }

    if (this.calibrationFrameCount < this.requiredCalibrationFrames) {
      this.calibrationFrameCount++;
      this.state = 'CALIBRATING';
      return {
        detected: true,
        message: `✓ Full body detected (${this.calibrationFrameCount}/${this.requiredCalibrationFrames})`,
        reps: this.reps,
        validReps: this.validReps,
        angle: 180,
        velocity: 0,
        state: 'CALIBRATING',
        confidence: Math.round(confidence * 100),
        formAccuracy: 92,
        assessmentQuality: 'GOOD',
        cadence: 0.0,
        repLogs: this.repLogs,
        feedback: 'Hold steady for camera calibration'
      };
    }

    let repIncremented = false;
    let targetIndices = [];
    let angle = 180;
    let feedback = 'Good form';

    // ---------------------------------------------------------
    // 3A. PUSH-UPS DETECTION (READY, DOWN, MOVING UP, UP, MOVING DOWN)
    // ---------------------------------------------------------
    if (this.exerciseType === 'Push-Ups') {
      const shoulder = isLeft ? landmarks[11] : landmarks[12];
      const elbow = isLeft ? landmarks[13] : landmarks[14];
      const wrist = isLeft ? landmarks[15] : landmarks[16];
      const hip = isLeft ? landmarks[23] : landmarks[24];
      const ankle = isLeft ? landmarks[27] : landmarks[28];

      const elbowAngle = calculate3PointAngle(shoulder, elbow, wrist);
      const bodyAngle = calculate3PointAngle(shoulder, hip, ankle); // Alignment check
      
      this.smoothedAngle = smoothAngle(elbowAngle, this.smoothedAngle, 0.35);
      angle = this.smoothedAngle;

      targetIndices = isLeft ? [11, 13, 15, 23, 27] : [12, 14, 16, 24, 28];

      // Form posture check
      const isBodyAligned = bodyAngle >= 145 && bodyAngle <= 195;
      if (!isBodyAligned) {
        feedback = 'Keep your hips aligned with your shoulders';
      } else if (angle <= 95) {
        feedback = 'Good depth - press back up';
      } else {
        feedback = 'Go slightly deeper on the push-up';
      }

      // State Transitions
      if (angle >= 150) {
        if (this.state === 'MOVING UP' || this.state === 'DOWN') {
          if (now - this.lastRepTimestamp > this.minRepCooldownMs) {
            const rangeOfMotion = this.phaseStartAngle ? Math.round(Math.abs(this.phaseStartAngle - angle)) : 65;
            const isFullDepth = rangeOfMotion >= this.minDisplacementDeg;
            const formQuality = isBodyAligned ? Math.round(confidence * 96) : 78;

            this.reps += 1;
            if (isFullDepth && isBodyAligned) this.validReps += 1;
            this.lastRepTimestamp = now;

            this.repLogs.push({
              repNumber: this.reps,
              rangeOfMotion,
              durationSec: Number(((now - (this.phaseStartTime || now)) / 1000).toFixed(1)),
              formQuality,
              validity: isFullDepth && isBodyAligned ? 'VALID' : 'PARTIAL'
            });
            this.formAccuracies.push(formQuality);
            repIncremented = true;
          }
        }
        this.state = 'UP';
        this.phaseStartAngle = angle;
        this.phaseStartTime = now;
      } else if (angle <= 95) {
        this.state = 'DOWN';
      } else {
        if (this.state === 'UP' || this.state === 'MOVING DOWN') {
          this.state = 'MOVING DOWN';
        } else if (this.state === 'DOWN' || this.state === 'MOVING UP') {
          this.state = 'MOVING UP';
        }
      }
    }

    // ---------------------------------------------------------
    // 3B. SQUATS DETECTION (STANDING, DESCENDING, BOTTOM, ASCENDING)
    // ---------------------------------------------------------
    else if (this.exerciseType === 'Squats') {
      const hip = isLeft ? landmarks[23] : landmarks[24];
      const knee = isLeft ? landmarks[25] : landmarks[26];
      const ankle = isLeft ? landmarks[27] : landmarks[28];
      const shoulder = isLeft ? landmarks[11] : landmarks[12];

      const kneeAngle = calculate3PointAngle(hip, knee, ankle);
      const torsoAngle = calculate3PointAngle(shoulder, hip, knee);

      this.smoothedAngle = smoothAngle(kneeAngle, this.smoothedAngle, 0.35);
      angle = this.smoothedAngle;

      targetIndices = isLeft ? [11, 23, 25, 27] : [12, 24, 26, 28];

      const isChestUpright = torsoAngle >= 75;
      if (!isChestUpright) {
        feedback = 'Keep your chest upright while squatting';
      } else if (angle <= 95) {
        feedback = 'Good depth achieved';
      } else {
        feedback = 'Lower slightly further for full depth';
      }

      if (angle >= 160) {
        if (this.state === 'ASCENDING' || this.state === 'BOTTOM') {
          if (now - this.lastRepTimestamp > this.minRepCooldownMs) {
            const rangeOfMotion = this.phaseStartAngle ? Math.round(Math.abs(this.phaseStartAngle - angle)) : 70;
            const isFullDepth = rangeOfMotion >= 55;
            const formQuality = isChestUpright ? Math.round(confidence * 95) : 75;

            this.reps += 1;
            if (isFullDepth && isChestUpright) this.validReps += 1;
            this.lastRepTimestamp = now;

            this.repLogs.push({
              repNumber: this.reps,
              rangeOfMotion,
              durationSec: Number(((now - (this.phaseStartTime || now)) / 1000).toFixed(1)),
              formQuality,
              validity: isFullDepth && isChestUpright ? 'VALID' : 'PARTIAL'
            });
            this.formAccuracies.push(formQuality);
            repIncremented = true;
          }
        }
        this.state = 'STANDING';
        this.phaseStartAngle = angle;
        this.phaseStartTime = now;
      } else if (angle <= 95) {
        this.state = 'BOTTOM';
      } else {
        if (this.state === 'STANDING' || this.state === 'DESCENDING') {
          this.state = 'DESCENDING';
        } else if (this.state === 'BOTTOM' || this.state === 'ASCENDING') {
          this.state = 'ASCENDING';
        }
      }
    }

    // ---------------------------------------------------------
    // 3C. JUMPING JACKS DETECTION (CLOSED → OPEN → CLOSED)
    // ---------------------------------------------------------
    else if (this.exerciseType === 'Jumping Jacks') {
      const leftWrist = landmarks[15];
      const rightWrist = landmarks[16];
      const leftAnkle = landmarks[27];
      const rightAnkle = landmarks[28];
      const leftHip = landmarks[23];
      const rightHip = landmarks[24];
      const leftShoulder = landmarks[11];
      const rightShoulder = landmarks[12];

      const wristDistance = Math.hypot(leftWrist.x - rightWrist.x, leftWrist.y - rightWrist.y);
      const ankleDistance = Math.hypot(leftAnkle.x - rightAnkle.x, leftAnkle.y - rightAnkle.y);
      const hipDistance = Math.hypot(leftHip.x - rightHip.x, leftHip.y - rightHip.y);
      
      const armsUp = leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y;
      const legsApart = ankleDistance > hipDistance * 1.6;

      targetIndices = [11, 12, 15, 16, 23, 24, 27, 28];
      angle = Math.round(wristDistance * 100);

      const isOpen = armsUp && legsApart;

      if (isOpen) {
        feedback = 'Good arm extension and leg separation';
      } else {
        feedback = 'Extend arms fully upward and separate feet';
      }

      if (!isOpen && this.state === 'OPEN') {
        if (now - this.lastRepTimestamp > 500) {
          const formQuality = Math.round(confidence * 95);
          this.reps += 1;
          this.validReps += 1;
          this.lastRepTimestamp = now;

          this.repLogs.push({
            repNumber: this.reps,
            rangeOfMotion: 90,
            durationSec: 1.0,
            formQuality,
            validity: 'VALID'
          });
          this.formAccuracies.push(formQuality);
          repIncremented = true;
        }
        this.state = 'CLOSED';
      } else if (isOpen) {
        this.state = 'OPEN';
      }
    }

    return {
      detected: true,
      message: `${this.exerciseType.toUpperCase()} ASSESSMENT ACTIVE`,
      reps: this.reps,
      validReps: this.validReps,
      angle: angle,
      velocity: this.currentVelocity,
      state: this.state,
      confidence: Math.round(confidence * 100),
      formAccuracy: this.getAverageFormAccuracy(),
      assessmentQuality: this.getAssessmentQuality(confidence),
      cadence: this.calculateCadence(),
      repIncremented,
      activeJoints: targetIndices,
      repLogs: this.repLogs,
      feedback: feedback
    };
  }

  getAverageFormAccuracy() {
    if (this.formAccuracies.length === 0) return 90;
    const sum = this.formAccuracies.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.formAccuracies.length);
  }

  getAssessmentQuality(confidence = 0.9) {
    if (confidence >= 0.85) return 'HIGH';
    if (confidence >= 0.70) return 'GOOD';
    return 'STANDARD';
  }

  calculateCadence() {
    if (this.repLogs.length < 2) return 0.0;
    const recentLogs = this.repLogs.slice(-4);
    const totalDurationSec = recentLogs.reduce((acc, r) => acc + (r.durationSec || 1), 0);
    if (totalDurationSec <= 0) return 0.0;
    return Number((recentLogs.length / totalDurationSec).toFixed(1));
  }
}
