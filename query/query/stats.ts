import { useQuery } from '@tanstack/react-query';
import {
  getInCharge,
  getInCharges,
  getSellsByInCharge,
  getSellsByUsers,
  getSellsWithMonth,
  getTop5,
  getTotalQty,
  getTotalSell,
} from '../api/stats';

export function useGetTotalSell() {
  return useQuery({
    queryKey: ['stats', 'sell'],
    queryFn: async () => {
      const data = await getTotalSell();
      return data;
    },
  });
}

export function useGetTotalQty() {
  return useQuery({
    queryKey: ['stats', 'qty'],
    queryFn: async () => {
      const data = await getTotalQty();
      return data;
    },
  });
}

export function useGetTop5() {
  return useQuery({
    queryKey: ['stats', 'top5'],
    queryFn: async () => {
      const data = await getTop5();
      return data;
    },
  });
}

export function useGetSellsByUsers() {
  return useQuery({
    queryKey: ['stats', 'sells', 'users'],
    queryFn: async () => {
      const data = await getSellsByUsers();
      return data;
    },
  });
}

export function useGetSellsByInCharge() {
  return useQuery({
    queryKey: ['stats', 'sells', 'incharge'],
    queryFn: async () => {
      const data = await getSellsByInCharge();
      return data;
    },
  });
}

export function useGetSellsWithMonth(year: number) {
  return useQuery({
    queryKey: ['stats', 'sells', 'month', year],
    queryFn: async () => {
      const data = await getSellsWithMonth(year);
      return data;
    },
  });
}

export function useGetInCharges() {
  return useQuery({
    queryKey: ['stats', 'inCharges'],
    queryFn: async () => {
      const data = await getInCharges();
      return data;
    },
  });
}

export function useGetInCharge(incharge: string) {
  return useQuery({
    queryKey: ['stats', 'inCharges', `${incharge}`],
    queryFn: async () => {
      const data = await getInCharge(incharge);
      return data;
    },
    enabled: !!incharge,
  });
}
