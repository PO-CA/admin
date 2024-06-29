import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addCartItems,
  deleteCartItem,
  getUsersCart,
  modifyCartItem,
} from '../../api/poca/carts';

export function useGetPocaCartsItems(userId: any) {
  return useQuery({
    queryKey: ['cartitems'],
    queryFn: async () => {
      const data = await getUsersCart(userId);
      return data;
    },
    enabled: !!userId,
  });
}

export const useAddPocaCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => addCartItems(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
};

export const useDeletePocaCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartsitemsId: any) => deleteCartItem(cartsitemsId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
};

export const useModifyPocaCart = (payload: any, cartsitemsId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => modifyCartItem(payload, cartsitemsId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
};
