import { PerformanceMetrics } from '../types';
import { MOCK_PERFORMANCE_METRICS } from '../data/mockProfiles';

export const performanceService = {
  async getMetrics(): Promise<PerformanceMetrics> {
    return MOCK_PERFORMANCE_METRICS;
  }
};
