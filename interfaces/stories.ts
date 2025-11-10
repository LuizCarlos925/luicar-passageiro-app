export interface IStory {
  id: number;
  text: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  onDisplay: boolean;
  images: Image[];
  visualizations: Visualizations[];
  profile_master: Profile;
}

interface Image {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: any;
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

interface Profile {
  id: number;
  passenger: Passenger;
  driver: Driver;
  photo: Image;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Passenger {
  id: number;
  name: string;
  socialName: null;
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
  emailChange: boolean;
  emailChangeDate: string;
  gender: null;
  birthday: null;
  externalId: null;
  yusePlusNotification: boolean;
  promotionNotification: boolean;
  rideNotification: boolean;
  code: string;
  termAcceptedAt: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  socialName: string;
}

export interface IConnectionStoryResponse {
  allStories: AllStory[];
  upcomingStories: AllStory[];
}

export interface AllStory {
  profile_id: number;
  name: string;
  photo: Photo;
  stories: Story[];
}

export interface Photo {
  url: string;
}

export interface Story {
  id: number;
  photos: Photos;
  location: string;
  created_at: string;
  description: string;
}

export interface Photos {
  urls: string[];
}

interface Visualizations {
  id: 88;
  createdAt: '2025-02-13T13:14:06.118Z';
  updatedAt: '2025-03-10T17:04:31.925Z';
  publishedAt: '2025-02-13T13:14:06.118Z';
}
