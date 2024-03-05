import { API_URL } from '@/constants/apis';
import axios from 'axios';
import { requests } from '../request';

export const getAddressByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/address/${usersEmail}`,
  });

  return data;
};
