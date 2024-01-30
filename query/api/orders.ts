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
