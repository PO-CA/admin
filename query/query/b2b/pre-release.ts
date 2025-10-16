import { useQuery } from '@tanstack/react-query';
import { getPreReleaseOrderSummary } from '../../api/b2b/pre-release';

export function useGetPreReleaseOrderSummary() {
  return useQuery({
    queryKey: ['b2b', 'pre-release', 'summary'],
    queryFn: async () => {
      const data = await getPreReleaseOrderSummary();
      return data;
    },
  });
}
