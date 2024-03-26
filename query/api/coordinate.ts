import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getAllCoordinate = async () => {
  const { data } = await requests(`${API_URL}/logi/coordinate`, {
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

export const createACoordinate = async (coordinateName: string) => {
  const { data } = await requests(`${API_URL}/logi/coordinate`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ name: coordinateName }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};
