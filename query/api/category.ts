import { API_URL } from '@/constants/apis';

export const getAllCategory = async () => {
  const result = await fetch(`${API_URL}/logi/category`, {
    method: 'get',
    next: { tags: ['category'] },
  });

  if (!result.ok) {
    throw new Error('Failed to fetch category');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const createACategory = async (categoryTitle: string) => {
  const result = await fetch(`${API_URL}/logi/category`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: categoryTitle, visible: true }),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch category');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
