import { API_URL } from '@/constants/apis';
import { requests } from '../../request';
import type {
  AlbumPurchaseRequestSimple,
  AlbumPurchaseRequestDetail,
  PurchaseRequestStatus,
  AcceptRequestDTO,
  RejectRequestDTO,
  ProposeRequestDTO,
} from '@/types/albumPurchase';

const BASE_URL = `${API_URL}/logi/album-purchase/admin/request`;

// 매입 신청 목록 조회
export const getRequests = async (params?: {
  status?: PurchaseRequestStatus;
  userId?: number;
  eventId?: number;
}) => {
  const { data } = await requests({
    method: 'get',
    url: BASE_URL,
    params,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as AlbumPurchaseRequestSimple[];
};

// 매입 신청 상세 조회
export const getRequestDetail = async (requestId: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/${requestId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as AlbumPurchaseRequestDetail;
};

// 매입 신청 수락
export const acceptRequest = async (
  requestId: number,
  requestData: AcceptRequestDTO,
) => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/${requestId}/accept`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

// 매입 신청 거절
export const rejectRequest = async (
  requestId: number,
  requestData: RejectRequestDTO,
) => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/${requestId}/reject`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

// 가격 제안
export const proposePrice = async (
  requestId: number,
  requestData: ProposeRequestDTO,
) => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/${requestId}/propose-price`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
