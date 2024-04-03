import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createACoordinate,
  deleteACoordinate,
  getAllCoordinate,
} from '../api/coordinate';

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
    },
  });
}

export function useDeleteACoordinate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coordinateId: number) => deleteACoordinate(coordinateId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coordinate'] });
    },
  });
}
