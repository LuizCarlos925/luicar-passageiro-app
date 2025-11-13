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
  handleRide: (body: Partial<IRide>, isFixed?: boolean) => IRide;
  showNavButton: boolean;
  setShowNavButton: React.Dispatch<React.SetStateAction<boolean>>;
  handleFindRide: (shouldNavigate?: boolean) => Promise<void>;
  handleResetRide: () => void;
  setShouldMapCenter: React.Dispatch<React.SetStateAction<boolean>>;
  shouldMapCenter: boolean;
}

const RideContext = createContext({} as RideProvider);

const RideProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  const [ride, setRide] = useState({} as IRide);
  const [showNavButton, setShowNavButton] = useState(false);
  const [shouldMapCenter, setShouldMapCenter] = useState(false);

  const handleRide = (body: Partial<IRide>, isFixed?: boolean) => {
    if (isFixed) {
      setRide(body as IRide);
      return body as IRide;
    }
    const newData = {
      ...ride,
      ...body,
    };

    setRide(newData);

    return newData;
  };

  const handleResetRide = () => {
    setRide({} as IRide);
  };

  const handleFindRide = async (shouldNavigate?: boolean) => {
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

      handleRide(currentRide);

      if (currentRide?.status === 'procurandoMotorista') {
        return router.navigate('/(main)/Home/LookingForDriver');
      }

      if (currentRide?.status === 'cancelada') {
        return router.push('/(main)/Home');
      }

      if (currentRide?.status === 'motoristaDeslocandoInicio') {
        if (shouldNavigate) {
          return router.navigate('/(main)/Home/StartedRide');
        }
        return setShowNavButton(true);
      }

      if (currentRide?.status === 'indoAoPontoDeEncontro') {
        if (shouldNavigate) {
          return router.navigate({
            pathname: '/(main)/Home/StartedRide',
            params: { status: 'DriverArrived' },
          });
        }
        return setShowNavButton(true);
      }

      if (currentRide?.status === 'andamento') {
        if (shouldNavigate) {
          return router.navigate('/(main)/Home/StartedRide');
        }
        return setShowNavButton(true);
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
        handleRide,
        showNavButton,
        setShowNavButton,
        handleFindRide,
        handleResetRide,
        setShouldMapCenter,
        shouldMapCenter,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;

export const useRide = () => useContext(RideContext);
