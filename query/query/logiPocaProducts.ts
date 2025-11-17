import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  bulkCreateLogiPocaProduct,
  getLogiPocaProducts,
} from '@/query/api/logiPocaProducts';
import { BulkCreateLogiPocaProductPayload } from '@/types/logiPocaProduct';

export function useGetLogiPocaProducts() {
  return useQuery({
    queryKey: ['logi-poca-products'],
    queryFn: async () => {
      const data = await getLogiPocaProducts();
      return data;
    },
  });
}

export function useBulkCreateLogiPocaProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BulkCreateLogiPocaProductPayload) =>
      bulkCreateLogiPocaProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logi-poca-products'] });
    },
  });
}
