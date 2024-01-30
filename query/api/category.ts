import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllCategory = async () => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/category`,
  });

  return data;
};
