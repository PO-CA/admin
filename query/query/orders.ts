import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAOrderItem,
  createOrderItemsInCart,
  getAllPickedOrderByUsersEmail,
  getAllUnpickedOrderByUsersEmail,
  putToCancelOrderItem,
  putToPickOrderItem,
  putToUnPickOrderItem,
} from '../api/orders';
import { CreateOrderItemDTO } from '@/types/createOrderItemDTO';

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

    onSuccess: () => queryClient.invalidateQueries(),
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

export function usePutToCancelOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderIds: number[]) => putToCancelOrderItem(orderIds),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
}

export function useCreateOrderItemsInCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderItemDTO) =>
      createOrderItemsInCart(payload),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
}
