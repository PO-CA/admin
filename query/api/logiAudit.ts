import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export type LogiAuditLogFilters = {
  page?: number;
  size?: number;
  userId?: number;
  userEmail?: string;
  method?: string;
  path?: string;
  from?: string;
  to?: string;
};

export const getLogiAuditLogs = async (params: LogiAuditLogFilters) => {
  const { data } = await requests(`${API_URL}/logi/audit-logs`, {
    method: 'get',
    params,
  });

  const { errorMessage, errorCode, customMessage } = data || {};

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
