import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getAllCategory = async () => {
  const { data } = await requests(`${API_URL}/logi/category`, {
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

export const createACategory = async (categoryTitle: string) => {
  const { data } = await requests(`${API_URL}/logi/category`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ title: categoryTitle, visible: true }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
