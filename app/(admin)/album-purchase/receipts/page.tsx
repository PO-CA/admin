'use client';

import { useState, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  useScanReceipt,
  useGetReceipts,
  useGetUnmatchedReceipts,
  useMatchUnmatchedReceipt,
  useSearchRequests,
} from '@/query/query/album-purchase/receipts';
import { useSnackbar } from '../_components/useSnackbar';

function MatchedReceiptsTable() {
  const { data: receipts, isLoading } = useGetReceipts({ isReceived: true });

  const columns: GridColDef[] = [
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
      renderCell: (params: any) => {
        return params.value ? new Date(params.value).toLocaleString() : '-';
      },
    },
    {
      field: 'receivedBy',
      headerName: '수령자',
      width: 120,
    },
  ];

  const rows = (receipts || []).map((receipt: any) => ({
    id: receipt.shippingId || receipt.id,
    shippingId: receipt.shippingId || receipt.id,
    trackingNumber: receipt.trackingNumber,
    shippingCompany: receipt.shippingCompany,
    actualQuantity: receipt.actualQuantity,
    requestId: receipt.requestId,
    receivedAt: receipt.receivedAt,
    receivedBy: receipt.receivedBy,
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

function UnmatchedReceiptsTable({
  selectedUnmatchedId,
  onSelectUnmatched,
  onSuccess,
  onError,
}: {
  selectedUnmatchedId: number | null;
  onSelectUnmatched: (id: number | null) => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const { data: unmatchedReceipts, isLoading } = useGetUnmatchedReceipts();

  const columns: GridColDef[] = [
    {
      field: 'select',
      headerName: '선택',
      width: 80,
      renderCell: (params: any) => (
        <Radio
          checked={selectedUnmatchedId === params.row.id}
          onChange={() => onSelectUnmatched(params.row.id)}
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
      renderCell: (params: any) => {
        return new Date(params.value).toLocaleString();
      },
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
  ];

  const rows = (unmatchedReceipts || []).map((receipt: any) => ({
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
  const { data: searchResults, isLoading } = useSearchRequests(searchKeyword);

  const columns: GridColDef[] = [
    {
      field: 'select',
      headerName: '선택',
      width: 80,
      renderCell: (params: any) => (
        <Radio
          checked={selectedRequestId === params.row.requestId}
          onChange={() => onSelectRequest(params.row.requestId)}
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
  ];

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

export default function ReceiptsPage() {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCompany, setShippingCompany] = useState('');
  const [receivedBy, setReceivedBy] = useState('admin');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUnmatchedId, setSelectedUnmatchedId] = useState<number | null>(
    null,
  );
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );

  const scanMutation = useScanReceipt();
  const { refetch: refetchUnmatched } = useGetUnmatchedReceipts();
  const { refetch: refetchMatched } = useGetReceipts({ isReceived: true });
  const matchMutation = useMatchUnmatchedReceipt();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber || !shippingCompany) {
      showSnackbar('송장번호와 택배사를 입력해주세요.', 'warning');
      return;
    }

    try {
      const result = await scanMutation.mutateAsync({
        trackingNumber,
        shippingCompany,
        receivedBy,
      });

      if (result.matched) {
        showSnackbar(`매칭 성공! 매입 신청 ID: ${result.requestId}`, 'success');
        refetchMatched();
      } else {
        showSnackbar('미매칭 수령 건으로 등록되었습니다.', 'info');
        refetchUnmatched();
        setTabValue(1); // 미매칭 탭으로 이동
      }

      setTrackingNumber('');
      setShippingCompany('');
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
          matchedBy: 'admin',
        },
      });
      showSnackbar('매칭 완료!', 'success');
      setSelectedUnmatchedId(null);
      setSelectedRequestId(null);
      setSearchKeyword('');
      refetchUnmatched();
      refetchMatched();
    } catch (error: any) {
      showSnackbar(error?.message || '매칭에 실패했습니다.', 'error');
    }
  };

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
        <Box
          component="form"
          onSubmit={handleScan}
          sx={{ display: 'flex', gap: 2 }}
        >
          <TextField
            placeholder="송장번호"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            placeholder="택배사"
            value={shippingCompany}
            onChange={(e) => setShippingCompany(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            placeholder="수령자"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={scanMutation.isPending}
            startIcon={
              scanMutation.isPending && (
                <CircularProgress size={16} color="inherit" />
              )
            }
            sx={{ minWidth: 120 }}
          >
            {scanMutation.isPending ? '처리 중...' : '스캔'}
          </Button>
        </Box>
      </Paper>

      {/* 탭 */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="매칭된 수령 건" />
          <Tab label="미매칭 수령 건" />
        </Tabs>
      </Paper>

      {/* 매칭된 수령 건 */}
      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}
          >
            매칭된 수령 건
          </Typography>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            }
          >
            <MatchedReceiptsTable />
          </Suspense>
        </Paper>
      )}

      {/* 미매칭 수령 건 + 매칭 기능 */}
      {tabValue === 1 && (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}
            >
              미매칭 수령 건
            </Typography>
            <Suspense
              fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              }
            >
              <UnmatchedReceiptsTable
                selectedUnmatchedId={selectedUnmatchedId}
                onSelectUnmatched={setSelectedUnmatchedId}
                onSuccess={(msg) => showSnackbar(msg, 'success')}
                onError={(msg) => showSnackbar(msg, 'error')}
              />
            </Suspense>
          </Paper>

          {/* 매칭할 신청 검색 */}
          {selectedUnmatchedId && (
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
              >
                매칭할 매입 신청 검색
              </Typography>
              <TextField
                fullWidth
                placeholder="신청자 이름, 이메일, 연락처로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />

              {searchKeyword && (
                <Box sx={{ mb: 2 }}>
                  <Suspense
                    fallback={
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    }
                  >
                    <SearchRequestsTable
                      searchKeyword={searchKeyword}
                      selectedRequestId={selectedRequestId}
                      onSelectRequest={setSelectedRequestId}
                    />
                  </Suspense>
                </Box>
              )}

              {selectedRequestId && (
                <Button
                  variant="contained"
                  onClick={handleMatch}
                  disabled={matchMutation.isPending}
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
              )}
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}
