import { API_URL } from '@/constants/apis';
import { CreateCartItemDTO } from '@/types/createCartItemDTO';

// export const getAllProducts = async () => {
//   const data = await fetch(`${API_URL}/logi/products`, {
//     method: 'get',
//     cache: 'no-store',
//   });

//   if (!data.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   return data.json();
// };

export const getUsersAllCarts = async (userId: number | null) => {
  const data = await fetch(`${API_URL}/logi/cartitem/${userId}`, {
    method: 'get',
    cache: 'no-store',
  });

  if (!data.ok) {
    throw new Error('Failed to fetch cartitems');
  }

  return data.json();
};

export const createACartItem = async (payload: CreateCartItemDTO) => {
  const result = await fetch(`${API_URL}/logi/cartitem`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch category');
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

// export const getAProduct = async (productId: string) => {
//   const data = await fetch(`${API_URL}/logi/productdetail/${productId}`, {
//     method: 'get',
//     cache: 'no-store',
//   });

//   if (!data.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   return data.json();
// };
