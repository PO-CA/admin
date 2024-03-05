import { API_URL } from '@/constants/apis';

export const getAllProducts = async () => {
  const result = await fetch(`${API_URL}/logi/products`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAProduct = async (productId: string) => {
  const result = await fetch(`${API_URL}/logi/productdetail/${productId}`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getUsersAllProducts = async (userId: number | null) => {
  const data = await fetch(`${API_URL}/logi/products/${userId}`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!data.ok) {
    throw new Error('Failed to fetch products');
  }

  return data.json();
};
