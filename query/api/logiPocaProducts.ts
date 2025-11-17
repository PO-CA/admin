import { API_URL } from '@/constants/apis';
import { requests } from '@/query/request';
import {
  BulkCreateLogiPocaProductPayload,
  BulkCreateLogiPocaProductResult,
  LogiPocaProduct,
  PresignedUpload,
} from '@/types/logiPocaProduct';

export const getLogiPocaProducts = async (): Promise<LogiPocaProduct[]> => {
  const { data } = await requests(`${API_URL}/logi/poca-products`, {
    method: 'get',
  });

  const { errorMessage, errorCode, customMessage } = data;
  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    return [];
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    return [];
  }
  return data;
};

export const bulkCreateLogiPocaProduct = async (
  payload: BulkCreateLogiPocaProductPayload,
): Promise<BulkCreateLogiPocaProductResult[]> => {
  const { data } = await requests(`${API_URL}/logi/poca-products/bulk`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    return [];
  } else if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    return [];
  }

  return data ?? [];
};

export const presignPocaImageUpload = async (
  filename: string,
  contentType?: string,
): Promise<PresignedUpload> => {
  const { data } = await requests(
    `${API_URL}/logi/poca-products/uploads/presign`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        filename,
        contentType: contentType ?? 'image/jpeg',
        purpose: 'logi-poca',
      },
    },
  );
  return data;
};
