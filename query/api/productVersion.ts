import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getAllProductVersions = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/product-versions`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getProductVersionsByProductId = async (productId: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/product-versions/product/${productId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const createProductVersion = async (payload: {
  logiProductId: number;
  versionName: string;
  description?: string;
  visible?: boolean;
  deleted?: boolean;
}) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/logi/product-versions`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(payload),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  alert('버전 추가를 성공했습니다');
  return data;
};

export const updateProductVersion = async (payload: {
  id: number;
  versionName?: string;
  description?: string;
  visible?: boolean;
  deleted?: boolean;
}) => {
  const { data } = await requests({
    method: 'put',
    url: `${API_URL}/logi/product-versions`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(payload),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  alert('버전 수정을 성공했습니다');
  return data;
};

export const deleteProductVersion = async (id: number) => {
  const { data } = await requests({
    method: 'delete',
    url: `${API_URL}/logi/product-versions/${id}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  alert('버전 삭제를 성공했습니다');
  return data;
};

