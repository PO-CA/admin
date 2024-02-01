import { API_URL } from '@/constants/apis';

export const getAllCategory = async () => {
  const data = await fetch(`${API_URL}/logi/category`, {
    method: 'get',
    next: { tags: ['category'] },
  });

  if (!data.ok) {
    throw new Error('Failed to fetch category');
  }

  return data.json();
};

export const createACategory = async (categoryTitle: string) => {
  const data = await fetch(`${API_URL}/logi/category`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: categoryTitle }),
  });

  if (!data.ok) {
    throw new Error('Failed to fetch category');
  }

  return data.json();
};
