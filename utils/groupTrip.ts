import { ITrip } from '@/interfaces/history';

type GroupedTrips = {
  [date: string]: ITrip[];
};

export const groupByDate = (trips?: ITrip[]): GroupedTrips => {
  if (!trips) {
    return {} as GroupedTrips;
  }
  return trips.reduce((acc: GroupedTrips, trip) => {
    const date = new Date(trip.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(trip);

    return acc;
  }, {});
};
