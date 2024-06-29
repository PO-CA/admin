import { API_URL } from '@/constants/apis';
import { requests } from '@/query/request';

export const getAllCerts = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/인증요청`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getAllWithdrawal = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/입금완료`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getAllPocaShipping = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/orders/발송완료`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getAllPocas = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/pocas`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
