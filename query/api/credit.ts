import { API_URL } from '@/constants/apis';

export const getCreditsByUserNickname = async (userNickname: string) => {
  const result = await fetch(`${API_URL}/logi/credits/${userNickname}`, {
    method: 'get',
  });

  if (!result) {
    throw new Error('Failed to fetch credits');
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
