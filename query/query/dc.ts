import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDCAmountByUsersEmail,
  getDCRateByUsersEmail,
  updateDcAmount,
  updateDcRate,
} from '../api/dc';
import { UpdateDcRateDTO } from '@/types/updateDcRateDTO';
import { UpdateDcAmountDTO } from '@/types/updateDcAmountDTO';

export function useGetDCRateByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['dcRate', `${usersEmail}`],
    queryFn: async () => {
      const data = await getDCRateByUsersEmail(usersEmail);
      return data;
    },
  });
}

export function useGetDCAmountByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['dcAmount', `${usersEmail}`],
    queryFn: async () => {
      const data = await getDCAmountByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useUpodateDcRate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDcRateDTO) => updateDcRate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dcRate'] });
    },
  });
}

export function useUpodateDcAmount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDcAmountDTO) => updateDcAmount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dcAmount'] });
    },
  });
}
