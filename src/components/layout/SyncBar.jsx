import React from 'react';
import { Wifi, WifiOff, RefreshCw, HardDriveUpload, CheckCircle2 } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

export const SyncBar = () => {
  const { isOnline, toggleConnectivity, offlineQueue, flushQueue, lastSyncTime } = useSystem();

  return (
    <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-4 text-xs font-mono text-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleConnectivity}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase transition-all ${
              isOnline
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
            }`}
            title="Click to toggle network connectivity"
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? 'ONLINE' : 'OFFLINE MODE'}
          </button>

          <span className="text-slate-300 hidden md:inline">|</span>

          <span className="text-slate-600 text-[11px] hidden md:inline">
            {isOnline ? (
              <span className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Local storage synced · Last sync: {lastSyncTime}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                <HardDriveUpload className="w-3.5 h-3.5 text-amber-600" />
                Network disconnected · Local cache active ({offlineQueue.length} pending sync)
              </span>
            )}
          </span>
        </div>

        {/* Sync Queue Actions */}
        <div className="flex items-center gap-3">
          {offlineQueue.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                {offlineQueue.length} PENDING SYNC
              </span>
              {isOnline && (
                <button
                  onClick={flushQueue}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded text-[11px] transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  SYNC QUEUE
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
