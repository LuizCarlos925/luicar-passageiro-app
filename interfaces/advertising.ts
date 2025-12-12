export interface IAdvertising {
  announcements: Announcement[];
}

export interface Announcement {
  id: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  announcementStatus: string;
  name: null | string;
  description: null | string;
  link: null | string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  driver: boolean;
  passenger: boolean;
  masterActive: null;
  highlight: boolean;
  banner: Banner | null;
  portfolio_product: PortfolioProduct | null;
}

export interface Banner {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: BannerFormats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  Jpg = '.jpg',
  PNG = '.png',
}

export interface BannerFormats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
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

export interface PortfolioProduct {
  id: number;
  name: string;
  description: string;
  driver: boolean;
  passenger: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  portfolio_product_category: PortfolioProductCategory;
  photos: Photo[];
}

export interface Photo {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: PhotoFormats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoFormats {
  thumbnail: Thumbnail;
  small?: Thumbnail;
  medium?: Thumbnail;
  large?: Thumbnail;
}

export interface PortfolioProductCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
