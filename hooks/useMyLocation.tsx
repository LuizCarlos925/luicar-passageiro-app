import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { handleError } from '@/utils/handleError';

const useMyLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject,
  );

  const handleSetupLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return handleError('Permission to access location was denied');
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    setLocation(currentLocation);
  };

  useEffect(() => {
    handleSetupLocation();
  }, []);

  return location;
};

export default useMyLocation;
