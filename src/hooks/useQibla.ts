import { useState, useEffect, useCallback, useRef } from 'react';
import { Magnetometer } from 'expo-sensors';
import { getQiblaData, calculateQiblaDirection, QiblaData } from '../services/qibla';

interface UseQiblaReturn {
  qiblaDirection: number;
  compassHeading: number;
  qiblaData: QiblaData | null;
  error: string | null;
  isLoading: boolean;
  isCalibrating: boolean;
  refresh: () => void;
}

export function useQibla(): UseQiblaReturn {
  const [compassHeading, setCompassHeading] = useState(0);
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const subscription = useRef<any>(null);

  const fetchQiblaData = useCallback(async () => {
    setIsLoading(true);
    const data = await getQiblaData();
    if ('error' in data) {
      setError(data.error);
      setQiblaData(null);
    } else {
      setQiblaData(data);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQiblaData();

    // Start compass
    Magnetometer.setUpdateInterval(100);
    subscription.current = Magnetometer.addListener((data) => {
      // Calculate heading from magnetometer data
      let heading = Math.atan2(data.y, data.x) * (180 / Math.PI);
      heading = heading >= 0 ? heading : heading + 360;
      setCompassHeading(heading);
      
      if (isCalibrating && Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z) > 0) {
        setIsCalibrating(false);
      }
    });

    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
    };
  }, [fetchQiblaData, isCalibrating]);

  const qiblaDirection = qiblaData ? qiblaData.direction : 0;

  return {
    qiblaDirection,
    compassHeading,
    qiblaData,
    error,
    isLoading,
    isCalibrating,
    refresh: fetchQiblaData,
  };
}
