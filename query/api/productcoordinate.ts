import { API_URL } from '@/constants/apis';
import { requests } from '../request';
import { DeleteProductCoordinateDTO } from '@/types/deleteProductCoordinateDTO';

export const createAProductCoordinate = async (
  payload: DeleteProductCoordinateDTO,
) => {
  const { data } = await requests(
    `${API_URL}/logi/productcoordinate/${payload.productId}/${payload.coordinateId}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('좌표 선택을 성공했습니다');
  return data;
};

export const deleteAProductCoordinate = async (
  payload: DeleteProductCoordinateDTO,
) => {
  const { data } = await requests(
    `${API_URL}/logi/productcoordinate/${payload.productId}/${payload.coordinateId}`,
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
  alert('좌표 선택해제를 성공했습니다');
  return data;
};
