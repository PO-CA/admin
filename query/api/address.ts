import { API_URL } from '@/constants/apis';
import axios from 'axios';
import { requests } from '../request';
import { updateAddressDTO } from '@/types/updateAddressDTO';

export const getAddressByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/address/${usersEmail}`,
  });

  return data;
};

export const createAAddressByUsersEmail = async (usersEmail: any) => {
  const { data } = await requests(`${API_URL}/logi/address`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ usersEmail }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const updateAAddressByUsersEmail = async (payload: updateAddressDTO) => {
  const { data } = await requests(`${API_URL}/logi/address`, {
    method: 'put',
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
