import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAOrderItem,
  createOrderItemsInCart,
  getAllPickedOrderByUsersEmail,
  getAllUnpickedOrderByUsersEmail,
  putToPickOrderItem,
  putToUnPickOrderItem,
} from '../api/orders';

export function useGetAllPickedOrderByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['orderItems', 'picked', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAllPickedOrderByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useGetAllUnpickedOrderByusersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['orderItems', 'unpicked', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAllUnpickedOrderByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
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

export function usePutToUnPickOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderIds: number[]) => putToUnPickOrderItem(orderIds),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
}

export function useCreateOrderItemsInCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number | null) => createOrderItemsInCart(userId),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
}
