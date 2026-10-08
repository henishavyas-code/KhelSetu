export interface Point2D {
  x: number;
  y: number;
}

/**
 * Calculates the interior angle (in degrees 0-180) formed at vertex Point B between segment BA and BC.
 */
export function calculateJointAngle(pA: Point2D, pB: Point2D, pC: Point2D): number {
  const radians = Math.atan2(pC.y - pB.y, pC.x - pB.x) - Math.atan2(pA.y - pB.y, pA.x - pB.x);
  let degrees = Math.abs((radians * 180.0) / Math.PI);

  if (degrees > 180.0) {
    degrees = 360.0 - degrees;
  }

  return Math.round(degrees * 10) / 10;
}

/**
 * Calculates 2D Euclidean distance between two points
 */
export function calculateDistance(p1: Point2D, p2: Point2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Normalizes pose landmark coordinates to canvas width/height
 */
export function landmarkToCanvasPoint(point: Point2D, canvasWidth: number, canvasHeight: number): Point2D {
  return {
    x: point.x * canvasWidth,
    y: point.y * canvasHeight
  };
}
