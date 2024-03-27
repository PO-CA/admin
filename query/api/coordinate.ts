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

export const deleteACoordinate = async (coordinateId: number) => {
  const { data } = await requests(
    `${API_URL}/logi/coordinate/${coordinateId}`,
    {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('좌표 삭제를 성공했습니다');
  return data;
};
