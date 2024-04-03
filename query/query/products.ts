import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  creatAProduct,
  deleteAProduct,
  getAProduct,
  getAllProducts,
  getUsersAllProducts,
  updateAProduct,
} from '../api/product';
import { ProductData } from '@/types/productData';
import { UpdateProductData } from '@/types/updateProductData';

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

export function useCreateAProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductData) => creatAProduct(payload),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateAProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProductData) => updateAProduct(payload),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteAProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => deleteAProduct(productId),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}
