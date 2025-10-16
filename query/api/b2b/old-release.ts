import { API_URL } from '@/constants/apis';
import { requests } from '../../request';

export const getReleasedOrderSummary = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/orderitems/summary/released`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
