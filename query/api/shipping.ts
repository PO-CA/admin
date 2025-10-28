import { API_URL } from '@/constants/apis';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import { requests } from '../request';
import axios from 'axios';

export const getAllShippings = async () => {
  const { data } = await requests(`${API_URL}/logi/shipping`, {
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

export const getAllShippingsByStatus = async (shippingStatus: string) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/${shippingStatus}`,
    {
      method: 'get',
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAllShippingsByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/email/${usersEmail}`,
    {
      method: 'get',
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getAllShippingsByShippingId = async (shippingId: string) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
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

export const getShippingById = async (shippingId: string) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
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

export const createAShipping = async (payload: CreateShippingDTO) => {
  const { data } = await requests(`${API_URL}/logi/shipping`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(payload),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const deleteAShipping = async (shippingId: number) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const updateAShipping = async (shippingId: number) => {
  const { data } = await requests(`${API_URL}/logi/shipping/${shippingId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('결제 완료를 성공했습니다');

  return data;
};

export const cancelCompleteAShipping = async (shippingId: number) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/cancel-complete/${shippingId}`,
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('취소 완료를 성공했습니다');

  return data;
};

// Presigned URL 요청
export const presignRes = async (shippingCode: string, videoBlob: Blob) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping-videos/presign-by-barcode`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        barcodeForVideo: shippingCode,
        fileName: `video_${shippingCode}_${Date.now()}.${videoBlob.type.includes('mp4') ? 'mp4' : 'webm'}`,
        fileType: videoBlob.type,
      }),
    },
  );

  console.log('presignedData:', data);
  console.log('presignedUrl:', data.presignedUrl);

  return data;
};

// 2. presigned URL로 직접 S3에 업로드
export const uploadRes = async (presignedData: any, videoBlob: Blob) => {
  // URL이 유효한지 확인
  if (!presignedData || !presignedData.presignedUrl) {
    console.error('presignedUrl이 없습니다:', presignedData);
    throw new Error('유효하지 않은 presigned URL');
  }

  // URL이 http:// 또는 https://로 시작하는지 확인
  const url = presignedData.presignedUrl;
  const validUrl =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https:${url.startsWith('//') ? url : `//${url}`}`;

  const { data } = await axios.put(validUrl, videoBlob, {
    headers: {
      'Content-Type': videoBlob.type,
    },
    withCredentials: false,
  });

  return data;
};

// 업로드 결과 등록
export const registerRes = async (
  shippingCode: string,
  uploadFileUrl: string,
) => {
  try {
    const { data } = await requests(
      `${API_URL}/logi/shipping-videos/by-barcode`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          barcodeForVideo: shippingCode,
          videoUrl: uploadFileUrl,
        }),
      },
    );
    return data;
  } catch (error) {
    console.error('비디오 등록 실패:', error);
    return alert('비디오 등록 실패');
  }
};

// 발송일 수정
export const updateShippingCreatedAt = async (
  shippingId: number,
  createdAt: string,
) => {
  const { data } = await requests(
    `${API_URL}/logi/shipping/${shippingId}/created-at`,
    {
      method: 'patch',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ createdAt }),
    },
  );

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('발송일이 수정되었습니다');

  return data;
};
