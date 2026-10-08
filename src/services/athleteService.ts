import { AthleteProfile } from '../types';
import { CURRENT_ATHLETE_PROFILE } from '../data/mockProfiles';

const ATHLETE_PROFILE_KEY = 'khelsetu_athlete_profile';

export const athleteService = {
  async getProfile(): Promise<AthleteProfile> {
    const stored = localStorage.getItem(ATHLETE_PROFILE_KEY);
    if (!stored) {
      localStorage.setItem(ATHLETE_PROFILE_KEY, JSON.stringify(CURRENT_ATHLETE_PROFILE));
      return CURRENT_ATHLETE_PROFILE;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return CURRENT_ATHLETE_PROFILE;
    }
  },

  async updateProfile(updates: Partial<AthleteProfile>): Promise<AthleteProfile> {
    const current = await this.getProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem(ATHLETE_PROFILE_KEY, JSON.stringify(updated));
    return updated;
  }
};
