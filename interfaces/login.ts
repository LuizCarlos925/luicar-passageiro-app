export interface ILoginResponse {
  jwt: string;
  user: User;
  refreshToken: string;
  type?: string;
  message?: string;
  reason?: string;
  status?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  changeEmail: null;
  changeEmailReason: null;
  blockedPassenger: null;
  blockedDriver: null;
  blockedPartner: null;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
