import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { router } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

import { IRide } from '@/interfaces/ride';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

interface RideProvider {
  ride: IRide;
  handleFindRide: (shouldNavigate?: boolean) => Promise<void>;
  handleResetRide: () => void;
}

const RideContext = createContext({} as RideProvider);

const RideProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  const [ride, setRide] = useState({} as IRide);

  const handleResetRide = () => {
    setRide({} as IRide);
  };

  const handleFindRide = async (shouldNavigate = true) => {
    try {
      const { data } = await api.get<Paginated<IRide>>('/trips', {
        params: {
          populate: [
            'subcategory',
            'category',
            'locals',
            'vehicle',
            'vehicle.color',
            'vehicle.vehicle_model',
            'driver',
            'driver.image',
            'driver.rating',
          ],
          getReviewDrivers: true,
          normalizeStrapi: true,
          'sort[createdAt]': 'desc',
        },
      });

      const currentRide = data?.data?.[0];

      if (!currentRide) {
        return;
      }

      setRide(currentRide);

      const status = currentRide?.status;

      if (status === 'procurandoMotorista') {
        return router.navigate('/(main)/Home/Ride/LookingForDriver');
      }

      if (status === 'cancelada') {
        return router.dismissTo('/(main)/Home');
      }

      if (
        (status === 'motoristaDeslocandoInicio' ||
          status === 'indoAoPontoDeEncontro') &&
        shouldNavigate
      ) {
        return router.navigate('/(main)/Home/Ride/Waiting');
      }

      if (status === 'andamento') {
        return router.navigate('/(main)/Home/Ride/InProgress');
      }

      if (status === 'feita' && !currentRide?.hasReviewed) {
        return router.push('/(main)/Home/Ride/Finished');
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleFindRide();
    }
  }, [isAuthenticated]);

  return (
    <RideContext.Provider
      value={{
        ride,
        handleFindRide,
        handleResetRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;

export const useRide = () => useContext(RideContext);
