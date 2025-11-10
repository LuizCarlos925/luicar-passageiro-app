import { Image } from './user';

export interface ISelectTrip {
  id: number;
  status: string;
  date: null;
  tripType: null;
  feesAndTaxesValue: null;
  totalValue: number;
  driverAllocatedValue: null;
  invoicedValue: null;
  routeTime: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  time: null;
  inProgress: boolean;
  subcategoryValue: number;
  distance: string;
  paymentMethod: null;
  externalId: null;
  tokenCard: null;
  paymentCode: null;
  paymentUrl: null;
  cancellationReason: null;
  paid: boolean;
  deliveryType: string;
  acceptedAt: null;
  routePolyline: string;
  passengers: Passenger[];
  locals: Local[];
}

export interface Local {
  id: number;
  type: string;
  zipCode: string;
  address: string;
  number: null;
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

export interface Passenger {
  id: number;
  name: string;
  socialName: string;
  cpf: string;
  rg: string;
  phone: string;
  zipCode: string;
  address: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  acceptedTerm: boolean;
  status: string;
  emailChange: null;
  emailChangeDate: null;
  gender: null;
  birthday: null;
  externalId: string;
  yusePlusNotification: boolean;
  promotionNotification: boolean;
  rideNotification: boolean;
  code: string;
}

export interface IVerifyPayment {
  id: number;
  attributes: IVerifyPaymentAttributes;
}

export interface IVerifyPaymentAttributes {
  createdAt: string;
  status: string;
  date: null;
  tripType: null;
  feesAndTaxesValue: null;
  totalValue: number;
  valuePayment: number;
  driverAllocatedValue: null;
  tripStartedAt: string;
  invoicedValue: null;
  routeTime: string;
  updatedAt: string;
  publishedAt: string;
  time: null;
  inProgress: boolean;
  subcategoryValue: number;
  distance: string;
  paymentMethod: string;
  externalId: null;
  tokenCard: null;
  paymentCode: null;
  paymentUrl: null;
  cancellationReason: null;
  paid: boolean;
  deliveryType: string;
  acceptedAt: null;
  routePolyline: string;
  arrivalOriginAt: string;
  destinationArrivalAt: string;
  chatId: string;
  category: ICategory;
  subcategory: Subcategory;
  locals: Locals;
  driver: IDriver;
  vehicle: IVehicle;
  model: IModel;
  pointsDriverOrigin: number[][];
  pointsOriginDestination: number[][];
  recalculateDriverOrigin: number[][];
  recalculateRoutePoints: number[][];
  latitude: number;
  longitude: number;
  latitudeStr: string;
  longitudeStr: string;
  feeAmount: number;
  hasReviewed: boolean;
  yuseCash: number;
  discountValue: number;
}

interface Locals {
  data: IAddress[];
}

interface Subcategory {
  data: Data;
}

interface Data {
  id: number;
  attributes: DataAttributes;
}

interface DataAttributes {
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string;
  seatsCount: number;
  weight: number;
  description: string;
}

interface IAddress {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  type: string;
  zipCode: string;
  address: string;
  number: string;
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

interface ICategory {
  data: DataCategory;
}

interface DataCategory {
  id: number;
  attributes: AttributesCategory;
}

interface AttributesCategory {
  type: string;
  name: string;
  description: null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IDriver {
  data: {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      socialName: string;
      document: string;
      rg: string;
      issuingAuthority: string;
      birthday: string;
      phone: string;
      zipCode: string;
      address: string;
      city: string;
      state: string;
      neighborhood: string;
      complement: string;
      number: string;
      cnhRegisterNumber: string;
      status: string;
      driverId: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      acceptedTerm: boolean;
      emailChange: boolean;
      emailChangeDate: string;
      indicationCode: string;
      recipientId: string;
      tripType: string;
      minTripValue: string;
      image: Image;
      reviews: {
        driver_id: number;
        total_reviews: string;
        average_reviews: number;
      };
      tripCount: string;
    };
  };
}

export interface IVehicle {
  data: {
    id: number;
    attributes: {
      ownersName: string;
      plateNumber: string;
      document: string;
      phone: string;
      email: string;
      year: number;
      renavam: string;
      chassi: string;
      status: string;
      bicycleModel: string;
      inUse: boolean;
      UF: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      type: string;
      vehicle_model: IModel;
      color: IColor;
    };
  };
}

export interface IModel {
  data: DataModel;
}

export interface DataModel {
  id: number;
  attributes: AttributesModel;
}

export interface AttributesModel {
  type: string;
  brand: string;
  model: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IColor {
  data: Data;
}

export interface DataColor {
  id: number;
  attributes: Attributes;
}

export interface AttributesColor {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
