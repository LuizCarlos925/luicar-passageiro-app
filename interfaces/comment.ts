export interface IComment {
  id: number;
  comment: string;
  profile_data: ProfileData;
  status: string;
}

export interface ProfileData {
  profile_id: number;
  name: string;
  photo: Photo;
}

export interface Photo {
  url: string;
}
