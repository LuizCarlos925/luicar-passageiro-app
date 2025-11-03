export interface ITrip {
  id?: number;
  status?: string;
  totalValue?: number;
  routeTime?: string;
  driverTripCount?: number;
  driver?: {
    id?: number;
    name?: string;
    photo?: {
      url?: string;
    };
    rating?: number;
  };
  category?: {
    name?: string;
  };
  subcategory?: {
    type?: string;
  };
  vehicle?: {
    vehicle_model?: {
      model?: string;
    };
    plate?: string;
  };
  locals?: Array<{
    addressString?: string;
    latitude?: number;
    longitude?: number;
  }>;
}

export interface IHistoryData {
  [date: string]: ITrip[];
}
