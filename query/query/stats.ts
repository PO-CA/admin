import { useQuery } from '@tanstack/react-query';
import {
  getSellsByUsers,
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
