import React, { useRef, useEffect } from 'react';

// MediaPipe 33 Landmark Skeleton Connections
const POSE_CONNECTIONS = [
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Upper body
  [11, 23], [12, 24], [23, 24],                    // Torso
  [23, 25], [25, 27], [24, 26], [26, 28]             // Lower body
];

export const PoseOverlayCanvas = ({
  landmarks = null,
  exercise = 'Sit-up',
  angle = 180,
  movementState = 'READY',
  activeJoints = []
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (!landmarks || landmarks.length === 0) return;

    // Draw connecting bones
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    POSE_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const p1 = landmarks[startIdx];
      const p2 = landmarks[endIdx];
      if (p1 && p2 && (p1.visibility ?? 0.8) > 0.5 && (p2.visibility ?? 0.8) > 0.5) {
        ctx.beginPath();
        ctx.moveTo(p1.x * width, p1.y * height);
        ctx.lineTo(p2.x * width, p2.y * height);
        
        // Highlight active joint limbs in vibrant emerald green
        const isActiveLimb = activeJoints.includes(startIdx) && activeJoints.includes(endIdx);
        ctx.strokeStyle = isActiveLimb ? '#10B981' : 'rgba(56, 189, 248, 0.6)';
        ctx.stroke();
      }
    });

    // Draw Landmark Keypoints
    landmarks.forEach((lm, idx) => {
      if (!lm || (lm.visibility ?? 0.8) < 0.5) return;
      const x = lm.x * width;
      const y = lm.y * height;

      const isActive = activeJoints.includes(idx);
      const radius = isActive ? 7 : 4;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isActive ? '#10B981' : '#07090E';
      ctx.strokeStyle = isActive ? '#F59E0B' : '#38BDF8';
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.fill();
      ctx.stroke();
    });

    // Draw Angle Arc Callout over primary joint
    if (activeJoints.length >= 2) {
      const vertexIdx = activeJoints[1]; // Middle joint (Hip for Sit-up, Elbow for Push-up)
      const vertexLm = landmarks[vertexIdx];
      if (vertexLm) {
        const vx = vertexLm.x * width;
        const vy = vertexLm.y * height;

        // Angle Pill Callout Box
        ctx.fillStyle = 'rgba(11, 15, 23, 0.9)';
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 1.5;
        const boxWidth = 80;
        const boxHeight = 28;
        const boxX = vx + 15;
        const boxY = vy - 14;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#F59E0B';
        ctx.fillText(`${Math.round(angle)}°`, boxX + 10, boxY + 18);
      }
    }

  }, [landmarks, exercise, angle, movementState, activeJoints]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
    />
  );
};
