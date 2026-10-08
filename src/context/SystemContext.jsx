import React, { createContext, useContext, useState, useEffect } from 'react';

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const saved = localStorage.getItem('khelsetu_offline_queue');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    localStorage.setItem('khelsetu_offline_queue', JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  const toggleConnectivity = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (nextState && offlineQueue.length > 0) {
      // Auto-flush queue when coming back online
      setTimeout(() => {
        setOfflineQueue([]);
        setLastSyncTime(new Date().toLocaleTimeString());
      }, 1200);
    }
  };

  const addToOfflineQueue = (item) => {
    setOfflineQueue(prev => [...prev, { ...item, queuedAt: new Date().toISOString() }]);
  };

  const flushQueue = () => {
    setOfflineQueue([]);
    setLastSyncTime(new Date().toLocaleTimeString());
  };

  return (
    <SystemContext.Provider value={{
      isOnline,
      toggleConnectivity,
      offlineQueue,
      addToOfflineQueue,
      flushQueue,
      lastSyncTime
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);
