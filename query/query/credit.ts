import { useQuery } from '@tanstack/react-query';
import { getCreditsByUsersEmail } from '../api/credit';

export function useGetCreditsByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['credits', `${usersEmail}`],
    queryFn: async () => {
      const data = await getCreditsByUsersEmail(usersEmail);
      return data;
    },
  });
}
