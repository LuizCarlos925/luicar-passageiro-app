export interface IRide {
  id: number;
  createdAt: Date;
  status: Status;
  date: null;
  tripType: string;
  feesAndTaxesValue: null;
  totalValue: number | null;
  driverAllocatedValue: null;
  invoicedValue: null;
  time: null;
  inProgress: boolean;
  subcategoryValue: number | null;
  distance: null | string;
  paymentMethod: string;
  externalId: null;
  tokenCard: null;
  paymentCode: null;
  paymentUrl: null;
  routeTime: null | string;
  cancellationReason: null;
  paid: boolean;
  deliveryType: Type;
  acceptedAt: null;
  routePolyline: null | string;
  arrivalOriginAt: string;
  chatId: null;
  destinationArrivalAt: string;
  tripStartedAt: null;
  pointsOriginDestination: Array<number[]> | null;
  pointsDriverOrigin: null;
  distanceDriverOrigin: null;
  originDestinationTime: number | null;
  driverOriginTime: null;
  latitude: null;
  longitude: null;
  scheduledAt: null;
  acceptNewPassengers: null;
  limitPassengers: number;
  description: null;
  delivery: null;
  latitudeStr: null;
  longitudeStr: null;
  valuePayment: number | null;
  yuseCash: number;
  restCancellation: number;
  e2eId: null;
  notificationCloseBoarding: boolean;
  notificationNearDestination: boolean;
  feeAmount: number;
  recalculateRoutePoints: null;
  driverReviews: boolean;
  passengerReview: boolean;
  recalculateDriverOrigin: null;
  tripCompletionNotification: boolean;
  newOriginDestinationTime: null;
  newDriverOriginTime: null;
  tripSoonNotification: boolean;
  tripTodayNotification: boolean;
  tripMissedNotification: null;
  tripPrepareNotification: boolean;
  totalLiquid: number | null;
  totalGross: number | null;
  cashbackDriver: number;
  cashbackPassenger: number;
  driverTip: number;
  driverOwedDiscount: null;
  paymentReturnedValue: null;
  yuseCashReturned: null;
  realPaymentReturned: null;
  discountValue: number;
  yuseCashDriverAllocated: null;
  updatedAt: Date;
  publishedAt: Date;
  subcategory: Category;
  category: Category;
  locals: Local[];
  vehicle: Vehicle;
  driver: Driver;
  hasReviewed: boolean;
}

export interface Category {
  id: number;
  type: CategoryType;
  name?: Name;
  description?: Description;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  seatsCount?: number;
  weight?: number;
  brand?: string;
  model?: string;
}

export enum Description {
  A = 'a',
}

export enum Name {
  Categoria = 'Categoria',
  Subcategoria = 'Subcategoria',
}

export enum CategoryType {
  Carro = 'carro',
}

export enum Type {
  Passenger = 'passenger',
}

export interface Driver {
  id?: number;
  firstName?: string;
  lastName?: string;
  socialName?: string;
  document?: string;
  rg?: null;
  issuingAuthority?: null;
  birthday?: Date;
  phone?: string;
  zipCode?: string;
  address?: string;
  city?: string;
  state?: State;
  neighborhood?: string;
  complement?: string;
  number?: string;
  cnhRegisterNumber?: string;
  status?: string;
  driverId?: string;
  acceptedTerm?: boolean;
  emailChange?: null;
  emailChangeDate?: null;
  indicationCode?: string;
  recipientId?: null;
  tripType?: Type;
  minTripValue?: number;
  name?: null;
  balance?: number;
  debitRuns?: number;
  shareCode?: null;
  termAcceptedAt?: null;
  isOnline?: boolean;
  yusePlusNotification?: boolean;
  promotionNotification?: boolean;
  rideNotification?: boolean;
  driverOwedValue?: number;
  ignoreCashRule?: boolean;
  apiValidationStatus?: string;
  apiValidationMessages?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  image?: Image;
  reviews?: Reviews;
  tripCount?: string;
  gamification?: 'prata' | 'ouro' | 'diamante' | 'padrao';
}

export interface Image {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  JPEG = '.jpeg',
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: EXT;
  url: string;
  hash: string;
  mime: MIME;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export enum MIME {
  ImageJpg = 'image/jpg',
}

export interface Reviews {
  driver_id: number;
  total_reviews: string;
  average_reviews: number;
}

export enum State {
  Ontario = 'Ontario',
  SP = 'SP',
}

export interface Local {
  id: number;
  type: string;
  zipCode: string;
  address: string;
  number: string;
  neighborhood: string;
  state: string;
  complement: string;
  time: null;
  city: string;
  lat: null | string;
  long: null | string;
  addressString: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export enum Status {
  Feita = 'feita',
  NaoRealizada = 'naoRealizada',
  ProcurandoMotorista = 'procurandoMotorista',
  IndoAoPontoDeEncontro = 'indoAoPontoDeEncontro',
  MotoristaDeslocandoInicio = 'motoristaDeslocandoInicio',
  Andamento = 'andamento',
  Cancelada = 'cancelada',
}

export interface Vehicle {
  id?: number;
  ownersName?: string;
  plateNumber?: string;
  document?: string;
  phone?: string;
  email?: string;
  year?: number;
  renavam?: string;
  chassi?: string;
  status?: string;
  bicycleModel?: null;
  inUse?: boolean | null;
  UF?: State;
  type?: CategoryType;
  fantasyName?: null | string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  vehicle_model?: Category;
  color?: Color;
  brand?: string;
  model?: string;
}

export interface Color {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
