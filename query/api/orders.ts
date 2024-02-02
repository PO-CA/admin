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
  const data = await fetch(`${API_URL}/logi/orderitems`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!data.ok) {
    throw new Error('Failed to fetch orderitems');
  }

  return data.json();
};
