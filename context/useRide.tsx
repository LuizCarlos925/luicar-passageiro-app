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

  const handleFindRide = async () => {
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

      if (currentRide?.status === 'procurandoMotorista') {
        return router.navigate('/(main)/Home/LookingForDriver');
      }

      if (currentRide?.status === 'cancelada') {
        return router.dismissTo('/(main)/Home');
      }

      if (currentRide?.status === 'motoristaDeslocandoInicio') {
        return router.navigate('/(main)/Home/StartedRide');
      }

      if (currentRide?.status === 'indoAoPontoDeEncontro') {
        return router.navigate({
          pathname: '/(main)/Home/StartedRide',
          params: { status: 'DriverArrived' },
        });
      }

      if (currentRide?.status === 'andamento') {
        return router.navigate('/(main)/Home/StartedRide');
      }

      if (currentRide?.status === 'feita' && !currentRide?.hasReviewed) {
        return router.push('/(main)/Home/RideFinished');
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
