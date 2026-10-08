import { mockSubmissions } from '../data/mockSubmissions';
import { mockAthletes } from '../data/mockAthletes';

const STORAGE_SUBMISSIONS_KEY = 'khelsetu_shared_submissions_v2';
const STORAGE_ATHLETES_KEY = 'khelsetu_shared_athletes_v2';
const EVENT_NAME = 'khelsetu_data_change';

// Initialize storage if empty
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_SUBMISSIONS_KEY)) {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(mockSubmissions));
  }
  if (!localStorage.getItem(STORAGE_ATHLETES_KEY)) {
    localStorage.setItem(STORAGE_ATHLETES_KEY, JSON.stringify(mockAthletes));
  }
};

initStorage();

export const mockDataService = {
  getSubmissions: () => {
    try {
      const data = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
      return data ? JSON.parse(data) : mockSubmissions;
    } catch (e) {
      return mockSubmissions;
    }
  },

  getAthletes: () => {
    try {
      const data = localStorage.getItem(STORAGE_ATHLETES_KEY);
      return data ? JSON.parse(data) : mockAthletes;
    } catch (e) {
      return mockAthletes;
    }
  },

  saveSubmission: (newAssessment, isOnline = true) => {
    const submissions = mockDataService.getSubmissions();
    const athletes = mockDataService.getAthletes();

    const submissionId = `KS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newSubmission = {
      id: submissionId,
      athleteId: "ATH-2026-0091", // Aarav Patel
      athleteName: "Aarav Patel",
      district: "Kheda",
      state: "Gujarat",
      exercise: newAssessment.exercise || "Push-up",
      reps: newAssessment.reps || 0,
      score: newAssessment.score || 87.4,
      formAccuracy: newAssessment.formAccuracy || 92,
      cadence: newAssessment.cadence || 1.8,
      risk: (newAssessment.formAccuracy || 92) > 80 ? "Low" : "Medium",
      status: isOnline ? "Verified" : "Pending",
      timestamp: new Date().toLocaleString() + " IST",
      device: "Redmi Note 12 5G (Android 13)",
      gpsLocation: "22.7500° N, 72.8667° E (Kheda District)",
      videoHash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      flaggedReason: null,
      telemetryTimeline: newAssessment.timeline || [
        { time: "00:00", rep: 0, elbowAngle: 175, state: "READY", cadence: 0.0, confidence: 0.98 },
        { time: "00:02", rep: Math.floor(newAssessment.reps * 0.3), elbowAngle: 84, state: "DOWN", cadence: 1.7, confidence: 0.96 },
        { time: "00:05", rep: Math.floor(newAssessment.reps * 0.7), elbowAngle: 172, state: "UP", cadence: 1.8, confidence: 0.97 },
        { time: "00:08", rep: newAssessment.reps, elbowAngle: 80, state: "COMPLETE", cadence: 1.8, confidence: 0.96 }
      ]
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));

    // Update athlete personal bests & counts
    const updatedAthletes = athletes.map(ath => {
      if (ath.id === "ATH-2026-0091") {
        const isPushup = newSubmission.exercise === "Push-up";
        return {
          ...ath,
          pushupsBest: isPushup ? Math.max(ath.pushupsBest, newSubmission.reps) : ath.pushupsBest,
          situpsBest: !isPushup ? Math.max(ath.situpsBest, newSubmission.reps) : ath.situpsBest,
          assessmentsCount: ath.assessmentsCount + 1,
          recentAssessments: [newSubmission, ...ath.recentAssessments]
        };
      }
      return ath;
    });

    localStorage.setItem(STORAGE_ATHLETES_KEY, JSON.stringify(updatedAthletes));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));

    return newSubmission;
  },

  updateSubmissionStatus: (id, newStatus, reason = null) => {
    const submissions = mockDataService.getSubmissions();
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: newStatus,
          flaggedReason: reason || sub.flaggedReason,
          risk: newStatus === "Flagged" ? "High" : newStatus === "Verified" ? "Low" : sub.risk
        };
      }
      return sub;
    });

    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));

    // Update athlete recent assessment status as well
    const athletes = mockDataService.getAthletes();
    const updatedAthletes = athletes.map(ath => {
      const updatedRecent = ath.recentAssessments.map(r => r.id === id ? { ...r, status: newStatus } : r);
      return { ...ath, recentAssessments: updatedRecent };
    });

    localStorage.setItem(STORAGE_ATHLETES_KEY, JSON.stringify(updatedAthletes));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  },

  subscribe: (callback) => {
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  }
};
