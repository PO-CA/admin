import { useQuery } from '@tanstack/react-query';
import { getDCAmountByUserNickname, getDCRateByUserNickname } from '../api/dc';

export function useGetDCRateByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['dcRate', `${userNickname}`],
    queryFn: async () => {
      const data = await getDCRateByUserNickname(userNickname);
      return data;
    },
  });
}

export function useGetDCAmountByUserNickname(userNickname: string) {
  return useQuery({
    queryKey: ['dcAmount', `${userNickname}`],
    queryFn: async () => {
      const data = await getDCAmountByUserNickname(userNickname);
      return data;
    },
    enabled: !!userNickname,
  });
}
