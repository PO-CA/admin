import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllPickedOrderByUserNickname = async (userNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${userNickname}/picked`,
  });

  return data;
};
export const getAllUnpickedOrderByUserNickname = async (
  userNickname: string,
) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${userNickname}/unpicked`,
  });

  return data;
};

export const createAOrderItem = async (payload: object) => {
  const result = await fetch(`${API_URL}/logi/orderitems`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch orderitems');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const putToPickOrderItem = async (orderIds: number[]) => {
  const result = await fetch(`${API_URL}/logi/orderitems/picked`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: orderIds }),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch orderitems');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
