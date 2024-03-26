import { API_URL } from '@/constants/apis';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import { requests } from '../request';

export const getAllShippings = async () => {
  const { data } = await requests(`${API_URL}/logi/shipping`, {
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

export const getAllShippingsByStatus = async (shippingStatus: string) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/${shippingStatus}`,
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

export const getAllShippingsByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/email/${usersEmail}`,
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

export const getAllShippingsByShippingId = async (shippingId: string) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
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

export const createAShipping = async (payload: CreateShippingDTO) => {
  const { data } = await requests(`${API_URL}/logi/shipping`, {
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

export const deleteAShipping = async (shippingId: number) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
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
