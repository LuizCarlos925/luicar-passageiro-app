export interface IExtract {
  id: number;
  createdAt: string;
  type: string;
  yuseCash: number;
  action: string;
  status: string;
  sentBy: SentBy;
}

export interface SentBy {
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
  balance: number;
  passenger: IPassenger;
  driver: any;
}

interface IPassenger {
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
  externalId: null;
  yusePlusNotification: boolean;
  promotionNotification: boolean;
  rideNotification: boolean;
  code: string;
  termAcceptedAt: string;
}
