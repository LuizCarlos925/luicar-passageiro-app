export interface IConnection {
  profile_id: number;
  name: string;
  photo: IPhoto;
  story_ids: number[];
  status: string;
}

export interface IPhoto {
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
