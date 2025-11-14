'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import {
  useScanReceipt,
  useGetReceipts,
  useGetUnmatchedReceipts,
  useMatchUnmatchedReceipt,
  useSearchRequests,
  useUnmatchReceipt,
} from '@/query/query/album-purchase/receipts';
import { useGetRequestDetail } from '@/query/query/album-purchase/requests';
import type {
  ScanReceiptResponse,
  ShippingInfo,
  UnmatchedReceiptDetail,
  AlbumPurchaseRequestDetail,
  TrackingNumberInfo,
} from '@/types/albumPurchase';
import { useSnackbar } from '../_components/useSnackbar';
import {
  SHIPPING_COMPANIES,
  ShippingCompanyValue,
} from '@/constants/shippingCompanies';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function formatDateTime(value?: string | null) {
  return value ? new Date(value).toLocaleString() : '-';
}

function MatchedReceiptsTable({
  receipts,
  isLoading,
  onUnmatchRequest,
  onViewRequest,
}: {
  receipts: ShippingInfo[];
  isLoading: boolean;
  onUnmatchRequest: (receipt: ShippingInfo) => void;
  onViewRequest: (requestId?: number) => void;
}) {
  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'shippingId',
        headerName: 'ID',
        width: 80,
      },
      {
        field: 'trackingNumber',
        headerName: '송장번호',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'shippingCompany',
        headerName: '택배사',
        width: 120,
      },
      {
        field: 'actualQuantity',
        headerName: '수량',
        width: 80,
        type: 'number',
      },
      {
        field: 'requestId',
        headerName: '매입 신청 ID',
        width: 130,
      },
      {
        field: 'receivedAt',
        headerName: '수령일',
        width: 180,
        renderCell: (params: any) => formatDateTime(params.value),
      },
      {
        field: 'receivedBy',
        headerName: '수령자',
        width: 120,
      },
      {
        field: 'requestDetail',
        headerName: '신청 상세',
        width: 130,
        renderCell: (params: any) => (
          <Button
            component={Link}
            href={
              params.row.requestId
                ? `/album-purchase/requests/${params.row.requestId}`
                : '#'
            }
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="text"
            disabled={!params.row.requestId}
            onClick={(e) => {
              if (!params.row.requestId) {
                e.preventDefault();
                onViewRequest(undefined);
              }
            }}
          >
            상세보기
          </Button>
        ),
      },
      {
        field: 'actions',
        headerName: '작업',
        width: 140,
        renderCell: (params: any) => {
          const disabled = !params.row.matchedReceiptId;
          const button = (
            <Button
              variant="outlined"
              size="small"
              disabled={disabled}
              onClick={() => onUnmatchRequest(params.row)}
            >
              매칭 해제
            </Button>
          );

          return disabled ? (
            <Tooltip title="미매칭 수령 건과 연결되지 않은 송장입니다.">{button}</Tooltip>
          ) : (
            button
          );
        },
      },
    ],
    [onUnmatchRequest, onViewRequest],
  );

  return (
    <DataGrid
      sx={{ height: 'auto', background: 'white', fontSize: 14 }}
      rows={(receipts || []).map((receipt) => ({
        id: receipt.shippingId || receipt.requestId,
        ...receipt,
      }))}
      columns={columns}
      pageSizeOptions={[20, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  );
}

function UnmatchedReceiptsTable({
  receipts,
  isLoading,
  selectedUnmatchedId,
  onSelectUnmatched,
}: {
  receipts: UnmatchedReceiptDetail[];
  isLoading: boolean;
  selectedUnmatchedId: number | null;
  onSelectUnmatched: (id: number | null) => void;
}) {

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'select',
        headerName: '선택',
        width: 80,
        renderCell: (params: any) => (
          <Radio
            checked={selectedUnmatchedId === params.row.id}
            onChange={() =>
              onSelectUnmatched(
                selectedUnmatchedId === params.row.id ? null : params.row.id,
              )
            }
          />
        ),
      },
      {
        field: 'id',
        headerName: 'ID',
        width: 80,
      },
      {
        field: 'trackingNumber',
        headerName: '송장번호',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'shippingCompany',
        headerName: '택배사',
        width: 120,
      },
      {
        field: 'receivedAt',
        headerName: '수령일',
        width: 180,
        renderCell: (params: any) => formatDateTime(params.value),
      },
      {
        field: 'receivedBy',
        headerName: '수령자',
        width: 120,
      },
      {
        field: 'memo',
        headerName: '메모',
        flex: 0.8,
        minWidth: 150,
      },
    ],
    [onSelectUnmatched, selectedUnmatchedId],
  );

  const rows = (receipts || []).map((receipt) => ({
    id: receipt.id,
    trackingNumber: receipt.trackingNumber,
    shippingCompany: receipt.shippingCompany,
    receivedAt: receipt.receivedAt,
    receivedBy: receipt.receivedBy,
    memo: receipt.memo,
  }));

  return (
    <DataGrid
      sx={{ height: 'auto', background: 'white', fontSize: 14 }}
      rows={rows}
      columns={columns}
      pageSizeOptions={[20, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  );
}

function SearchRequestsTable({
  searchKeyword,
  selectedRequestId,
  onSelectRequest,
}: {
  searchKeyword: string;
  selectedRequestId: number | null;
  onSelectRequest: (id: number | null) => void;
}) {
  const debouncedKeyword = useDebouncedValue(searchKeyword.trim(), 400);
  const { data: searchResults, isLoading } = useSearchRequests(debouncedKeyword);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'select',
        headerName: '선택',
        width: 80,
        renderCell: (params: any) => (
          <Radio
            checked={selectedRequestId === params.row.requestId}
            onChange={() =>
              onSelectRequest(
                selectedRequestId === params.row.requestId ? null : params.row.requestId,
              )
            }
          />
        ),
      },
      {
        field: 'requestId',
        headerName: '신청 ID',
        width: 90,
      },
      {
        field: 'userName',
        headerName: '신청자',
        width: 100,
      },
      {
        field: 'userEmail',
        headerName: '이메일',
        flex: 1,
        minWidth: 180,
      },
      {
        field: 'phoneNumber',
        headerName: '연락처',
        width: 130,
      },
      {
        field: 'eventTitle',
        headerName: '행사명',
        flex: 0.8,
        minWidth: 150,
      },
      {
        field: 'albumTitle',
        headerName: '음반명',
        flex: 0.8,
        minWidth: 150,
      },
    ],
    [onSelectRequest, selectedRequestId],
  );

  const rows = (searchResults || []).map((request: any) => ({
    id: request.requestId,
    requestId: request.requestId,
    userName: request.userName,
    userEmail: request.userEmail,
    phoneNumber: request.phoneNumber,
    eventTitle: request.eventTitle,
    albumTitle: request.albumTitle,
  }));

  return (
    <DataGrid
      sx={{ height: 'auto', background: 'white', fontSize: 14 }}
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 20, 50]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  );
}

