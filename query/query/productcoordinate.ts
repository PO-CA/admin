import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAProductCoordinate,
  deleteAProductCoordinate,
} from '../api/productcoordinate';
import { DeleteProductCoordinateDTO } from '@/types/deleteProductCoordinateDTO';
import { CreateProductCoordinateDTO } from '@/types/createProductCoordinateDTO';

export function useCreateAProductCoordinate(
  payload: CreateProductCoordinateDTO,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createAProductCoordinate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product', `${payload.productId}`],
      });
    },
  });
}

export function useDeleteAProductCoordinate(
  payload: DeleteProductCoordinateDTO,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAProductCoordinate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product', `${payload.productId}`],
      });
    },
  });
}
