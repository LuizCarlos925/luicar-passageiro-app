export interface ICoupon {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  code: string;
  percentage: number;
  value: null;
  availableTo: string;
  validity: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  minimunTripQuant: number;
  newUser: boolean;
  availableQuantity: null;
  usedQuantity: null;
}
