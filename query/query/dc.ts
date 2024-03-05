import { useQuery } from '@tanstack/react-query';
import { getDCAmountByUsersEmail, getDCRateByUsersEmail } from '../api/dc';

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
