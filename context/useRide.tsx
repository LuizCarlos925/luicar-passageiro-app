import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { router } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

import { IDestination } from '@/interfaces/geolocation';
import { ISubcategory } from '@/interfaces/vehicleCategory';
import { IVerifyPayment } from '@/interfaces/selectTrip';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';
import { RecursiveNormalize } from '@/utils/normalizeStrapi';

export type IRide = {
  origin: IDestination;
  destination: IDestination;
  tripType?: 'send' | 'receive';
  isExclusive?: boolean;
  description?: string;
  packageSize?: string;
  subcategory: ISubcategory & { category: string };
  paymentMethod: string;
  paymentResponse: RecursiveNormalize<IVerifyPayment>;
  startTime: string;
  pointsDriverOrigin: number[][];
  pointsOriginDestination: number[][];
  shouldMapCenter?: boolean;
};

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
      const { data } = await api.get<
        Paginated<RecursiveNormalize<IVerifyPayment>>
      >('/trips', {
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
          'sort[createdAt]': 'desc',
        },
      });

      const currentRide = data?.data?.[0];

      if (!currentRide) {
        return;
      }

      handleRide({
        origin: {
          address: currentRide?.locals?.[0]?.addressString,
          latitude: Number(currentRide?.locals?.[0]?.lat),
          longitude: Number(currentRide?.locals?.[0]?.long),
          formatted: {
            address: currentRide?.locals?.[0]?.address,
            city: currentRide?.locals?.[0]?.city,
            neighborhood: currentRide?.locals?.[0]?.neighborhood,
            number: currentRide?.locals?.[0]?.number,
            state: currentRide?.locals?.[0]?.state,
            zipCode: currentRide?.locals?.[0]?.zipCode,
          },
        },
        destination: {
          address: currentRide?.locals?.[1]?.addressString,
          latitude: Number(currentRide?.locals?.[1]?.lat),
          longitude: Number(currentRide?.locals?.[1]?.long),
          formatted: {
            address: currentRide?.locals?.[1]?.address,
            city: currentRide?.locals?.[1]?.city,
            neighborhood: currentRide?.locals?.[1]?.neighborhood,
            number: currentRide?.locals?.[1]?.number,
            state: currentRide?.locals?.[1]?.state,
            zipCode: currentRide?.locals?.[1]?.zipCode,
          },
        },
        paymentMethod: currentRide?.paymentMethod,
        subcategory: {
          category: currentRide?.category?.name,
          value: currentRide?.valuePayment,
          ...currentRide?.subcategory,
        },
        paymentResponse: currentRide,
        startTime: currentRide?.arrivalOriginAt,
        pointsDriverOrigin:
          currentRide?.recalculateDriverOrigin ||
          currentRide.pointsDriverOrigin,
        pointsOriginDestination:
          currentRide.recalculateRoutePoints ||
          currentRide.pointsOriginDestination,
      });

      if (
        currentRide?.status === 'procurandoMotorista' &&
        currentRide?.tripType !== 'agendada'
      ) {
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

  useEffect(() => {
    if (ride?.paymentResponse?.status === 'agendada') {
      const interval = setInterval(() => {
        handleFindRide();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [ride]);

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
