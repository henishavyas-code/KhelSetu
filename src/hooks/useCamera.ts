import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraState } from '../types';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>({
    hasPermission: null,
    isStreaming: false,
    error: null,
    activeDeviceId: null,
    availableDevices: []
  });

  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  const startCamera = useCallback(async (deviceId?: string) => {
    try {
      setCameraState((prev) => ({ ...prev, error: null }));

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
          deviceId: deviceId ? { exact: deviceId } : undefined
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');

      setCameraState({
        hasPermission: true,
        isStreaming: true,
        error: null,
        activeDeviceId: deviceId || (videoDevices[0]?.deviceId ?? null),
        availableDevices: videoDevices
      });
    } catch (err: any) {
      console.warn('Camera access warning / fallback mode:', err);
      setCameraState({
        hasPermission: false,
        isStreaming: false,
        error: err.message || 'Camera permission denied or camera not available',
        activeDeviceId: null,
        availableDevices: []
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    cameraState,
    startCamera,
    stopCamera
  };
}
