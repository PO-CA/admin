import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '../api/category';

export function useGetAllCategory() {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const data = await getAllCategory();
      return data;
    },
  });
}
