import { API_URL } from '@/constants/apis';

export const getAllProducts = async () => {
  const data = await fetch(`${API_URL}/logi/products`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!data.ok) {
    throw new Error('Failed to fetch products');
  }

  return data.json();
};

export const getAProduct = async (productId: string) => {
  const data = await fetch(`${API_URL}/logi/productdetail/${productId}`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!data.ok) {
    throw new Error('Failed to fetch products');
  }

  return data.json();
};
