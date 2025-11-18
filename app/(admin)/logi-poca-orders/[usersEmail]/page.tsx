'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  useGetUsersDetailByUsersEmail,
  useUpdateUsersPocaDiscount,
} from '@/query/query/users';
import {
  useGetPocaCreditsByUser,
  useGetPocaOrdersByUser,
  useGetPocaShippingsByUser,
} from '@/query/query/logiPocaStore';
import {
  adjustPocaCredit,
  completePocaShipping,
  createPocaShipping,
} from '@/query/api/logiPocaStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import { PocaCreditType } from '@/types/pocaCredit';
import { CreatePocaShippingDTO } from '@/types/createPocaShippingDTO';
import UserPermission from '@/app/(admin)/customers/[usersEmail]/(components)/userPermission';

interface ShippingFormState {
  addressId: string;
  receiverName: string;
  receiverPhoneNumber: string;
  memo: string;
  shippingFee: string;
}

const createInitialShippingFormState = (): ShippingFormState => ({
  addressId: '',
  receiverName: '',
  receiverPhoneNumber: '',
  memo: '',
  shippingFee: '',
});

export default function PocaUserDetailPage({
  params,
}: {
  params: { usersEmail: string };
}) {
  const { usersEmail } = params;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersEmail(usersEmail);
  const { data: pocaOrders, isLoading: isPocaOrdersLoading } =
    useGetPocaOrdersByUser(usersEmail);
  const { data: pocaShippings, isLoading: isPocaShippingsLoading } =
    useGetPocaShippingsByUser(usersEmail);
  const { data: pocaCredits, isLoading: isPocaCreditsLoading } =
    useGetPocaCreditsByUser(usersEmail);

  const queryClient = useQueryClient();
  const adjustCreditMutation = useMutation({
    mutationFn: adjustPocaCredit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pocaCredits', usersEmail] });
      queryClient.invalidateQueries({ queryKey: ['users', `${usersEmail}`] });
    },
  });
  const updateDiscountMutation = useUpdateUsersPocaDiscount();
  const createShippingMutation = useMutation({
    mutationFn: (payload: CreatePocaShippingDTO) => createPocaShipping(payload),
    onSuccess: () => {
      alert('선택한 주문으로 배송을 생성했습니다.');
      setShippingDialogOpen(false);
      setSelectedOrderIds([]);
      setShippingForm(createInitialShippingFormState());
      queryClient.invalidateQueries({ queryKey: ['pocaOrders', usersEmail] });
      queryClient.invalidateQueries({ queryKey: ['pocaShippings', usersEmail] });
      queryClient.invalidateQueries({ queryKey: ['pocaCredits', usersEmail] });
    },
    onError: () => {
      alert('배송 생성에 실패했습니다. 입력 값을 다시 확인해 주세요.');
    },
  });
  const completeShippingMutation = useMutation({
    mutationFn: (shippingId: number) => completePocaShipping(shippingId),
    onMutate: (shippingId) => {
      setCompletingShippingId(shippingId);
    },
    onSuccess: () => {
      alert('배송을 완료 처리했습니다.');
      queryClient.invalidateQueries({ queryKey: ['pocaOrders', usersEmail] });
      queryClient.invalidateQueries({ queryKey: ['pocaShippings', usersEmail] });
      queryClient.invalidateQueries({ queryKey: ['pocaCredits', usersEmail] });
    },
    onError: () => {
      alert('배송 완료 처리에 실패했습니다. 다시 시도해 주세요.');
    },
    onSettled: () => {
      setCompletingShippingId(null);
    },
  });

  const [discountValue, setDiscountValue] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditType, setCreditType] = useState<PocaCreditType>('CHARGE');
  const [creditDescription, setCreditDescription] = useState('');
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [shippingForm, setShippingForm] = useState<ShippingFormState>(() =>
    createInitialShippingFormState(),
  );
  const [completingShippingId, setCompletingShippingId] = useState<number | null>(null);

  useEffect(() => {
    if (
      usersData?.pocaDiscountRate !== undefined &&
      usersData.pocaDiscountRate !== null
    ) {
      setDiscountValue(String(usersData.pocaDiscountRate));
    }
  }, [usersData]);

  useEffect(() => {
    if (!pocaOrders) {
      setSelectedOrderIds([]);
      return;
    }
    setSelectedOrderIds((prev) =>
      prev.filter((orderId) =>
        pocaOrders.some(
          (order) => order.id === orderId && order.status === 'PENDING',
        ),
      ),
    );
  }, [pocaOrders]);

  const currency = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  const pendingOrderIds =
    pocaOrders?.filter((order) => order.status === 'PENDING').map((order) => order.id) ?? [];

  const selectedOrderCount = selectedOrderIds.length;
  const allPendingSelected =
    pendingOrderIds.length > 0 &&
    pendingOrderIds.every((id) => selectedOrderIds.includes(id));

  const handleToggleOrderSelection = (orderId: number) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleToggleAllOrders = () => {
    if (pendingOrderIds.length === 0) {
      return;
    }
    if (allPendingSelected) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(pendingOrderIds);
    }
  };

  const handleOpenShippingDialog = () => {
    if (!usersData?.id || selectedOrderIds.length === 0) {
      return;
    }
    setShippingDialogOpen(true);
  };

  const handleCloseShippingDialog = (
    _event?: object,
    _reason?: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (createShippingMutation.isPending) {
      return;
    }
    setShippingDialogOpen(false);
    setShippingForm(createInitialShippingFormState());
  };

  const handleShippingFormChange =
    (field: keyof ShippingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setShippingForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleCreateShipping = () => {
    if (!usersData?.id || selectedOrderIds.length === 0 || createShippingMutation.isPending) {
      return;
    }
    const payload: CreatePocaShippingDTO = {
      userId: usersData.id,
      orderIds: selectedOrderIds,
    };

    if (shippingForm.addressId.trim()) {
      const parsedAddressId = Number(shippingForm.addressId);
      if (Number.isNaN(parsedAddressId)) {
        alert('배송지 ID는 숫자로 입력해 주세요.');
        return;
      }
      payload.addressId = parsedAddressId;
    }

    if (shippingForm.shippingFee.trim()) {
      const parsedShippingFee = Number(shippingForm.shippingFee);
      if (Number.isNaN(parsedShippingFee) || parsedShippingFee < 0) {
        alert('배송비는 0 이상의 숫자로 입력해 주세요.');
        return;
      }
      payload.shippingFee = parsedShippingFee;
    }

    if (shippingForm.receiverName.trim()) {
      payload.receiverName = shippingForm.receiverName.trim();
    }

    if (shippingForm.receiverPhoneNumber.trim()) {
      payload.receiverPhoneNumber = shippingForm.receiverPhoneNumber.trim();
    }

    if (shippingForm.memo.trim()) {
      payload.memo = shippingForm.memo.trim();
    }

    createShippingMutation.mutate(payload);
  };

  const handleCompleteShipping = (shippingId: number) => {
    if (!shippingId || completeShippingMutation.isPending) {
      return;
    }
    if (!window.confirm('해당 배송을 배송 완료 처리하시겠습니까?')) {
      return;
    }
    completeShippingMutation.mutate(shippingId);
  };

  const handleUpdateDiscount = () => {
    if (!usersData?.id) {
      return;
    }
    const rate = Number(discountValue);
    if (Number.isNaN(rate)) {
      alert('할인율을 입력해 주세요.');
      return;
    }
    updateDiscountMutation.mutate(
      { id: usersData.id, discountRate: rate },
      {
        onSuccess: () => {
          alert('포카 할인율을 업데이트했습니다.');
        },
      },
    );
  };

  const handleAdjustCredit = () => {
    if (!usersData?.id) {
      return;
    }
    const amount = Number(creditAmount);
    if (Number.isNaN(amount) || amount <= 0) {
      alert('조정할 금액을 입력해 주세요.');
      return;
    }
    adjustCreditMutation.mutate(
      {
        userId: usersData.id,
        amount,
        creditType,
        description: creditDescription || '관리자 조정',
      },
      {
        onSuccess: () => {
          alert('크레딧을 조정했습니다.');
          setCreditAmount('');
          setCreditDescription('');
        },
      },
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {usersData?.nickname ?? usersEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {usersEmail}
          </Typography>
          {!isUsersLoading && isUsersSuccess && usersData && (
            <UserPermission usersData={usersData} />
          )}
        </Paper>

        {usersData && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              포카 스토어 크레딧/할인 관리
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              <Box>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    현재 크레딧
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {currency.format(usersData.pocaCreditBalance ?? 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    현재 할인율
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {(usersData.pocaDiscountRate ?? 0).toFixed(0)}%
                  </Typography>
                </Paper>
              </Box>
              <Box>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      할인율 수정
                    </Typography>
                    <TextField
                      label="할인율 (%)"
                      type="number"
                      value={discountValue}
                      onChange={(event) => setDiscountValue(event.target.value)}
                      inputProps={{ min: 0, max: 100 }}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      onClick={handleUpdateDiscount}
                      disabled={!usersData?.id || updateDiscountMutation.isPending}
                    >
                      할인율 저장
                    </Button>
                  </Stack>
                </Paper>
              </Box>
              <Box>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      크레딧 조정
                    </Typography>
                    <TextField
                      label="금액"
                      type="number"
                      value={creditAmount}
                      onChange={(event) => setCreditAmount(event.target.value)}
                      fullWidth
                      inputProps={{ min: 1 }}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="credit-type-label">구분</InputLabel>
                      <Select
                        labelId="credit-type-label"
                        label="구분"
                        value={creditType}
                        onChange={(event) =>
                          setCreditType(event.target.value as PocaCreditType)
                        }
                      >
                        <MenuItem value="CHARGE">충전</MenuItem>
                        <MenuItem value="MANUAL_DEBIT">차감</MenuItem>
                        <MenuItem value="REFUND">환불</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="메모"
                      value={creditDescription}
                      onChange={(event) => setCreditDescription(event.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAdjustCredit}
                      disabled={!usersData?.id || adjustCreditMutation.isPending}
                    >
                      크레딧 반영
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Box>
          </Paper>
        )}

        <Paper sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                포카 주문 내역
              </Typography>
              <Typography variant="caption" color="text.secondary">
                배송 생성은 배송대기(PENDING) 주문만 선택할 수 있습니다.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              {selectedOrderCount > 0 && (
                <Typography variant="body2" color="text.secondary">
                  선택된 주문 {selectedOrderCount}건
                </Typography>
              )}
              <Button
                variant="contained"
                size="small"
                color="secondary"
                disabled={
                  selectedOrderCount === 0 ||
                  !usersData?.id ||
                  createShippingMutation.isPending
                }
                onClick={handleOpenShippingDialog}
              >
                {createShippingMutation.isPending ? '배송 생성 중...' : '선택 주문 배송 생성'}
              </Button>
            </Stack>
          </Stack>
          {isPocaOrdersLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} />
            </Box>
          ) : pocaOrders && pocaOrders.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={allPendingSelected}
                        indeterminate={selectedOrderCount > 0 && !allPendingSelected}
                        disabled={pendingOrderIds.length === 0}
                        onChange={handleToggleAllOrders}
                        inputProps={{ 'aria-label': 'select all pending orders' }}
                      />
                    </TableCell>
                    <TableCell>상품</TableCell>
                    <TableCell align="right">수량</TableCell>
                    <TableCell align="right">단가</TableCell>
                    <TableCell align="right">총액</TableCell>
                    <TableCell align="center">상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pocaOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          size="small"
                          checked={selectedOrderIds.includes(order.id)}
                          disabled={order.status !== 'PENDING'}
                          onChange={() => handleToggleOrderSelection(order.id)}
                          inputProps={{ 'aria-label': 'select order for shipping' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.3}>
                          <Typography fontWeight={600}>
                            {order.eventName ?? '상품'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.artist ?? '-'} · {order.member ?? '-'}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">{order.quantity}</TableCell>
                      <TableCell align="right">
                        {currency.format(order.discountedUnitPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {currency.format(order.totalPrice)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={order.status}
                          color={
                            order.status === 'SHIPPED'
                              ? 'success'
                              : order.status === 'SHIPPING'
                              ? 'info'
                              : 'warning'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">포카 주문 내역이 없습니다.</Alert>
          )}
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              배송 내역
            </Typography>
            {isPocaShippingsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
              </Box>
            ) : pocaShippings && pocaShippings.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>배송 ID</TableCell>
                    <TableCell align="right">상품 수</TableCell>
                    <TableCell align="right">총액</TableCell>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pocaShippings.map((shipping) => (
                    <TableRow key={shipping.id}>
                      <TableCell>#{shipping.id}</TableCell>
                      <TableCell align="right">
                        {shipping.totalOrderCount ?? 0}
                      </TableCell>
                      <TableCell align="right">
                        {currency.format(shipping.totalProductPrice ?? 0)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={shipping.shippingStatus}
                          color={
                            shipping.shippingStatus === 'COMPLETED'
                              ? 'success'
                              : 'info'
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={
                            shipping.shippingStatus === 'COMPLETED' ||
                            completeShippingMutation.isPending
                          }
                          onClick={() => handleCompleteShipping(shipping.id)}
                        >
                          {completeShippingMutation.isPending &&
                          completingShippingId === shipping.id
                            ? '처리 중...'
                            : '배송 완료'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Alert severity="info">배송 내역이 없습니다.</Alert>
            )}
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              크레딧 내역
            </Typography>
            {isPocaCreditsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
              </Box>
            ) : pocaCredits && pocaCredits.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>내용</TableCell>
                    <TableCell align="right">변동</TableCell>
                    <TableCell align="right">잔액</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pocaCredits.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Stack spacing={0.3}>
                          <Typography fontWeight={600}>{entry.description}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(entry.createdAt).toLocaleString('ko-KR')}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: entry.changeAmount >= 0 ? 'success.main' : 'error.main' }}
                      >
                        {entry.changeAmount >= 0 ? '+' : '-'}
                        {currency.format(Math.abs(entry.changeAmount))}
                      </TableCell>
                      <TableCell align="right">
                        {currency.format(entry.balanceAfter)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Alert severity="info">크레딧 변동 내역이 없습니다.</Alert>
            )}
          </Paper>
        </Box>
      </Stack>

      <Dialog
        open={shippingDialogOpen}
        onClose={handleCloseShippingDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>선택 주문 배송 생성</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="info">
              총 {selectedOrderCount}건의 PENDING 주문으로 배송을 생성합니다.
            </Alert>
            <TextField
              label="배송지 ID"
              type="number"
              value={shippingForm.addressId}
              onChange={handleShippingFormChange('addressId')}
              placeholder="선택 사항"
              fullWidth
            />
            <TextField
              label="수령인"
              value={shippingForm.receiverName}
              onChange={handleShippingFormChange('receiverName')}
              placeholder="선택 사항"
              fullWidth
            />
            <TextField
              label="연락처"
              value={shippingForm.receiverPhoneNumber}
              onChange={handleShippingFormChange('receiverPhoneNumber')}
              placeholder="선택 사항"
              fullWidth
            />
            <TextField
              label="배송비"
              type="number"
              value={shippingForm.shippingFee}
              onChange={handleShippingFormChange('shippingFee')}
              placeholder="0"
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="배송 메모"
              value={shippingForm.memo}
              onChange={handleShippingFormChange('memo')}
              placeholder="선택 사항"
              multiline
              minRows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShippingDialog} disabled={createShippingMutation.isPending}>
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateShipping}
            disabled={
              selectedOrderCount === 0 ||
              createShippingMutation.isPending ||
              !usersData?.id
            }
          >
            {createShippingMutation.isPending ? '생성 중...' : '배송 생성'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
