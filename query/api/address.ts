import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAddressByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/address/${usersEmail}`,
  });

  return data;
};
