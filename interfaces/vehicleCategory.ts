export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  id: number;
  to?: string;
  from?: string;
  name: string;
  type: string;
  active: boolean;
  weight: number;
  kmValue?: number;
  seatsCount: number;
  additionalValue?: number;
  additionalVercentage?: number;
  value: number;
}
