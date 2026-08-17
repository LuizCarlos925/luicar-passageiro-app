import uuid from 'react-native-uuid';
import { api } from '@/services/api';

let currentAttemptId: string | null = null;
let currentPassengerId: number | null = null;

export const startRideAttempt = () => {
  currentAttemptId = uuid.v4() as string;
  return currentAttemptId;
};

export const getRideAttemptId = () => currentAttemptId;

export const clearRideAttempt = () => {
  currentAttemptId = null;
};

export const setRideAttemptPassengerId = (id: number | null) => {
  currentPassengerId = id;
};

interface LogEventParams {
  eventType:
    | 'screen_opened'
    | 'destination_set'
    | 'ride_requested'
    | 'searching_driver'
    | 'driver_found'
    | 'no_driver_available'
    | 'driver_rejected'
    | 'passenger_cancelled'
    | 'ride_started'
    | 'ride_completed'
    | 'app_error';
  originLat?: number;
  originLng?: number;
  destLat?: number;
  destLng?: number;
  driversOnlineNearby?: number;
  waitSeconds?: number;
  failReason?: string;
  metadata?: Record<string, unknown>;
}

export const logRideAttemptEvent = async (params: LogEventParams) => {
  if (!currentAttemptId) {
    startRideAttempt();
  }
  try {
    await api.post('/ride-attempt-events', {
      data: {
        attemptId: currentAttemptId,
        passenger: currentPassengerId,
        ...params,
      },
    });
  } catch (err) {
    // Log de telemetria nunca pode quebrar o fluxo do passageiro
    console.log('[RIDE_ATTEMPT_LOG_ERROR]', err);
  }
};
