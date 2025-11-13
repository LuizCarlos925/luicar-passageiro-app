export interface IProduct {
  id: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  announcementStatus: string;
  name: null;
  description: null;
  link: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  driver: null;
  passenger: null;
  banner: Banner;
  portfolio_product: PortfolioProduct;
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
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BannerFormats {
  small: Medium;
  medium: Medium;
  thumbnail: Medium;
}

export interface Medium {
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

export interface PortfolioProduct {
  id: number;
  name: string;
  description: string;
  driver: boolean;
  passenger: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
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
  ext: string;
  mime: string;
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
  thumbnail: Medium;
}
