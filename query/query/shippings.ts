import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAShipping,
  deleteAShipping,
  getAllShippings,
  getAllShippingsByShippingId,
  getAllShippingsByStatus,
  getAllShippingsByUsersEmail,
  getShippingById,
  updateAShipping,
  cancelCompleteAShipping,
} from '../api/shipping';
import { CreateShippingDTO } from '@/types/createShippingDTO';

export function useGetAllShippings() {
  return useQuery({
    queryKey: ['shippings'],
    queryFn: async () => {
      const data = await getAllShippings();
      return data;
    },
  });
}

export function useGetAllShippingsByStatus(shippingStatus: string) {
  return useQuery({
    queryKey: ['shippings', `${shippingStatus}`],
    queryFn: async () => {
      const data = await getAllShippingsByStatus(shippingStatus);
      return data;
    },
    enabled: !!shippingStatus,
  });
}

export function useGetAllShippingsByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['shippings', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAllShippingsByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useGetAllShippingsByShippingId(shippingId: string) {
  return useQuery({
    queryKey: ['shippings', `${shippingId}`],
    queryFn: async () => {
      const data = await getAllShippingsByShippingId(shippingId);
      return data;
    },
    enabled: !!shippingId,
  });
}

export function useGetShippingById(shippingId: string, enabled = true) {
  return useQuery({
    queryKey: ['shipping', shippingId],
    queryFn: async () => {
      const data = await getShippingById(shippingId);
      return data;
    },
    enabled: !!shippingId && enabled,
  });
}

export const useCreateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateShippingDTO) => createAShipping(payload),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shippingId: number) => deleteAShipping(shippingId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useUpdateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shippingId: number) => updateAShipping(shippingId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useCancelCompleteShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shippingId: number) => cancelCompleteAShipping(shippingId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
