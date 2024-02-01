import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllShippings = async () => {
  const data = await fetch(`${API_URL}/logi/shipping`, {
    method: 'get',
    cache: 'no-store',
  });
  return await data.json();
};

export const getAllShippingsByStatus = async (shippingStatus: string) => {
  const data = await fetch(`${API_URL}/logi/shipping/${shippingStatus}`, {
    method: 'get',
    cache: 'no-store',
  });
  return await data.json();
};

export const getAllShippingsByUserNickname = async (userNickname: string) => {
  const data = await fetch(`${API_URL}/logi/shipping/name/${userNickname}`, {
    method: 'get',
    cache: 'no-store',
  });
  return await data.json();
};

export const getAllShippingsByShippingId = async (shippingId: string) => {
  const data = await fetch(`${API_URL}/logi/shipping/${shippingId}`, {
    method: 'get',
    cache: 'no-store',
  });
  return await data.json();
};
