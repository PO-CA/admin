import { API_URL } from '@/constants/apis';
import { requests } from '../request';
import { CreateCreditByUsersEmailDTO } from '@/types/createCreditByUsersEmailDTO';

export const getCreditsByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests(`${API_URL}/logi/credits/${usersEmail}`, {
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

export const createCreditsByUsersEmail = async (
  payload: CreateCreditByUsersEmailDTO,
) => {
  const { data } = await requests(`${API_URL}/logi/credit/add`, {
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
  alert('크레딧 생성을 성공했습니다.');

  return data;
};
