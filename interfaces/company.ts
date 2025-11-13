export interface ICompany {
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
  createdAt: Date;
  updatedAt: Date;
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
