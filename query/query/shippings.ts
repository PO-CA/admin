import { useQuery } from '@tanstack/react-query';
import { getAllShippings, getAllShippingsByStatus } from '../api/shipping';

export function useGetAllShippings() {
  return useQuery({
    queryKey: ['shippings'],
    queryFn: async () => {
      const data = await getAllShippings();
      return data;
    },
  });
}

export function useGetAllShippingsByStatus(shippingStatus: string) {
  return useQuery({
    queryKey: ['shippings', `${shippingStatus}`],
    queryFn: async () => {
      const data = await getAllShippingsByStatus(shippingStatus);
      return data;
    },
  });
}
