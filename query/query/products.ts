import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  creatAProduct,
  creatAProductAveragePrice,
  deleteAProduct,
  getAProduct,
  getAllProductAveragePriceByProductId,
  getAllProducts,
  getUsersAllProducts,
  getUsersAllProductsForAddOrder,
  updateAProduct,
  creatProductsBulk,
  updateProductsBulk,
} from '../api/product';
import { ProductData } from '@/types/productData';
import { UpdateProductData } from '@/types/updateProductData';
import { CreateProductAveragePriceDTO } from '@/types/createProductAveragePriceDTO';

export function useGetAllproducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await getAllProducts();
      return data;
    },
  });
}

export function useGetAllproductAveragePrice(productId: number) {
  return useQuery({
    queryKey: ['productAveragePrice', `${productId}`],
    queryFn: async () => {
      const data = await getAllProductAveragePriceByProductId(productId);
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

export function useGetUsersAllproductsForAddOrder(usersEmail: string | null) {
  return useQuery({
    queryKey: ['products', `${usersEmail}`],
    queryFn: async () => {
      const data = await getUsersAllProductsForAddOrder(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useCreateAProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductData) => creatAProduct(payload),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useCreateAProductAveragePrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductAveragePriceDTO) =>
      creatAProductAveragePrice(payload),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['productAveragePrice'] }),
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

export function useCreateProductsBulk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductData[]) => creatProductsBulk(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProductsBulk(options?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => updateProductsBulk(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}
