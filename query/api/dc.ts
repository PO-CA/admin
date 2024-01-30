import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getDCAmountByUserNickname = async (userNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/dcamount/${userNickname}`,
  });
  return data;
};

export const getDCRateByUserNickname = async (userNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/dcrate/${userNickname}`,
  });
  return data;
};
