import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { router } from 'expo-router';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { useAuth } from '@/hooks/useAuth';
import { IRide } from '@/interfaces/ride';
import { api } from '@/services/api';
import { logRideAttemptEvent, clearRideAttempt } from '@/services/rideAttemptEvents.service';
import { handleError } from '@/utils/handleError';

interface RideProvider {
  ride: IRide;
  handleFindRide: (shouldNavigate?: boolean) => Promise<void>;
  handleResetRide: () => void;
}

const RideContext = createContext({} as RideProvider);

const LAST_LOGGED_KEY_STORAGE = 'lastLoggedRideStatusKey';

const RideProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const [ride, setRide] = useState({} as IRide);

  // Evita logar o mesmo evento de funil mais de uma vez para a mesma
  // combinação de viagem + status. Persistido em disco (não só em
  // memória) para sobreviver a reaberturas do app: sem isso, uma
  // viagem antiga parada em "cancelada" gerava um novo evento falso
  // toda vez que o passageiro abria o app de novo.
  const lastLoggedKeyRef = useRef<string | null>(null);
  const isRestoredRef = useRef(false);

  const logOncePerRideStatus = async (
    rideId: number | string | undefined,
    status: string | undefined,
    eventType: Parameters<typeof logRideAttemptEvent>[0]['eventType'],
    extra?: Record<string, unknown>,
  ) => {
    const key = `${rideId}:${status}`;

    if (!isRestoredRef.current) {
      const stored = await getItemAsync(LAST_LOGGED_KEY_STORAGE);
      lastLoggedKeyRef.current = stored;
      isRestoredRef.current = true;
    }

    if (lastLoggedKeyRef.current === key) {
      return;
    }

    lastLoggedKeyRef.current = key;
    await setItemAsync(LAST_LOGGED_KEY_STORAGE, key);
    logRideAttemptEvent({ eventType, ...extra });
  };

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
      const rideId = currentRide?.id;

      if (status === 'procurandoMotorista' || String(status) === 'aguardandoPagamento') {
        await logOncePerRideStatus(rideId, status, 'searching_driver');
        return router.push('/(main)/Home/Ride/LookingForDriver');
      }

      if (status === 'cancelada') {
        await logOncePerRideStatus(rideId, status, 'passenger_cancelled');
        clearRideAttempt();
        return router.dismissTo('/(main)/Home');
      }

      if (
        (status === 'motoristaDeslocandoInicio' ||
          status === 'indoAoPontoDeEncontro') &&
        shouldNavigate
      ) {
        await logOncePerRideStatus(rideId, status, 'driver_found');
        return router.push('/(main)/Home/Ride/Waiting');
      }

      if (status === 'andamento') {
        await logOncePerRideStatus(rideId, status, 'ride_started');
        return router.push('/(main)/Home/Ride/InProgress');
      }

      if (status === 'feita') {
        await logOncePerRideStatus(rideId, status, 'ride_completed');
        clearRideAttempt();
        if (!currentRide?.hasReviewed) {
          return router.push('/(main)/Home/Ride/Finished');
        }
        handleResetRide();
        return router.dismissTo('/(main)/Home');
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
