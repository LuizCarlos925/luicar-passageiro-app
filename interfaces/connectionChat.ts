export interface IConnectionChat {
  profile_id: number | string;
  name: string;
  photo: Photo;
  common_connections: string;
  connection_type: string;
}

export interface Photo {
  url: string;
}
