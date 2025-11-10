export interface IRecipients {
  key: string;
  user: string;
  photo: IPhoto;
  type: 'passenger' | 'driver';
  userId: number;
  fieldType: string;
  matchedKey: string;
}

export interface IPhoto {
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
  folderPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
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

export interface IFrequentRecipients {
  sentById: number;
  targetUserId: number;
  type: 'passenger' | 'driver';
  name: string;
  photo: IPhoto;
  key: string;
  frequency: string;
}
