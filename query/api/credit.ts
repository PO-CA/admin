import { API_URL } from '@/constants/apis';

export const getCreditsByUserNickname = async (userNickname: string) => {
  const result = await fetch(`${API_URL}/logi/credits/${userNickname}`, {
    method: 'get',
  });

  if (!result) {
    throw new Error('Failed to fetch credits');
  }

  return result.json();
};
