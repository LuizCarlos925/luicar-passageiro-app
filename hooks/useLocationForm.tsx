import { useEffect, useState, useCallback } from 'react';
import * as Location from 'expo-location';
import { UseFormSetValue, FieldValues, Path } from 'react-hook-form';

import { handleError } from '@/utils/handleError';
import { formatReverseGeocode } from '@/utils/formatAddress';

interface UseLocationFormProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  fieldName: Path<T>;
  shouldDirty?: boolean;
  onLocationObtained?: (
    address: string,
    coords: Location.LocationObjectCoords,
  ) => void;
  onError?: (error: string) => void;
}

interface UseLocationFormReturn {
  currentLocation: string | null;
  isLoading: boolean;
  getLocation: () => Promise<void>;
  requestPermission: () => Promise<Location.PermissionResponse>;
  hasPermission: boolean;
}

export const useLocationForm = <T extends FieldValues>({
  setValue,
  fieldName,
  shouldDirty = false,
  onLocationObtained,
  onError,
}: UseLocationFormProps<T>): UseLocationFormReturn => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, requestPermission] = Location.useForegroundPermissions({
    request: true,
  });

  useEffect(() => {
    if (status) {
      setHasPermission(status.granted);
    }
  }, [status]);

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const currentLocationNow = await Location.reverseGeocodeAsync(coords);

      if (currentLocationNow && currentLocationNow.length > 0) {
        const formattedAddress = formatReverseGeocode(currentLocationNow[0]);

        setValue(fieldName, formattedAddress as T[Path<T>], {
          shouldDirty,
        });

        setCurrentLocation(formattedAddress);

        if (onLocationObtained) {
          onLocationObtained(formattedAddress, coords);
        }
      }
    } catch (err) {
      const errorMessage = 'Não foi possível obter a localização';

      if (onError) {
        onError(errorMessage);
      } else {
        handleError(errorMessage);
      }

      const response = await requestPermission();
      if (response.granted) {
        await getLocation();
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    setValue,
    fieldName,
    shouldDirty,
    onLocationObtained,
    onError,
    requestPermission,
  ]);

  useEffect(() => {
    if (hasPermission) {
      getLocation();
    }
  }, [hasPermission, getLocation]);

  return {
    currentLocation,
    isLoading,
    getLocation,
    requestPermission,
    hasPermission,
  };
};

export default useLocationForm;
