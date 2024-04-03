import { API_URL } from '@/constants/apis';
import { requests } from '../request';
import { ProductData } from '@/types/productData';
import { UpdateProductData } from '@/types/updateProductData';

export const getAllProducts = async () => {
  const { data } = await requests(`${API_URL}/logi/products`, {
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

export const getAProduct = async (productId: string) => {
  const { data } = await requests(
    `${API_URL}/logi/productdetail/${productId}`,
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

export const getUsersAllProducts = async (userId: number | null) => {
  const { data } = await requests(`${API_URL}/logi/products/${userId}`, {
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

export const creatAProduct = async (payload: ProductData) => {
  const { data } = await requests(`${API_URL}/logi/products`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('상품 생성을 성공했습니다');

  return data;
};

export const updateAProduct = async (payload: UpdateProductData) => {
  const { data } = await requests(`${API_URL}/logi/products`, {
    method: 'patch',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('상품 수정을 성공했습니다');

  return data;
};

export const deleteAProduct = async (productId: number) => {
  const { data } = await requests(
    `${API_URL}/logi/products/delete/${productId}`,
    {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('상품 삭제를 성공했습니다');

  return data;
};
