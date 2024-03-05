import { useQuery } from '@tanstack/react-query';
import {
  getAProduct,
  getAllProducts,
  getUsersAllProducts,
} from '../api/product';

export function useGetAllproducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await getAllProducts();
      return data;
    },
  });
}

export function useGetAProduct(productId: string) {
  return useQuery({
    queryKey: ['product', `${productId}`],
    queryFn: async () => {
      const data = await getAProduct(productId);
      return data;
    },
    enabled: !!productId,
  });
}

export function useGetUsersAllproducts(userId: number | null) {
  return useQuery({
    queryKey: ['products', `${userId}`],
    queryFn: async () => {
      const data = await getUsersAllProducts(userId);
      return data;
    },
    enabled: !!userId,
  });
}
