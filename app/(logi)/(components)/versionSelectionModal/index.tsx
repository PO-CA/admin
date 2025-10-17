'use client';
import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import { useGetProductVersions } from '@/query/query/products';
import { useCreateACart } from '@/query/query/cart';
import { useAuth } from '@/hooks/useAuth';

interface VersionSelectionModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
  productTitle: string;
  productPrice: number;
}

interface VersionQuantities {
  [versionId: number]: number;
}

export default function VersionSelectionModal({
  open,
  onClose,
  productId,
  productTitle,
  productPrice,
}: VersionSelectionModalProps) {
  const { userId } = useAuth();
  const { data: versions, isLoading } = useGetProductVersions(
    open ? productId : null,
  );
  const { mutateAsync: createCartItem, isPending } = useCreateACart();

  const [quantities, setQuantities] = useState<VersionQuantities>({});

  const handleQuantityChange = useCallback(
    (versionId: number, value: string) => {
      const qty = parseInt(value) || 0;
      setQuantities((prev) => ({
        ...prev,
        [versionId]: qty >= 0 ? qty : 0,
      }));
    },
    [],
  );

  const handleConfirm = useCallback(async () => {
    // 수량이 입력된 버전들만 필터링
    const selectedVersions = Object.entries(quantities).filter(
      ([_, qty]) => qty > 0,
    );

    if (selectedVersions.length === 0) {
      alert('최소 1개 이상의 버전을 선택해주세요.');
      return;
    }

    try {
      // 각 버전별로 장바구니 아이템 생성
      for (const [versionId, qty] of selectedVersions) {
        await createCartItem({
          userId: userId,
          productId: productId,
          price: productPrice,
          qty: qty,
          versionId: Number(versionId),
        });
      }

      alert('장바구니에 추가되었습니다.');
      setQuantities({}); // 초기화
      onClose();
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  }, [quantities, userId, productId, productPrice, createCartItem, onClose]);

  const handleClose = useCallback(() => {
    setQuantities({});
    onClose();
  }, [onClose]);

  // 총 수량 계산
  const totalQty = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          버전 선택
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productTitle}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : !versions || versions.length === 0 ? (
          <Alert severity="warning">등록된 버전이 없습니다.</Alert>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            {versions
              .filter((v: any) => v.visible && !v.deleted)
              .map((version: any) => (
                <Box
                  key={version.id}
                  sx={{
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {version.versionName}
                      </Typography>
                      {version.description && (
                        <Typography variant="caption" color="text.secondary">
                          {version.description}
                        </Typography>
                      )}
                    </Box>
                    <TextField
                      type="number"
                      size="small"
                      label="수량"
                      value={quantities[version.id] || ''}
                      onChange={(e) =>
                        handleQuantityChange(version.id, e.target.value)
                      }
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      sx={{ width: 100 }}
                    />
                  </Stack>
                </Box>
              ))}

            <Divider />

            <Box
              sx={{
                p: 2,
                backgroundColor: '#f9f9f9',
                borderRadius: 1,
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  총 수량
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {totalQty}개
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  총 금액
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {(totalQty * productPrice).toLocaleString()}원
                </Typography>
              </Stack>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={isPending || totalQty === 0}
        >
          {isPending ? '추가중...' : '장바구니에 추가'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
