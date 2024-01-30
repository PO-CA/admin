import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/product';

export function useGetAllproducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await getAllProducts();
      return data;
    },
  });
}
