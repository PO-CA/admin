import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  calculatePocaOrder,
  createPocaOrder,
  deletePocaOrder,
  getPocaOrderById,
  getPocaOrderByStatus,
  updatePocaOrder,
} from '@/query/api/poca/pocaOrders';

export function useGetPocaOrderByUsersIdAndStatus(
  usersId: number | null,
  status: string,
) {
  return useQuery({
    queryKey: ['pocaOrder'],
    queryFn: async () => {
      const data = await getPocaOrderByStatus(usersId, status);
      return data;
    },
    enabled: !!usersId,
  });
}

export function useGetPocaOrderDetails(pocaOrderId: any) {
  return useQuery({
    queryKey: ['pocaorderdetails'],
    queryFn: async () => {
      const data = await getPocaOrderById(pocaOrderId);
      return data;
    },
    enabled: !!pocaOrderId,
  });
}

export function useGetPocaCalculate(usersId: any) {
  return useQuery({
    queryKey: ['calculate'],
    queryFn: async () => {
      const data = await calculatePocaOrder(usersId);
      return data;
    },
    enabled: !!usersId,
  });
}

export const useCreatePocaOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => createPocaOrder(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cartitems'] }),
  });
};

export const useDeletePocaOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => deletePocaOrder(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['pocaorderdetails'] }),
  });
};

export const useModifyPocaOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => updatePocaOrder(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['pocaorderdetails'] }),
  });
};
