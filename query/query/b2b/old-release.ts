import { useQuery } from '@tanstack/react-query';
import { getReleasedOrderSummary } from '../../api/b2b/old-release';

export function useGetReleasedOrderSummary() {
  return useQuery({
    queryKey: ['b2b', 'released', 'summary'],
    queryFn: async () => {
      const data = await getReleasedOrderSummary();
      return data;
    },
  });
}
