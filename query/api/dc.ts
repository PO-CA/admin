import { API_URL } from '@/constants/apis';
import axios from 'axios';
import { requests } from '../request';
import { UpdateDcRateDTO } from '@/types/updateDcRateDTO';
import { UpdateDcAmountDTO } from '@/types/updateDcAmountDTO';

export const getDCAmountByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/dcamount/${usersEmail}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const getDCRateByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/dcrate/${usersEmail}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const updateDcRate = async (payload: UpdateDcRateDTO) => {
  const { data } = await requests(`${API_URL}/logi/dcrate`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  alert('할인율 수정을 성공했습니다');

  return data;
};

export const updateDcAmount = async (payload: UpdateDcAmountDTO) => {
  const { data } = await requests(`${API_URL}/logi/dcamount`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('할인액 수정을 성공했습니다');

  return data;
};
