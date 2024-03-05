import { API_URL } from '@/constants/apis';
import { requests } from '../request';

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
