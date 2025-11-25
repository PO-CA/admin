'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';

import { useBulkCreateLogiPocaProduct } from '@/query/query/logiPocaProducts';
import {
  BulkCreateLogiPocaProductResult,
  PresignedUpload,
} from '@/types/logiPocaProduct';
import { uploadPocaImage } from '@/utils/pocaImageUploader';

type PendingCard = {
  id: string;
  file: File;
  fileName: string;
  previewUrl: string;
  upload?: PresignedUpload;
  uploading: boolean;
  error?: string | null;
  fields: {
    eventName: string;
    artist: string;
    member: string;
    price: string;
    stock: string;
    description: string;
  };
};

const MAX_UPLOADS = 30;

const defaultFields = () => ({
  eventName: '',
  artist: '',
  member: '',
  price: '',
  stock: '',
  description: '',
});

const isImageFile = (file: File) => {
  if (file.type?.startsWith('image/')) return true;
  return /\.(png|jpe?g|gif|webp|bmp|heic|heif)$/i.test(file.name);
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createPendingCard = (file: File): PendingCard => ({
  id: createId(),
  file,
  fileName: file.name,
  previewUrl: URL.createObjectURL(file),
  uploading: true,
  fields: defaultFields(),
});

const isValidPrice = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
};

export default function CreateLogiPocaProductForm() {
  const [items, setItems] = useState<PendingCard[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [progress, setProgress] = useState<{ processed: number; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previousItemsRef = useRef<PendingCard[]>([]);

  const { mutateAsync: bulkCreate, isPending } = useBulkCreateLogiPocaProduct();

  const startUpload = useCallback(async (pending: PendingCard) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === pending.id ? { ...item, uploading: true, error: null } : item,
      ),
    );
    try {
      const uploaded = await uploadPocaImage(pending.file);
      setItems((prev) =>
        prev.map((item) =>
          item.id === pending.id
            ? { ...item, uploading: false, upload: uploaded, error: null }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      setItems((prev) =>
        prev.map((item) =>
          item.id === pending.id
            ? {
                ...item,
                uploading: false,
                error: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
              }
            : item,
        ),
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      previousItemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  useEffect(() => {
    const prev = previousItemsRef.current;
    const prevMap = new Map(prev.map((item) => [item.id, item]));
    items.forEach((item) => {
      if (!prevMap.has(item.id)) {
        void startUpload(item);
      }
    });
    prev.forEach((item) => {
      if (!items.find((current) => current.id === item.id)) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    previousItemsRef.current = items;
  }, [items, startUpload]);

  const handleFiles = (fileList?: FileList | File[]) => {
    if (!fileList || fileList.length === 0) return;
    const normalized = Array.from(fileList).filter((file) => isImageFile(file));
    if (!normalized.length) {
      setMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    const remaining = MAX_UPLOADS - items.length;
    if (remaining <= 0) {
      setMessage(`한 번에 최대 ${MAX_UPLOADS}장까지 업로드할 수 있습니다.`);
      return;
    }
    const accepted = normalized.slice(0, remaining).map((file) => createPendingCard(file));
    if (normalized.length > accepted.length) {
      setMessage(`한 번에 최대 ${MAX_UPLOADS}장까지 업로드할 수 있습니다.`);
    } else {
      setMessage(null);
    }
    setItems((prev) => [...prev, ...accepted]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (submitting) return;
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (submitting) return;
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleFieldChange = (
    id: string,
    field: keyof PendingCard['fields'],
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, fields: { ...item.fields, [field]: value } } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const retryUpload = (pending: PendingCard) => {
    void startUpload(pending);
  };

  const canSubmit = useMemo(() => {
    if (!items.length) return false;
    return items.every(
      (item) =>
        item.upload &&
        !item.uploading &&
        !item.error &&
        isValidPrice(item.fields.price.trim()),
    );
  }, [items]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTriedSubmit(true);
    if (!canSubmit) {
      setMessage('이미지 업로드와 가격 입력을 다시 확인해 주세요.');
      return;
    }

    setSubmitting(true);
    setMessage(null);
    setProgress({ processed: 0, total: items.length });

    try {
      const payload = {
        items: items.map((item) => ({
          eventName: item.fields.eventName || undefined,
          artist: item.fields.artist || undefined,
          member: item.fields.member || undefined,
          description: item.fields.description || undefined,
          price: Number(item.fields.price),
          stock: item.fields.stock ? Number(item.fields.stock) : undefined,
          thumbNailUrl: item.upload?.publicUrl,
          imageUrl: item.upload?.publicUrl,
          imageKey: item.upload?.key,
        })),
      };

      const results = (await bulkCreate(payload)) as
        | BulkCreateLogiPocaProductResult[]
        | undefined;
      const normalizedResults = Array.isArray(results) ? results : [];
      let successCount = 0;
      const survivors: PendingCard[] = [];

      normalizedResults.forEach((result, index) => {
        setProgress((prev) =>
          prev
            ? {
                ...prev,
                processed: Math.min(prev.total, prev.processed + 1),
              }
            : null,
        );
        const source = items[index];
        if (!result || result.status !== 'ok') {
          survivors.push({
            ...source,
            error: result?.message ?? '등록에 실패했습니다. 다시 시도해 주세요.',
          });
        } else {
          successCount += 1;
          URL.revokeObjectURL(source.previewUrl);
        }
      });

      if (normalizedResults.length < items.length) {
        const remaining = items.slice(normalizedResults.length).map((item) => ({
          ...item,
          error: '응답을 받지 못했습니다. 다시 시도해 주세요.',
        }));
        survivors.push(...remaining);
      }

      setItems(survivors);
      if (normalizedResults.length === 0) {
        setMessage('서버 응답을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else if (successCount === normalizedResults.length) {
        setMessage(`${successCount}개의 포토카드를 등록했습니다.`);
        setHasTriedSubmit(false);
      } else {
        setMessage(
          `${successCount}개 등록 성공, ${normalizedResults.length - successCount}개 실패. 실패한 항목을 확인해 주세요.`,
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('포토카드 등록 중 오류가 발생했습니다.');
    } finally {
      setProgress(null);
      setSubmitting(false);
    }
  };

  const priceHelper = (item: PendingCard) => {
    if (!hasTriedSubmit) return '';
    if (!item.fields.price.trim()) return '가격을 입력해 주세요.';
    if (!isValidPrice(item.fields.price)) return '가격은 0보다 커야 합니다.';
    return '';
  };

  const readyCount = items.filter((item) => item.upload && !item.uploading).length;

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : 'divider',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              bgcolor: dragActive ? 'primary.lighter' : 'background.default',
              transition: 'all 0.2s ease-in-out',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (submitting) return;
              fileInputRef.current?.click();
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
              포토카드를 드래그 앤 드롭하거나 클릭해서 선택하세요
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              한 번에 최대 {MAX_UPLOADS}장까지 업로드할 수 있습니다.
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
              disabled={submitting}
            >
              파일 선택
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(event) => {
                handleFiles(event.target.files ?? undefined);
                if (event.target) event.target.value = '';
              }}
            />
          </Box>

          {message && <Alert severity="info">{message}</Alert>}

          {items.length > 0 && (
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    업로드 예정 포토카드
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    총 {items.length}개 중 {readyCount}개 준비 완료
                  </Typography>
                </Stack>
                {progress && (
                  <Typography variant="body2" color="text.secondary">
                    {progress.processed} / {progress.total} 등록 처리 중
                  </Typography>
                )}
              </Stack>
              <Divider />
              <Stack spacing={2}>
                {items.map((item) => (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    sx={{ p: 2, borderRadius: 2 }}
                  >
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <Box
                        component="img"
                        src={item.previewUrl}
                        alt={item.fileName}
                        sx={{
                          width: 144,
                          height: 144,
                          borderRadius: 2,
                          objectFit: 'cover',
                          border: '1px solid',
                          borderColor: 'divider',
                          flexShrink: 0,
                        }}
                      />
                      <Stack spacing={2} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                          <Stack spacing={0.5}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {item.fileName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.upload
                                ? '이미지 업로드 완료'
                                : item.uploading
                                  ? '이미지 업로드 중...'
                                  : item.error
                                    ? '업로드 실패'
                                    : '업로드 대기'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            {item.error && (
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<ReplayIcon fontSize="small" />}
                                onClick={() => retryUpload(item)}
                                disabled={item.uploading || submitting}
                              >
                                다시 업로드
                              </Button>
                            )}
                            <IconButton
                              aria-label="remove"
                              onClick={() => removeItem(item.id)}
                              disabled={submitting}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Stack>
                        </Stack>

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            label="이벤트명 / 타이틀"
                            value={item.fields.eventName}
                            onChange={(event) =>
                              handleFieldChange(item.id, 'eventName', event.target.value)
                            }
                            fullWidth
                            disabled={item.uploading || submitting}
                          />
                          <TextField
                            label="아티스트"
                            value={item.fields.artist}
                            onChange={(event) =>
                              handleFieldChange(item.id, 'artist', event.target.value)
                            }
                            fullWidth
                            disabled={item.uploading || submitting}
                          />
                          <TextField
                            label="멤버"
                            value={item.fields.member}
                            onChange={(event) =>
                              handleFieldChange(item.id, 'member', event.target.value)
                            }
                            fullWidth
                            disabled={item.uploading || submitting}
                          />
                        </Stack>

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            label="가격 (필수)"
                            type="number"
                            value={item.fields.price}
                            onChange={(event) =>
                              handleFieldChange(item.id, 'price', event.target.value)
                            }
                            fullWidth
                            required
                            disabled={item.uploading || submitting}
                            error={Boolean(priceHelper(item))}
                            helperText={priceHelper(item)}
                          />
                          <TextField
                            label="재고 수량 (선택)"
                            type="number"
                            value={item.fields.stock}
                            onChange={(event) =>
                              handleFieldChange(item.id, 'stock', event.target.value)
                            }
                            fullWidth
                            disabled={item.uploading || submitting}
                          />
                        </Stack>

                        <TextField
                          label="설명 (선택)"
                          multiline
                          minRows={2}
                          value={item.fields.description}
                          onChange={(event) =>
                            handleFieldChange(item.id, 'description', event.target.value)
                          }
                          disabled={item.uploading || submitting}
                        />

                        {item.error && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            {item.error}
                          </Alert>
                        )}
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          )}

          <Divider />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', md: 'center' }}
            spacing={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={`총 ${items.length}개`}
                color="default"
                variant="outlined"
              />
              <Chip
                label={`준비 완료 ${readyCount}개`}
                color={readyCount === items.length && items.length > 0 ? 'success' : 'default'}
                variant="outlined"
              />
            </Stack>
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={!canSubmit || submitting || isPending}
            >
              {submitting || isPending ? '등록 처리 중...' : '선택한 포토카드 등록'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
