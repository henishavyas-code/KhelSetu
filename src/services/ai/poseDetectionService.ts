import { PoseKeypoint } from '../../types';

export interface PoseFrame {
  keypoints: PoseKeypoint[];
  timestampMs: number;
}

export class PoseDetectionService {
  private isInitialized = false;

  async initialize(): Promise<boolean> {
    // Abstraction layer for MediaPipe / TensorFlow.js / ONNX pose detectors
    this.isInitialized = true;
    return true;
  }

  detectFrame(videoElement: HTMLVideoElement, timestampMs: number): PoseFrame | null {
    if (!this.isInitialized || !videoElement || videoElement.readyState < 2) {
      return null;
    }

    // Return current video time-stamped pose frame abstraction
    // In production, this calls MediaPipe Pose Landmarker detectForVideo(videoElement, timestampMs)
    return {
      keypoints: [],
      timestampMs
    };
  }

  drawPoseOverlay(
    ctx: CanvasRenderingContext2D,
    keypoints: PoseKeypoint[],
    width: number,
    height: number,
    jointAngle?: number,
    feedbackText?: string
  ) {
    ctx.clearRect(0, 0, width, height);

    if (!keypoints || keypoints.length === 0) return;

    // Draw connection lines
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;

    // Draw points
    keypoints.forEach((kp) => {
      ctx.beginPath();
      ctx.arc(kp.x * width, kp.y * height, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#22C55E';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
    });

    if (jointAngle !== undefined) {
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#10B981';
      ctx.fillText(`ANGLE: ${jointAngle}°`, 20, 40);
    }

    if (feedbackText) {
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = '#A3E635';
      ctx.fillText(feedbackText, 20, 70);
    }
  }
}

export const poseDetectionService = new PoseDetectionService();
