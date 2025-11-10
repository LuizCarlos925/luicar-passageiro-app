export interface IGeolocation {
  origin: IDestination;
  destination: IDestination;
}

export interface IDestination {
  address: string;
  latitude: number;
  longitude: number;
  formatted: IAddress;
}

export interface IAddress {
  zipCode: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}
