export interface IAdvertising {
  id: number;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  status: string;
  image: Image;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats | null;
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
  Jpg = '.jpg',
  PNG = '.png',
}

export interface Formats {
  large?: Large;
  small: Large;
  medium?: Large;
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
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
}
