import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getLogiAuditLogs, LogiAuditLogFilters } from '../api/logiAudit';

export const useGetLogiAuditLogs = (params: LogiAuditLogFilters) =>
  useQuery({
    queryKey: ['logiAuditLogs', params],
    queryFn: async () => {
      const data = await getLogiAuditLogs(params);
      return data;
    },
    placeholderData: keepPreviousData,
  });
