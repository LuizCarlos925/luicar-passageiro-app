import { useQuery } from '@tanstack/react-query';

import { ICompany } from '@/interfaces/company';
import { IProduct } from '@/interfaces/product';
import { ICompanyByID } from '@/interfaces/companyById';

import { api } from '@/services/api';

export const useCompanies = () => {
  const getCompanies = async () => {
    const { data } = await api.get<ICompany[]>('/v1/company/home');

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });
};

export const useCompanyById = (id: string) => {
  const getCompanyById = async () => {
    const { data } = await api.get<ICompanyByID>(`/v1/company/home/${id}`);

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['company-by-id', id],
    queryFn: getCompanyById,
    enabled: !!id,
  });
};

export const useCompanyProduct = (id: string) => {
  const getCompanyProduct = async () => {
    const { data } = await api.get<IProduct>(`/v1/company/announcement/${id}`);

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['company-product', id],
    queryFn: getCompanyProduct,
    enabled: !!id,
  });
};
