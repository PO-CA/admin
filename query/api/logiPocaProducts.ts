import { API_URL } from '@/constants/apis';
import { requests } from '@/query/request';
import {
  CreateLogiPocaProductPayload,
  LogiPocaProduct,
} from '@/types/logiPocaProduct';

export const getLogiPocaProducts = async (): Promise<LogiPocaProduct[]> => {
  const { data } = await requests(`${API_URL}/logi/poca-products`, {
    method: 'get',
  });

  const { errorMessage, errorCode, customMessage } = data;
  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    return [];
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    return [];
  }
  return data;
};

export const createLogiPocaProduct = async (
  payload: CreateLogiPocaProductPayload,
) => {
  const { data } = await requests(`${API_URL}/logi/poca-products`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    return;
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    return;
  }

  alert('포토카드가 등록되었습니다.');
  return data;
};
