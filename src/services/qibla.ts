import * as Location from 'expo-location';
import { Platform } from 'react-native';

export interface QiblaData {
  direction: number; // degrees from north
  distance: number; // km to Makkah
  latitude: number;
  longitude: number;
}

// Makkah coordinates
const MAKKAH_LAT = 21.4225;
const MAKKAH_LNG = 39.8262;

/**
 * Calculate Qibla direction from current location to Makkah
 * Returns the bearing in degrees from true north
 */
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(MAKKAH_LAT);
  const lngDiff = toRadians(MAKKAH_LNG - longitude);

  const y = Math.sin(lngDiff);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lngDiff);
  
  let bearing = toDegrees(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(latitude: number, longitude: number): number {
  const R = 6371; // Earth's radius in km
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(MAKKAH_LAT);
  const lngDiff = toRadians(MAKKAH_LNG - longitude);
  const latDiff = toRadians(MAKKAH_LAT - latitude);

  const a = Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDiff / 2) ** 2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Request location permission and get current position
 */
export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }
    return await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
  } catch (error) {
    console.error('Failed to get location:', error);
    return null;
  }
}

/**
 * Get full Qibla data
 */
export async function getQiblaData(): Promise<QiblaData | { error: string }> {
  try {
    const location = await getCurrentLocation();
    if (!location) {
      return { error: 'Location permission denied' };
    }

    const { latitude, longitude } = location.coords;
    const direction = calculateQiblaDirection(latitude, longitude);
    const distance = calculateDistance(latitude, longitude);

    return {
      direction,
      distance: Math.round(distance),
      latitude: Math.round(latitude * 10000) / 10000,
      longitude: Math.round(longitude * 10000) / 10000,
    };
  } catch (error) {
    return { error: 'Failed to get Qibla direction' };
  }
}
