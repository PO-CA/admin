import { useQuery } from '@tanstack/react-query';
import { getCreditsByUserNickname } from '../api/credit';

export function useGetCreditsByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['credits', `${userNickname}`],
    queryFn: async () => {
      const data = await getCreditsByUserNickname(userNickname);
      return data;
    },
  });
}
