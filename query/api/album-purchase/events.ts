import { API_URL } from '@/constants/apis';
import { requests } from '../../request';
import type {
  AlbumPurchaseEventList,
  AlbumPurchaseEventDetail,
  CreateEventRequest,
  UpdateEventRequest,
} from '@/types/albumPurchase';

const BASE_URL = `${API_URL}/logi/album-purchase/admin/event`;

// 행사 목록 조회
export const getEvents = async (params?: {
  albumPurchaseId?: number;
  isVisible?: boolean;
  isFinished?: boolean;
}): Promise<AlbumPurchaseEventList[]> => {
  const { data } = await requests({
    method: 'get',
    url: BASE_URL,
    params,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data as AlbumPurchaseEventList[];
};

// 행사 상세 조회
export const getEventDetail = async (
  eventId: number,
): Promise<AlbumPurchaseEventDetail> => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/${eventId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data as AlbumPurchaseEventDetail;
};

// 행사 등록
export const createEvent = async (
  requestData: CreateEventRequest,
): Promise<any> => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/create`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data;
};

// 행사 수정
export const updateEvent = async (
  eventId: number,
  requestData: UpdateEventRequest,
): Promise<any> => {
  const { data } = await requests({
    method: 'put',
    url: `${BASE_URL}/${eventId}`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data;
};

// 행사 삭제
export const deleteEvent = async (eventId: number): Promise<any> => {
  const { data } = await requests({
    method: 'delete',
    url: `${BASE_URL}/${eventId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data;
};
