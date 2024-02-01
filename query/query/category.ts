import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createACategory, getAllCategory } from '../api/category';

export function useGetAllCategory() {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const data = await getAllCategory();
      return data;
    },
  });
}

export function useCreateACategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryTitle: string) => createACategory(categoryTitle),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['category'] }),
  });
}
