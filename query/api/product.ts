import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllProducts = async () => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/products`,
  });

  return data;
};
