export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  changeEmail: null;
  changeEmailReason: null;
  blockedPassenger: null;
  blockedDriver: null;
  blockedPartner: null;
  passenger: Passenger;
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
  complement: null;
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
  image: Image;
  cards: ICard[];
  bank_account: IBankAccount;
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
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  small: Small;
  thumbnail: Small;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ICard {
  id: number;
  name: string;
  lastDigits: string;
  brand: string;
  expirationMounth: number;
  expirationYear: number;
  externalId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isMain: boolean;
}

export interface IBankAccount {
  id: number;
  bank: string;
  name: string;
  accountNumber: string;
  agency: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  accountDigit: string;
  document: string;
}
