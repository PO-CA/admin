import { useQuery } from '@tanstack/react-query';
import { getAddressByUsersEmail } from '../api/address';

export function useGetAddressByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['address', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAddressByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}
