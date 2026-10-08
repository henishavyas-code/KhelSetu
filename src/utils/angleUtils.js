// KHELSETU MEDIA PIPE JOINT ANGLE & VELOCITY CALCULATOR UTILITIES

/**
 * Calculates the angle in degrees between three points A, B, C where B is the vertex joint.
 * @param {Object} a {x, y}
 * @param {Object} b {x, y} (Vertex)
 * @param {Object} c {x, y}
 * @returns {number} Angle in degrees [0, 180]
 */
export const calculate3PointAngle = (a, b, c) => {
  if (!a || !b || !c) return 180;

  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360.0 - angle;
  }

  return Math.round(angle * 10) / 10;
};

/**
 * Calculates Angular Velocity in degrees/second between two timestamped angles.
 * @param {number} currentAngle 
 * @param {number} previousAngle 
 * @param {number} deltaTimeMs 
 * @returns {number} Velocity in deg/sec
 */
export const calculateAngularVelocity = (currentAngle, previousAngle, deltaTimeMs) => {
  if (previousAngle === null || previousAngle === undefined || deltaTimeMs <= 0) {
    return 0.0;
  }
  const deltaAngle = Math.abs(currentAngle - previousAngle);
  const velocity = (deltaAngle / (deltaTimeMs / 1000.0));
  return Number(velocity.toFixed(1));
};

/**
 * Applies exponential smoothing to reduce camera/pose estimation jitter.
 * @param {number} currentRaw 
 * @param {number} previousSmoothed 
 * @param {number} alpha (Smoothing factor between 0 and 1, default 0.35)
 * @returns {number}
 */
export const smoothAngle = (currentRaw, previousSmoothed, alpha = 0.35) => {
  if (previousSmoothed === null || previousSmoothed === undefined) {
    return currentRaw;
  }
  return Number((alpha * currentRaw + (1 - alpha) * previousSmoothed).toFixed(1));
};

/**
 * Calculates average visibility/confidence score of a landmark set.
 * @param {Array} landmarks 
 * @param {Array<number>} indices 
 * @returns {number} Confidence value between 0.0 and 1.0
 */
export const calculateLandmarkConfidence = (landmarks, indices = []) => {
  if (!landmarks || landmarks.length === 0) return 0;
  
  const targetIndices = indices.length > 0 ? indices : Array.from({ length: landmarks.length }, (_, i) => i);
  let sumScore = 0;
  let count = 0;

  targetIndices.forEach(idx => {
    if (landmarks[idx]) {
      const score = landmarks[idx].visibility ?? landmarks[idx].presence ?? 0.9;
      sumScore += score;
      count++;
    }
  });

  return count > 0 ? Number((sumScore / count).toFixed(2)) : 0;
};
