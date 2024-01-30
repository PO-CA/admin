import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllShippings = async () => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/shipping`,
  });

  return data;
};

export const getAllShippingsByStatus = async (shippingStatus: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/shipping/${shippingStatus}`,
  });

  return data;
};