function TrackingNumbersList({
  trackingNumbers,
  highlightTrackingNumber,
}: {
  trackingNumbers?: TrackingNumberInfo[];
  highlightTrackingNumber?: string;
}) {
  if (!trackingNumbers?.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        등록된 송장 정보가 없습니다.
      </Typography>
    );
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {trackingNumbers.map((tracking) => {
        const isHighlight = highlightTrackingNumber === tracking.trackingNumber;
        return (
          <Chip
            key={tracking.trackingNumberId}
            size="small"
            label={`${tracking.trackingNumber} · ${tracking.shippingCompany}`}
            color={
              isHighlight ? 'secondary' : tracking.isMatched ? 'default' : 'warning'
            }
            variant={tracking.isMatched ? 'outlined' : 'filled'}
            sx={{ fontWeight: isHighlight ? 600 : undefined }}
          />
        );
      })}
    </Stack>
  );
}

function MatchContextPanel({
  unmatchedReceipt,
  requestDetail,
  requestLoading,
  onClearRequest,
}: {
  unmatchedReceipt: UnmatchedReceiptDetail | undefined;
  requestDetail: AlbumPurchaseRequestDetail | undefined;
  requestLoading: boolean;
  onClearRequest: () => void;
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              선택된 미매칭 송장
            </Typography>
            {unmatchedReceipt ? (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                alignItems="flex-start"
              >
                <Chip
                  color="primary"
                  label={`송장번호 ${unmatchedReceipt.trackingNumber}`}
                />
                <Chip
                  variant="outlined"
                  label={`택배사 ${unmatchedReceipt.shippingCompany}`}
                />
                <Chip
                  variant="outlined"
                  label={`수령일 ${formatDateTime(unmatchedReceipt.receivedAt)}`}
                />
                <Chip
                  variant="outlined"
                  label={`수령자 ${unmatchedReceipt.receivedBy}`}
                />
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                미매칭 송장을 선택하면 상세 정보가 표시됩니다.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                매칭할 매입 신청
              </Typography>
              {requestDetail && (
                <Stack direction="row" spacing={1}>
                  <Button
                    component={Link}
                    href={`/album-purchase/requests/${requestDetail.requestId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    상세 보기
                  </Button>
                  <Button size="small" onClick={onClearRequest}>
                    선택 해제
                  </Button>
                </Stack>
              )}
            </Stack>

            {requestLoading && (
              <Box sx={{ py: 1 }}>
                <LinearProgress />
              </Box>
            )}

            {!requestDetail && !requestLoading && (
              <Typography variant="body2" color="text.secondary">
                신청을 선택하면 등록된 송장 정보를 바로 확인할 수 있습니다.
              </Typography>
            )}

            {requestDetail && (
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    #{requestDetail.requestId} · {requestDetail.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {requestDetail.userEmail} · {requestDetail.phoneNumber || '연락처 없음'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {requestDetail.eventTitle || '행사 정보 없음'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    등록된 송장번호
                  </Typography>
                  <TrackingNumbersList
                    trackingNumbers={requestDetail.trackingNumbers}
                    highlightTrackingNumber={unmatchedReceipt?.trackingNumber}
                  />
                </Box>
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ReceiptsPage() {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [tabValue, setTabValue] = useState<'matched' | 'unmatched'>('matched');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCompany, setShippingCompany] = useState<ShippingCompanyValue | ''>('');
  const [receivedBy, setReceivedBy] = useState('admin');
  const [scanMemo, setScanMemo] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUnmatchedId, setSelectedUnmatchedId] = useState<number | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [unmatchDialog, setUnmatchDialog] = useState<{ open: boolean; receipt: ShippingInfo | null; reason: string }>(
    { open: false, receipt: null, reason: '' },
  );

  const receiptsQuery = useGetReceipts({ isReceived: true });
  const unmatchedQuery = useGetUnmatchedReceipts({ isMatched: false });
  const {
    data: selectedRequestDetail,
    isFetching: isRequestDetailLoading,
    refetch: refetchRequestDetail,
  } = useGetRequestDetail(selectedRequestId ?? undefined);
  const selectedUnmatchedReceipt = useMemo(
    () =>
      unmatchedQuery.data?.find((receipt) => receipt.id === selectedUnmatchedId),
    [selectedUnmatchedId, unmatchedQuery.data],
  );

  const scanMutation = useScanReceipt();
  const matchMutation = useMatchUnmatchedReceipt();
  const unmatchMutation = useUnmatchReceipt();
  const operatorName = receivedBy || 'admin';

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber || !shippingCompany) {
      showSnackbar('송장번호와 택배사를 입력해주세요.', 'warning');
      return;
    }

    try {
      const result: ScanReceiptResponse = await scanMutation.mutateAsync({
        trackingNumber,
        shippingCompany,
        receivedBy: operatorName,
        memo: scanMemo || undefined,
      });

      if (result.matched) {
        showSnackbar(`매칭 성공! 매입 신청 ID: ${result.requestId}`, 'success');
      } else {
        showSnackbar('미매칭 수령 건으로 등록되었습니다.', 'info');
        setTabValue('unmatched');
      }

      setTrackingNumber('');
      setScanMemo('');
      receiptsQuery.refetch();
      unmatchedQuery.refetch();
    } catch (error: any) {
      showSnackbar(error?.message || '스캔에 실패했습니다.', 'error');
    }
  };

  const handleMatch = async () => {
    if (!selectedUnmatchedId || !selectedRequestId) {
      showSnackbar('미매칭 수령 건과 매입 신청을 선택해주세요.', 'warning');
      return;
    }

    try {
      await matchMutation.mutateAsync({
        unmatchedReceiptId: selectedUnmatchedId,
        requestData: {
          requestId: selectedRequestId,
          matchedBy: operatorName,
          trackingNumber: selectedUnmatchedReceipt?.trackingNumber,
        },
      });
      showSnackbar('매칭 완료!', 'success');
      setSelectedUnmatchedId(null);
      receiptsQuery.refetch();
      unmatchedQuery.refetch();
      if (selectedRequestId) {
        refetchRequestDetail();
      }
    } catch (error: any) {
      showSnackbar(error?.message || '매칭에 실패했습니다.', 'error');
    }
  };

  const handleRequestUnmatch = useCallback((receipt: ShippingInfo) => {
    setUnmatchDialog({ open: true, receipt, reason: '' });
  }, []);

  const handleConfirmUnmatch = async () => {
    if (!unmatchDialog.receipt?.matchedReceiptId) {
      setUnmatchDialog({ open: false, receipt: null, reason: '' });
      return;
    }

    try {
      await unmatchMutation.mutateAsync({
        unmatchedReceiptId: unmatchDialog.receipt.matchedReceiptId,
        requestData: {
          unmatchedBy: operatorName,
          reason: unmatchDialog.reason || undefined,
        },
      });
      showSnackbar('매칭을 해제했습니다.', 'success');
      setUnmatchDialog({ open: false, receipt: null, reason: '' });
      receiptsQuery.refetch();
      unmatchedQuery.refetch();
      if (
        unmatchDialog.receipt?.requestId &&
        unmatchDialog.receipt.requestId === selectedRequestId
      ) {
        refetchRequestDetail();
      }
    } catch (error: any) {
      showSnackbar(error?.message || '매칭 해제에 실패했습니다.', 'error');
    }
  };

  const handleSelectUnmatched = useCallback((id: number | null) => {
    setSelectedUnmatchedId(id);
  }, []);

  const handleSelectRequest = useCallback((id: number | null) => {
    setSelectedRequestId(id);
  }, []);

  const handleClearRequestSelection = useCallback(() => {
    setSelectedRequestId(null);
  }, []);

  const handleViewRequest = useCallback(
    (requestId?: number) => {
      if (!requestId) {
        showSnackbar('연결된 매입 신청이 없습니다.', 'info');
        return;
      }
      window.open(`/album-purchase/requests/${requestId}`, '_blank', 'noopener,noreferrer');
    },
    [showSnackbar],
  );

  const disableMatchButton = !selectedUnmatchedId || !selectedRequestId;

  return (
    <Box sx={{ p: 3 }}>
      <SnackbarComponent />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        수령 처리
      </Typography>

      {/* 송장 스캔 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          송장 스캔
        </Typography>
        <Stack
          component="form"
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          onSubmit={handleScan}
        >
          <TextField
            placeholder="송장번호"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            select
            placeholder="택배사"
            value={shippingCompany}
            onChange={(e) =>
              setShippingCompany(e.target.value as ShippingCompanyValue | '')
            }
            size="small"
            sx={{ flex: 1 }}
          >
            <MenuItem value="">택배사를 선택해주세요</MenuItem>
            {SHIPPING_COMPANIES.map((company) => (
              <MenuItem key={company.value} value={company.value}>
                {company.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            placeholder="수령자"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            placeholder="메모"
            value={scanMemo}
            onChange={(e) => setScanMemo(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={scanMutation.isPending}
            startIcon={
              scanMutation.isPending && <CircularProgress size={16} color="inherit" />
            }
            sx={{ minWidth: 120 }}
          >
            {scanMutation.isPending ? '처리 중...' : '스캔'}
          </Button>
        </Stack>
      </Paper>

      {/* 탭 */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="매칭된 수령 건" value="matched" />
          <Tab label="미매칭 수령 건" value="unmatched" />
        </Tabs>
      </Paper>

      {/* 매칭된 수령 건 */}
      {tabValue === 'matched' && (
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}
          >
            매칭된 수령 건
          </Typography>
          <MatchedReceiptsTable
            receipts={receiptsQuery.data || []}
            isLoading={receiptsQuery.isLoading}
            onUnmatchRequest={handleRequestUnmatch}
            onViewRequest={handleViewRequest}
          />
        </Paper>
      )}

      {/* 미매칭 수령 건 + 매칭 기능 */}
      {tabValue === 'unmatched' && (
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={3}
          alignItems="stretch"
        >
          <Box flex={{ xs: 1, lg: 1.1 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}
              >
                미매칭 수령 건
              </Typography>
              <UnmatchedReceiptsTable
                receipts={unmatchedQuery.data || []}
                isLoading={unmatchedQuery.isLoading}
                selectedUnmatchedId={selectedUnmatchedId}
                onSelectUnmatched={handleSelectUnmatched}
              />
            </Paper>
          </Box>
          <Stack flex={{ xs: 1, lg: 0.9 }} spacing={3}>
            <MatchContextPanel
              unmatchedReceipt={selectedUnmatchedReceipt}
              requestDetail={selectedRequestDetail}
              requestLoading={isRequestDetailLoading}
              onClearRequest={handleClearRequestSelection}
            />
            <Paper sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
              >
                매칭할 매입 신청
              </Typography>
              {!selectedUnmatchedId && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  미매칭 송장을 먼저 선택하면 신청 선택 후 매칭할 수 있습니다.
                </Alert>
              )}
              <TextField
                fullWidth
                placeholder="신청자 이름, 이메일, 연락처로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
              <Box sx={{ flex: 1, mb: 2 }}>
                <SearchRequestsTable
                  searchKeyword={searchKeyword}
                  selectedRequestId={selectedRequestId}
                  onSelectRequest={handleSelectRequest}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleMatch}
                disabled={disableMatchButton || matchMutation.isPending}
                startIcon={
                  matchMutation.isPending && (
                    <CircularProgress size={16} color="inherit" />
                  )
                }
                sx={{
                  background: '#4caf50',
                  '&:hover': { background: '#45a049' },
                }}
              >
                {matchMutation.isPending ? '매칭 중...' : '매칭하기'}
              </Button>
            </Paper>
          </Stack>
        </Stack>
      )}

      <Dialog
        open={unmatchDialog.open}
        onClose={() => setUnmatchDialog({ open: false, receipt: null, reason: '' })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>매칭 해제</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            선택한 송장의 매칭을 해제하고 다시 미매칭 목록으로 돌려놓습니다.
          </Typography>
          <TextField
            label="해제 사유"
            multiline
            minRows={2}
            value={unmatchDialog.reason}
            onChange={(e) =>
              setUnmatchDialog((prev) => ({ ...prev, reason: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUnmatchDialog({ open: false, receipt: null, reason: '' })}
            disabled={unmatchMutation.isPending}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmUnmatch}
            disabled={unmatchMutation.isPending}
            startIcon={
              unmatchMutation.isPending && <CircularProgress size={16} color="inherit" />
            }
          >
            {unmatchMutation.isPending ? '해제 중...' : '해제하기'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
