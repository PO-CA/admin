'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import {
  useScanReceipt,
  useGetUnmatchedReceipts,
  useMatchUnmatchedReceipt,
  useSearchRequests,
} from '@/query/query/album-purchase/receipts';
import { useSnackbar } from '../_components/useSnackbar';

export default function ReceiptsPage() {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
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
  const { data: unmatchedReceipts, refetch: refetchUnmatched } =
    useGetUnmatchedReceipts();
  const matchMutation = useMatchUnmatchedReceipt();
  const { data: searchResults } = useSearchRequests(searchKeyword);

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
      } else {
        showSnackbar('미매칭 수령 건으로 등록되었습니다.', 'info');
      }

      setTrackingNumber('');
      setShippingCompany('');
      refetchUnmatched();
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

      {/* 미매칭 수령 건 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          미매칭 수령 건 ({unmatchedReceipts?.length || 0}건)
        </Typography>
        {unmatchedReceipts && unmatchedReceipts.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">선택</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>송장번호</TableCell>
                <TableCell>택배사</TableCell>
                <TableCell>수령일</TableCell>
                <TableCell>수령자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unmatchedReceipts.map((receipt) => (
                <TableRow key={receipt.id} hover>
                  <TableCell padding="checkbox">
                    <Radio
                      checked={selectedUnmatchedId === receipt.id}
                      onChange={() => setSelectedUnmatchedId(receipt.id)}
                    />
                  </TableCell>
                  <TableCell>{receipt.id}</TableCell>
                  <TableCell>{receipt.trackingNumber}</TableCell>
                  <TableCell>{receipt.shippingCompany}</TableCell>
                  <TableCell>
                    {new Date(receipt.receivedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{receipt.receivedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', py: 4 }}
          >
            미매칭 수령 건이 없습니다.
          </Typography>
        )}
      </Paper>

      {/* 매칭할 신청 검색 */}
      {selectedUnmatchedId && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            매칭할 신청 검색
          </Typography>
          <TextField
            fullWidth
            placeholder="신청자 이름, 이메일, 연락처로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />

          {searchResults && searchResults.length > 0 && (
            <Table size="small" sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">선택</TableCell>
                  <TableCell>신청 ID</TableCell>
                  <TableCell>신청자</TableCell>
                  <TableCell>이메일</TableCell>
                  <TableCell>연락처</TableCell>
                  <TableCell>행사명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((request) => (
                  <TableRow key={request.requestId} hover>
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedRequestId === request.requestId}
                        onChange={() => setSelectedRequestId(request.requestId)}
                      />
                    </TableCell>
                    <TableCell>{request.requestId}</TableCell>
                    <TableCell>{request.userName}</TableCell>
                    <TableCell>{request.userEmail}</TableCell>
                    <TableCell>{request.phoneNumber}</TableCell>
                    <TableCell>{request.eventTitle}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
    </Box>
  );
}
