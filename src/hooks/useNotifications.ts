import { useState, useEffect } from 'react';
import { Notification } from '../types';
import { notificationService } from '../services/notificationService';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifs = async () => {
    const list = await notificationService.getNotifications();
    setNotifications(list);
    setUnreadCount(list.filter((n) => !n.read).length);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const markAsRead = async (id: string) => {
    const list = await notificationService.markAsRead(id);
    setNotifications(list);
    setUnreadCount(list.filter((n) => !n.read).length);
  };

  const markAllAsRead = async () => {
    const list = await notificationService.markAllAsRead();
    setNotifications(list);
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}
