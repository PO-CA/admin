import { API_URL } from '@/constants/apis';
import { requests } from '@/query/request';

export const getPocaOrderByStatus = async (
  usersId: number | null,
  status: string,
) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/${usersId}/${status}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getPocaOrderById = async (pocaOrderId: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/detail/${pocaOrderId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const createPocaOrder = async (payload: any) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/orders`,
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const updatePocaOrder = async (payload: any) => {
  const { data } = await requests({
    method: 'patch',
    url: `${API_URL}/orders`,
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const deletePocaOrder = async (payload: any) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/orders-delete`,
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const calculatePocaOrder = async (usersId: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/calculate/${usersId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
