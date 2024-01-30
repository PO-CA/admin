import { useQuery } from '@tanstack/react-query';
import {
  getAllPickedOrderByUserNickname,
  getAllUnpickedOrderByUserNickname,
} from '../api/orders';

export function useGetAllPickedOrderByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['orderItems', 'picked', `${userNickname}`],
    queryFn: async () => {
      const data = await getAllPickedOrderByUserNickname(userNickname);
      return data;
    },
  });
}

export function useGetAllUnpickedOrderByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['orderItems', 'unpicked', `${userNickname}`],
    queryFn: async () => {
      const data = await getAllUnpickedOrderByUserNickname(userNickname);
      return data;
    },
  });
}
