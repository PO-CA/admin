import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getCreditsByUserNickname = async (userNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/credits/${userNickname}`,
  });

  return data;
};
