import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCreditsByUsersEmail,
  getCreditsByUsersEmail,
} from '../api/credit';
import { CreateCreditByUsersEmailDTO } from '@/types/createCreditByUsersEmailDTO';

export function useGetCreditsByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['credits', `${usersEmail}`],
    queryFn: async () => {
      const data = await getCreditsByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useCreateCreditByUsersEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCreditByUsersEmailDTO) =>
      createCreditsByUsersEmail(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['credits'] }),
  });
}
