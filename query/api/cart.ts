import { API_URL } from '@/constants/apis';
import { CreateCartItemDTO } from '@/types/createCartItemDTO';
import { requests } from '../request';

export const getUsersAllCarts = async (userId: number | null) => {
  const { data } = await requests(`${API_URL}/logi/cartitem/${userId}`, {
    method: 'get',
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

// 구보 장바구니 조회
export const getReleasedCartItems = async (userId: number | null) => {
  const { data } = await requests(
    `${API_URL}/logi/cartitem/released/${userId}`,
    {
      method: 'get',
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

// 신보 장바구니 조회
export const getPreReleaseCartItems = async (userId: number | null) => {
  const { data } = await requests(
    `${API_URL}/logi/cartitem/pre-release/${userId}`,
    {
      method: 'get',
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const createACartItem = async (payload: CreateCartItemDTO) => {
  const { data } = await requests(`${API_URL}/logi/cartitem`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(payload),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const deleteACartItem = async (cartItemId: number) => {
  const { data } = await requests(`${API_URL}/logi/cartitem/${cartItemId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
