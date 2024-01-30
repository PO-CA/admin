import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAddressByUserNickname = async (userNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/address/${userNickname}`,
  });

  return data;
};
