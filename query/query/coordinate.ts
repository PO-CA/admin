import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createACategory, getAllCategory } from '../api/category';
import { createACoordinate, getAllCoordinate } from '../api/coordinate';

export function useGetAllCoordinate() {
  return useQuery({
    queryKey: ['coordinate'],
    queryFn: async () => {
      const data = await getAllCoordinate();
      return data;
    },
  });
}

export function useCreateACoordinate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coordinateName: string) => createACoordinate(coordinateName),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coordinate'] });
      alert('좌표 생성을 성공했습니다');
    },
  });
}
