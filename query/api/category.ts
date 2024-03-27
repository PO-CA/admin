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
  alert('카테고리 생성을 성공했습니다');

  return data;
};

export const deleteACategory = async (categoryId: number) => {
  const { data } = await requests(`${API_URL}/logi/category/${categoryId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('카테고리 삭제를 성공했습니다');

  return data;
};
