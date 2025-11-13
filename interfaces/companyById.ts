export interface ICompanyByID {
  company: Company;
  announcements: IAnnouncement[];
}

export interface Company {
  id: number;
  cnpj: string;
  legalName: string;
  tradeName: string;
  responsibleName: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  phone: string;
  cpf: string;
  description: null;
  neighborhood: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  active: boolean;
  status: string;
  photo: Photo;
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

export interface IAnnouncement {
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
