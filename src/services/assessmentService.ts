import { Assessment, AssessmentAttempt } from '../types';
import { ASSESSMENTS_DATA } from '../data/assessmentsData';
import { MOCK_ASSESSMENT_ATTEMPTS } from '../data/mockProfiles';

const ATTEMPTS_KEY = 'khelsetu_assessment_attempts';

export const assessmentService = {
  async getAssessments(): Promise<Assessment[]> {
    return ASSESSMENTS_DATA;
  },

  async getAssessmentById(id: string): Promise<Assessment | undefined> {
    return ASSESSMENTS_DATA.find((a) => a.id === id);
  },

  async getAttempts(): Promise<AssessmentAttempt[]> {
    const stored = localStorage.getItem(ATTEMPTS_KEY);
    if (!stored) {
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(MOCK_ASSESSMENT_ATTEMPTS));
      return MOCK_ASSESSMENT_ATTEMPTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_ASSESSMENT_ATTEMPTS;
    }
  },

  async saveAttempt(attempt: AssessmentAttempt): Promise<AssessmentAttempt> {
    const attempts = await this.getAttempts();
    const updated = [attempt, ...attempts];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
    return attempt;
  }
};
