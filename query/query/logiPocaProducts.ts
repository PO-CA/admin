import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLogiPocaProduct,
  getLogiPocaProducts,
} from '@/query/api/logiPocaProducts';
import { CreateLogiPocaProductPayload } from '@/types/logiPocaProduct';

export function useGetLogiPocaProducts() {
  return useQuery({
    queryKey: ['logi-poca-products'],
    queryFn: async () => {
      const data = await getLogiPocaProducts();
      return data;
    },
  });
}

export function useCreateLogiPocaProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLogiPocaProductPayload) =>
      createLogiPocaProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logi-poca-products'] });
    },
  });
}
