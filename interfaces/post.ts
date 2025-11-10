export interface IPost {
  id: number;
  location: string;
  description: string;
  photo: Photo;
  profile: Profile;
  count_likes: string;
  count_comments: string;
  status: null | string;
  is_like: boolean | null;
}

export interface Photo {
  url: string;
}

export interface Profile {
  profile_id: number;
  name: string;
  photo: Photo;
}

export interface IMyPost {
  id: number;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: Like[];
  comments: IComment[];
  image: Image;
  feed_profile: IPostFeedProfile;
}

export interface IComment {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  feed_profile: CommentFeedProfile;
}

export interface CommentFeedProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo: Image;
  passenger: Passenger;
  driver: Driver;
}

export interface Passenger {
  id?: number;
  name?: string;
  socialName?: null | string;
  cpf?: string;
  rg?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  number?: string;
  neighborhood?: string;
  complement?: null | string;
  city?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  acceptedTerm?: boolean;
  status?: string;
  emailChange?: boolean | null;
  emailChangeDate?: string | null;
  gender?: null;
  birthday?: null;
  externalId?: null;
  yusePlusNotification?: boolean;
  promotionNotification?: boolean;
  rideNotification?: boolean;
  code?: string;
  termAcceptedAt?: string | null;
}

export interface Image {
  id?: number;
  name?: string;
  alternativeText?: null;
  caption?: null;
  width?: number | null;
  height?: number | null;
  formats?: Formats | null;
  hash?: string;
  ext?: EXT;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  createdAt?: string;
  updatedAt?: string;
}

export enum EXT {
  JPEG = '.jpeg',
  Jpg = '.jpg',
  Mp4 = '.mp4',
  PNG = '.png',
}

export interface Formats {
  large?: Large;
  small?: Large;
  medium?: Large;
  thumbnail: Large;
}

export interface Large {
  ext: EXT;
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

export interface IPostFeedProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  passenger: Passenger;
  driver: Driver;
  photo: Image;
}

export interface Driver {
  id?: number;
  firstName?: string;
  lastName?: string;
  socialName?: string;
  document?: string;
  rg?: string;
  issuingAuthority?: string;
  birthday?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  complement?: string;
  number?: string;
  cnhRegisterNumber?: string;
  status?: string;
  driverId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  acceptedTerm?: boolean;
  emailChange?: null;
  emailChangeDate?: null;
  indicationCode?: null;
  recipientId?: null;
  tripType?: string;
  minTripValue?: number;
  name?: null;
  balance?: number;
  debitRuns?: number;
  shareCode?: null;
  termAcceptedAt?: null;
  isOnline?: null;
}

export interface Like {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IPostAd {
  announcement: Announcement;
  partner: Partner;
  announcement_photo_url: string;
  partner_photo_url: string;
}

export interface Announcement {
  id: number;
  description: string;
  link: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  created_by_id: null;
  updated_by_id: null;
  status: string;
}

export interface Partner {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  fictitious_name: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  created_by_id: null;
  updated_by_id: null;
  status: string;
}

export interface IPostByID {
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
}
