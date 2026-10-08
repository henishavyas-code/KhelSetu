import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then((u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, role: UserRole = 'athlete') => {
    setIsLoading(true);
    const u = await authService.login(email, role);
    setUser(u);
    setIsLoading(false);
    return u;
  };

  const signup = async (name: string, email: string, role: UserRole = 'athlete') => {
    setIsLoading(true);
    const u = await authService.signup(name, email, role);
    setUser(u);
    setIsLoading(false);
    return u;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, isLoading, login, signup, logout, isAuthenticated: !!user };
}
