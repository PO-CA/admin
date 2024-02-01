import { useQuery } from '@tanstack/react-query';
import {
  getAllShippings,
  getAllShippingsByShippingId,
  getAllShippingsByStatus,
  getAllShippingsByUserNickname,
} from '../api/shipping';

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
    enabled: !!shippingStatus,
  });
}

export function useGetAllShippingsByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['shippings', `${userNickname}`],
    queryFn: async () => {
      const data = await getAllShippingsByUserNickname(userNickname);
      return data;
    },
    enabled: !!userNickname,
  });
}

export function useGetAllShippingsByShippingId(shippingId: string) {
  return useQuery({
    queryKey: ['shippings', `${shippingId}`],
    queryFn: async () => {
      const data = await getAllShippingsByShippingId(shippingId);
      return data;
    },
    enabled: !!shippingId,
  });
}
