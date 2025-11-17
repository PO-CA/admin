import { presignPocaImageUpload } from '@/query/api/logiPocaProducts';
import { PresignedUpload } from '@/types/logiPocaProduct';

type ProcessedImage = {
  blob: Blob;
  contentType: string;
  extension: string;
};

const MAX_DIMENSION = 960;
const SKIP_SIZE_THRESHOLD = 600 * 1024;
const SKIP_DIMENSION_THRESHOLD = 800;

async function prepareImage(file: File): Promise<ProcessedImage> {
  const fallbackExtension = file.name.split('.').pop() ?? 'jpg';
  const fallbackType = file.type || 'application/octet-stream';

  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !file.type.startsWith('image/')
  ) {
    return {
      blob: file,
      contentType: fallbackType,
      extension: fallbackExtension,
    };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const longestSide = Math.max(bitmap.width, bitmap.height);

    if (
      longestSide <= SKIP_DIMENSION_THRESHOLD &&
      file.size <= SKIP_SIZE_THRESHOLD
    ) {
      bitmap.close();
      return {
        blob: file,
        contentType: fallbackType,
        extension: fallbackExtension,
      };
    }

    const scale = Math.min(1, MAX_DIMENSION / longestSide);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });

    if (!context) {
      bitmap.close();
      return {
        blob: file,
        contentType: fallbackType,
        extension: fallbackExtension,
      };
    }

    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const prefersPng = file.type === 'image/png';
    const mime = prefersPng ? 'image/png' : 'image/jpeg';
    const extension = prefersPng ? 'png' : 'jpg';

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error('이미지 변환에 실패했습니다.'));
          }
        },
        mime,
        prefersPng ? undefined : 0.75,
      );
    });

    return {
      blob,
      contentType: mime,
      extension,
    };
  } catch (error) {
    console.warn('이미지 리사이즈를 건너뜁니다.', error);
    return {
      blob: file,
      contentType: fallbackType,
      extension: fallbackExtension,
    };
  }
}

export async function uploadPocaImage(file: File): Promise<PresignedUpload> {
  const processed = await prepareImage(file);
  const presigned = await presignPocaImageUpload(
    file.name || `${Date.now()}.${processed.extension}`,
    processed.contentType,
  );

  const response = await fetch(presigned.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': processed.contentType,
    },
    body: processed.blob,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  return presigned;
}
