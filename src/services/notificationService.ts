import { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockProfiles';

const NOTIFS_KEY = 'khelsetu_notifications';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const stored = localStorage.getItem(NOTIFS_KEY);
    if (!stored) {
      localStorage.setItem(NOTIFS_KEY, JSON.stringify(MOCK_NOTIFICATIONS));
      return MOCK_NOTIFICATIONS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_NOTIFICATIONS;
    }
  },

  async markAsRead(id: string): Promise<Notification[]> {
    const notifs = await this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    return updated;
  },

  async markAllAsRead(): Promise<Notification[]> {
    const notifs = await this.getNotifications();
    const updated = notifs.map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    return updated;
  }
};
