import { User, UserRole } from '../types';

const AUTH_STORAGE_KEY = 'khelsetu_user_session';

const MOCK_DEFAULT_USER: User = {
  id: 'usr-athlete-cur',
  name: 'Aarav Patel',
  email: 'aarav.patel@khelsetu.org',
  role: 'athlete',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  createdAt: '2026-08-01T00:00:00Z'
};

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      // Default to logged-in athlete for smooth app testing
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(MOCK_DEFAULT_USER));
      return MOCK_DEFAULT_USER;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_DEFAULT_USER;
    }
  },

  async login(email: string, role: UserRole = 'athlete'): Promise<User> {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role,
      avatar: MOCK_DEFAULT_USER.avatar,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async signup(name: string, email: string, role: UserRole = 'athlete'): Promise<User> {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: MOCK_DEFAULT_USER.avatar,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
};
