export interface ILocation {
  id: number;
  type: string;
  zipCode: null | string;
  address: null | string;
  number: null;
  neighborhood: null | string;
  state: null | string;
  complement: null;
  time: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  city: null | string;
  lat: string;
  long: string;
  address_string: string;
}

export interface ISavedLocation {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  zipCode: string;
  address: string;
  neighborhood: string;
  number: null;
  complement: null;
  state: string;
  city: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: 'home' | 'work' | 'shopping' | 'favorite';
  addressString: string;
}
