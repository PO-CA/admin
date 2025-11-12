import { API_URL } from '@/constants/apis';
import { requests } from '../../request';
import type {
  ScanReceiptRequest,
  ScanReceiptResponse,
  UnmatchedReceiptDetail,
  MatchReceiptRequest,
  ShippingInfo,
  AlbumPurchaseRequestSimple,
  UnmatchReceiptRequest,
  UnmatchReceiptResponse,
} from '@/types/albumPurchase';

const BASE_URL = `${API_URL}/logi/album-purchase/admin/receipt`;

// 송장 스캔
export const scanReceipt = async (
  requestData: ScanReceiptRequest,
): Promise<ScanReceiptResponse> => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/scan`,
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

  return data as ScanReceiptResponse;
};

// 수령 건 목록 조회
export const getReceipts = async (params?: {
  isReceived?: boolean;
}): Promise<ShippingInfo[]> => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/list`,
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

  return data as ShippingInfo[];
};

// 미매칭 수령 건 목록
export const getUnmatchedReceipts = async (params?: {
  isMatched?: boolean;
}): Promise<UnmatchedReceiptDetail[]> => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/unmatched`,
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

  return data as UnmatchedReceiptDetail[];
};

// 미매칭 수령 건 매칭
export const matchUnmatchedReceipt = async (
  unmatchedReceiptId: number,
  requestData: MatchReceiptRequest,
): Promise<any> => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/unmatched/${unmatchedReceiptId}/match`,
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

// 미매칭 수령 건 매칭 해제
export const unmatchReceipt = async (
  unmatchedReceiptId: number,
  requestData: UnmatchReceiptRequest,
): Promise<UnmatchReceiptResponse> => {
  const { data } = await requests({
    method: 'post',
    url: `${BASE_URL}/unmatched/${unmatchedReceiptId}/unmatch`,
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

  return data as UnmatchReceiptResponse;
};

// 매칭할 신청 건 검색
export const searchRequests = async (
  keyword?: string,
): Promise<AlbumPurchaseRequestSimple[]> => {
  const { data } = await requests({
    method: 'get',
    url: `${BASE_URL}/search`,
    params: { keyword },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    throw new Error(customMessage);
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    throw new Error(errorMessage);
  }

  return data as AlbumPurchaseRequestSimple[];
};
