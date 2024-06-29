import { useQuery } from '@tanstack/react-query';
import {
  getAllCerts,
  getAllPocaShipping,
  getAllPocas,
  getAllWithdrawal,
  getAvailablePocas,
} from '../../api/poca/poca';

export function useGetAllCerts() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const data = await getAllCerts();
      return data;
    },
  });
}

export function useGetAllWithdrawal() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const data = await getAllWithdrawal();
      return data;
    },
  });
}

export function useGetAllPocaShipping() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const data = await getAllPocaShipping();
      return data;
    },
  });
}

export function useGetAllPocas() {
  return useQuery({
    queryKey: ['pocas'],
    queryFn: async () => {
      const data = await getAllPocas();
      return data;
    },
  });
}
export function useGetAvailablePocas() {
  return useQuery({
    queryKey: ['pocas'],
    queryFn: async () => {
      const data = await getAvailablePocas();
      return data;
    },
  });
}
