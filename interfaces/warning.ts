export interface IWarning {
  id: number;
  date: string;
  reason: string;
}

export interface IWarningResponse {
  id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  read: boolean;
  refusal_reason: RefusalReason;
}

export interface RefusalReason {
  id: number;
  type: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blockable: null;
}
