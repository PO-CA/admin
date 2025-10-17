import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAProduct,
  getAllProducts,
  getUsersAllProducts,
} from '../api/product';
import {
  createACartItem,
  deleteACartItem,
  getUsersAllCarts,
  getReleasedCartItems,
  getPreReleaseCartItems,
} from '../api/cart';
import { CreateCartItemDTO } from '@/types/createCartItemDTO';

// export function useGetAllproducts() {
//   return useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const data = await getAllProducts();
//       return data;
//     },
//   });
// }

export function useGetUsersAllCarts(userId: number | null) {
  return useQuery({
    queryKey: ['cartitems', `${userId}`],
    queryFn: async () => {
      const data = await getUsersAllCarts(userId);
      return data;
    },
    enabled: !!userId,
  });
}

// 구보 장바구니 조회 hook
export function useGetReleasedCarts(userId: number | null) {
  return useQuery({
    queryKey: ['cartitems', 'released', `${userId}`],
    queryFn: async () => {
      const data = await getReleasedCartItems(userId);
      return data;
    },
    enabled: !!userId,
  });
}

// 신보 장바구니 조회 hook
export function useGetPreReleaseCarts(userId: number | null) {
  return useQuery({
    queryKey: ['cartitems', 'pre-release', `${userId}`],
    queryFn: async () => {
      const data = await getPreReleaseCartItems(userId);
      return data;
    },
    enabled: !!userId,
  });
}

export function useCreateACart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCartItemDTO) => createACartItem(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
}

export function useDeleteACart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: number) => deleteACartItem(cartItemId),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
}

// export function useGetAProduct(productId: string) {
//   return useQuery({
//     queryKey: ['product', `${productId}`],
//     queryFn: async () => {
//       const data = await getAProduct(productId);
//       return data;
//     },
//     enabled: !!productId,
//   });
// }
