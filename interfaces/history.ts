import { RecursiveNormalize } from '@/utils/normalizeStrapi';
import { IVehicle } from './selectTrip';
import { Image } from './user';
import { ICategory, ISubcategory } from './vehicleCategory';

export interface IHistory {
  trips: ITrip[];
  count: number;
}

export interface ITrip {
  id: number;
  status: string;
  date: string;
  tripType: string;
  feesAndTaxesValue: null;
  totalValue: number;
  driverAllocatedValue: null;
  scheduledAt: string;
  invoicedValue: null;
  routeTime: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  time: null;
  inProgress: boolean;
  subcategoryValue: number;
  distance: string;
  paymentMethod: null | string;
  externalId: null;
  tokenCard: null;
  paymentCode: null;
  paymentUrl: null;
  cancellationReason: null;
  paid: boolean;
  deliveryType: Type;
  acceptedAt: string | null;
  routePolyline: string;
  arrivalOriginAt: string | null;
  chatId: null | string;
  destinationArrivalAt: string | null;
  tripStartedAt: null;
  driver: IDriver;
  locals: Local[];
  driverTripCount?: string;
  vehicle: RecursiveNormalize<IVehicle>;
  category: ICategory & { type: string };
  subcategory: RecursiveNormalize<ISubcategory>;
  valuePayment?: number;
  paymentReturnedValue?: number;
  yuseCash?: number;
  discountValue?: number;
}

export enum Type {
  Passenger = 'passenger',
}

export interface IDriver {
  id: number;
  firstName: string;
  lastName: string;
  socialName: string;
  document: string;
  rg: string;
  issuingAuthority: string;
  birthday: string;
  phone: string;
  zipCode: string | null;
  address: null | string;
  city: null | string;
  state: null | string;
  neighborhood: null | string;
  complement: null | string;
  number: null | string;
  cnhRegisterNumber: null | string;
  status: string;
  driverId: null | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  acceptedTerm: boolean;
  emailChange: boolean | null;
  emailChangeDate: string | null;
  indicationCode: null | string;
  recipientId: null;
  tripType: Type;
  minTripValue: number | null;
  name: null;
  review: Review;
  image: Image;
}

export interface Review {
  total_reviews: number | string;
  average_reviews: number;
  my_rating: null;
  driver_id?: number;
}

export interface Local {
  id: number;
  type: string;
  zipCode: string;
  address: string;
  number: null | string;
  neighborhood: string;
  state: string;
  complement: null;
  time: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  city: string;
  lat: string;
  long: string;
  addressString: string;
}
