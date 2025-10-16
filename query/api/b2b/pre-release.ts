import { API_URL } from '@/constants/apis';
import { requests } from '../../request';

export const getPreReleaseOrderSummary = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/orderitems/summary/pre-release`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
