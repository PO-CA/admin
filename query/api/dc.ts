import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getDCAmountByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/dcamount/${usersEmail}`,
  });
  return data;
};

export const getDCRateByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/dcrate/${usersEmail}`,
  });
  return data;
};
