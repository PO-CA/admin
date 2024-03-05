import { API_URL } from '@/constants/apis';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import axios from 'axios';

export const getAllShippings = async () => {
  const result = await fetch(`${API_URL}/logi/shipping`, {
    method: 'get',
    cache: 'no-store',
  });

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAllShippingsByStatus = async (shippingStatus: string) => {
  const result = await fetch(`${API_URL}/logi/shipping/${shippingStatus}`, {
    method: 'get',
    cache: 'no-store',
  });
  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAllShippingsByUsersEmail = async (usersEmail: string) => {
  const result = await fetch(`${API_URL}/logi/shipping/email/${usersEmail}`, {
    method: 'get',
    cache: 'no-store',
  });
  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAllShippingsByShippingId = async (shippingId: string) => {
  const result = await fetch(`${API_URL}/logi/shipping/${shippingId}`, {
    method: 'get',
    cache: 'no-store',
  });
  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const createAShipping = async (payload: CreateShippingDTO) => {
  const result = await fetch(`${API_URL}/logi/shipping`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
