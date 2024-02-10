import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAOrderItem,
  getAllPickedOrderByUserNickname,
  getAllUnpickedOrderByUserNickname,
  putToPickOrderItem,
} from '../api/orders';

export function useGetAllPickedOrderByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['orderItems', 'picked', `${userNickname}`],
    queryFn: async () => {
      const data = await getAllPickedOrderByUserNickname(userNickname);
      return data;
    },
    enabled: !!userNickname,
  });
}

export function useGetAllUnpickedOrderByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['orderItems', 'unpicked', `${userNickname}`],
    queryFn: async () => {
      const data = await getAllUnpickedOrderByUserNickname(userNickname);
      return data;
    },
    enabled: !!userNickname,
  });
}

export function useCreateAOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: object) => createAOrderItem(payload),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
}

export function usePutToPickOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderIds: number[]) => putToPickOrderItem(orderIds),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
}
