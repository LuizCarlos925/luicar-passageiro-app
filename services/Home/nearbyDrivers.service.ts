import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { api } from '@/services/api';

export interface INearbyDriver {
  id: number;
  lat: number;
  lng: number;
}

interface INearbyDriversResponse {
  count: number;
  drivers: INearbyDriver[];
}

export const useNearbyDrivers = (
  currentLocation?: { latitude?: number; longitude?: number },
  enabled = true,
) => {
  return useQuery(
    ['nearbyDrivers', currentLocation?.latitude, currentLocation?.longitude],
    async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Permissão de localização negada');
      }

      const lat = currentLocation?.latitude;
      const long = currentLocation?.longitude;

      if (!lat || !long) {
        return { count: 0, drivers: [] };
      }

      const { data } = await api.get<INearbyDriversResponse>(
        '/drivers/nearby',
        {
          params: { lat, long },
        },
      );

      return data;
    },
    {
      initialData: { count: 0, drivers: [] },
      enabled: enabled && !!currentLocation?.latitude && !!currentLocation?.longitude,
      refetchInterval: 10000,
    },
  );
};
