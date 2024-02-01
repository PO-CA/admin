import { useQuery } from '@tanstack/react-query';
import { getAddressByUserNickname } from '../api/address';

export function useGetAddressByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['address', `${userNickname}`],
    queryFn: async () => {
      const data = await getAddressByUserNickname(userNickname);
      return data;
    },
    enabled: !!userNickname,
  });
}
