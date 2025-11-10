export interface ICommunity {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  photo: Photo;
  fixed: boolean;
  amountAdms: number;
  admMembers: Member[];
  amountMembers: number;
  members: Member[];
  chatId: string;
}

export interface Member {
  id: number;
  name: string;
  photo: Photo;
  isFounder?: boolean;
  commonConnections?: number;
}

export interface Photo {
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
