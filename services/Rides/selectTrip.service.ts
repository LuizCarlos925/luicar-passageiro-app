import { ISelectTrip } from '@/interfaces/selectTrip';
import { IRide } from '@/context/useRide';
import { ISchedule } from '@/context/useSchedule';
import { parseISO } from 'date-fns';
import { api } from '../api';

type Props = {
  ride: IRide;
};

export const handleSelectTrip = async ({ ride }: Props) => {
  const { data } = await api.post<ISelectTrip>('/selectTrip', {
    origin: {
      zipCode: ride?.origin?.formatted?.zipCode,
      address: ride?.origin?.formatted?.address,
      number: ride?.origin?.formatted?.number,
      neighborhood: ride?.origin?.formatted?.neighborhood,
      city: ride?.origin?.formatted?.city,
      state: ride?.origin?.formatted?.state,
      addressString: ride?.origin?.address,
      coordinates: {
        latitude: ride?.origin?.latitude,
        longitude: ride?.origin?.longitude,
      },
    },
    destination: {
      zipCode: ride?.destination?.formatted?.zipCode,
      address: ride?.destination?.formatted?.address,
      number: ride?.destination?.formatted?.number,
      neighborhood: ride?.destination?.formatted?.neighborhood,
      city: ride?.destination?.formatted?.city,
      state: ride?.destination?.formatted?.state,
      addressString: ride?.destination?.address,
      coordinates: {
        latitude: ride?.destination?.latitude,
        longitude: ride?.destination?.longitude,
      },
    },
    subcategoryId: ride?.subcategory?.id,
    categoryId: 1,
  });

  return data;
};

export const handleSelectTripDelivery = async ({ ride }: Props) => {
  const { data } = await api.post<ISelectTrip>('/selectTripDelivery', {
    origin: {
      zipCode: ride?.origin?.formatted?.zipCode,
      address: ride?.origin?.formatted?.address,
      number: ride?.origin?.formatted?.number,
      neighborhood: ride?.origin?.formatted?.neighborhood,
      city: ride?.origin?.formatted?.city,
      state: ride?.origin?.formatted?.state,
      addressString: ride?.origin?.address,
      coordinates: {
        latitude: ride?.origin?.latitude,
        longitude: ride?.origin?.longitude,
      },
    },
    destination: {
      zipCode: ride?.destination?.formatted?.zipCode,
      address: ride?.destination?.formatted?.address,
      number: ride?.destination?.formatted?.number,
      neighborhood: ride?.destination?.formatted?.neighborhood,
      city: ride?.destination?.formatted?.city,
      state: ride?.destination?.formatted?.state,
      addressString: ride?.destination?.address,
      coordinates: {
        latitude: ride?.destination?.latitude,
        longitude: ride?.destination?.longitude,
      },
    },
    subcategoryId: ride?.subcategory?.id,
    categoryId: 1,
    bagTypeId: ride?.packageSize,
    delivery: ride?.tripType === 'send' ? 'envio' : 'recebimento',
    description: ride?.description,
  });

  return data;
};

type PropsSchedule = {
  schedule: ISchedule;
};

export const handleSelectTripSchedule = async ({ schedule }: PropsSchedule) => {
  const { data } = await api.post<ISelectTrip>('/selectTrip', {
    origin: {
      zipCode: schedule?.origin?.formatted?.zipCode,
      address: schedule?.origin?.formatted?.address,
      number: schedule?.origin?.formatted?.number,
      neighborhood: schedule?.origin?.formatted?.neighborhood,
      city: schedule?.origin?.formatted?.city,
      state: schedule?.origin?.formatted?.state,
      addressString: schedule?.origin?.address,
      coordinates: {
        latitude: schedule?.origin?.latitude,
        longitude: schedule?.origin?.longitude,
      },
    },
    destination: {
      zipCode: schedule?.destination?.formatted?.zipCode,
      address: schedule?.destination?.formatted?.address,
      number: schedule?.destination?.formatted?.number,
      neighborhood: schedule?.destination?.formatted?.neighborhood,
      city: schedule?.destination?.formatted?.city,
      state: schedule?.destination?.formatted?.state,
      addressString: schedule?.destination?.address,
      coordinates: {
        latitude: schedule?.destination?.latitude,
        longitude: schedule?.destination?.longitude,
      },
    },
    subcategoryId: schedule?.subcategory?.id,
    categoryId: 1,
    date: parseISO(schedule?.date),
  });

  return data;
};

export const handleSelectTripDeliverySchedule = async ({
  schedule,
}: PropsSchedule) => {
  const { data } = await api.post<ISelectTrip>('/selectTripDelivery', {
    origin: {
      zipCode: schedule?.origin?.formatted?.zipCode,
      address: schedule?.origin?.formatted?.address,
      number: schedule?.origin?.formatted?.number,
      neighborhood: schedule?.origin?.formatted?.neighborhood,
      city: schedule?.origin?.formatted?.city,
      state: schedule?.origin?.formatted?.state,
      addressString: schedule?.origin?.address,
      coordinates: {
        latitude: schedule?.origin?.latitude,
        longitude: schedule?.origin?.longitude,
      },
    },
    destination: {
      zipCode: schedule?.destination?.formatted?.zipCode,
      address: schedule?.destination?.formatted?.address,
      number: schedule?.destination?.formatted?.number,
      neighborhood: schedule?.destination?.formatted?.neighborhood,
      city: schedule?.destination?.formatted?.city,
      state: schedule?.destination?.formatted?.state,
      addressString: schedule?.destination?.address,
      coordinates: {
        latitude: schedule?.destination?.latitude,
        longitude: schedule?.destination?.longitude,
      },
    },
    subcategoryId: schedule?.subcategory?.id,
    categoryId: 1,
    bagTypeId: schedule?.packageSize,
    description: schedule?.description,
    date: parseISO(schedule?.date),
  });

  return data;
};
