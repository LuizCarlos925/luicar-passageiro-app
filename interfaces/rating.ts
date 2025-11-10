export interface IRating {
  averageRating: number;
  ratingLength: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  rating: number;
  title: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  driverReviewed: boolean;
  driver: Driver;
  passenger: Passenger;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  socialName: string;
  document: string;
  rg: string;
  issuingAuthority: null | string;
  birthday: string | null;
  phone: string;
  zipCode: null;
  address: null;
  city: null;
  state: null;
  neighborhood: null;
  complement: null;
  number: null;
  cnhRegisterNumber: null;
  status: string;
  driverId: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  acceptedTerm: boolean;
  emailChange: boolean | null;
  emailChangeDate: string | null;
  indicationCode: null;
  recipientId: null;
  tripType: null | string;
  minTripValue: null;
  name: null;
}

export interface Passenger {
  id: number;
  name: string;
  socialName: null | string;
  cpf: null | string;
  rg: null | string;
  phone: string;
  zipCode: null | string;
  address: null | string;
  number: null | string;
  neighborhood: null | string;
  complement: null | string;
  city: null | string;
  state: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  acceptedTerm: boolean;
  status: string;
  emailChange: boolean | null;
  emailChangeDate: null;
  gender: null | string;
  birthday: string | null;
  externalId: null | string;
  yusePlusNotification: boolean | null;
  promotionNotification: boolean | null;
  rideNotification: boolean | null;
  code: null | string;
}
