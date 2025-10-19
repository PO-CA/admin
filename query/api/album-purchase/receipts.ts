import { API_URL } from '@/constants/apis';
import { requests } from '../../request';
import type {
  ScanReceiptRequest,
  ScanReceiptResponse,
  UnmatchedReceiptDetail,
  MatchReceiptRequest,
  ShippingInfo,
  AlbumPurchaseRequestSimple,
} from '@/types/albumPurchase';

const BASE_URL = `${API_URL}/logi/album-purchase/admin/receipt`;

// 송장 스캔
export const scanReceipt = async (requestData: ScanReceiptRequest) => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/scan`,
    data: requestData,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as ScanReceiptResponse;
};

// 수령 건 목록 조회
export const getReceipts = async (params?: { isReceived?: boolean }) => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/list`,
    params,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as ShippingInfo[];
};

// 미매칭 수령 건 목록
export const getUnmatchedReceipts = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/unmatched`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as UnmatchedReceiptDetail[];
};

// 미매칭 수령 건 매칭
export const matchUnmatchedReceipt = async (
  unmatchedReceiptId: number,
  requestData: MatchReceiptRequest,
) => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/unmatched/${unmatchedReceiptId}/match`,
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

// 매칭할 신청 건 검색
export const searchRequests = async (keyword?: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/search`,
    params: { keyword },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data as AlbumPurchaseRequestSimple[];
};
