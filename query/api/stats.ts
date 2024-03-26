import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getTotalSell = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/stats/total-sell`,
  });

  return data;
};

export const getTotalQty = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/stats/total-qty`,
  });

  return data;
};

export const getTop5 = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/stats/top5`,
  });

  return data;
};

export const getSellsByUsers = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/stats/byusers`,
  });

  return data;
};
