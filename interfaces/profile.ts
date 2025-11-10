export interface IProfile {
  id: number;
  name: string;
  profilePhoto: IPhoto;
  amountPosts: number;
  connections: string;
  following?: boolean;
  followed?: boolean;
  blocked?: boolean;
  posts: IPost[];
  stories: IStory[];
  createdAt: string;
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

interface IPost {
  id: number;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: IPhoto;
  likes: any[];
  comments: any[];
}

export interface IStory {
  id: number;
  text: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  onDisplay: boolean;
}
