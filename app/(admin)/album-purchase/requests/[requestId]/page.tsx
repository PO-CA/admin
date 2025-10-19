'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import {
  useGetRequestDetail,
  useAcceptRequest,
  useRejectRequest,
  useProposePrice,
} from '@/query/query/album-purchase/requests';
import { useSnackbar } from '../../_components/useSnackbar';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = Number(params.requestId);
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const { data: request, isLoading } = useGetRequestDetail(requestId);
  const acceptMutation = useAcceptRequest();
  const rejectMutation = useRejectRequest();
  const proposeMutation = useProposePrice();

  const [rejectionReason, setRejectionReason] = useState('');
  const [proposedPrice, setProposedPrice] = useState('');
  const [proposalNote, setProposalNote] = useState('');

  const handleAccept = async () => {
    if (confirm('이 매입 신청을 수락하시겠습니까?')) {
      try {
        await acceptMutation.mutateAsync({
          requestId,
          requestData: { reviewerNote: '수락됨' },
        });
        showSnackbar('수락되었습니다.', 'success');
        setTimeout(() => router.refresh(), 1000);
      } catch (error: any) {
        showSnackbar(error?.message || '수락에 실패했습니다.', 'error');
      }
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showSnackbar('거절 사유를 입력해주세요.', 'warning');
      return;
    }
    if (confirm('이 매입 신청을 거절하시겠습니까?')) {
      try {
        await rejectMutation.mutateAsync({
          requestId,
          requestData: { rejectionReason },
        });
        showSnackbar('거절되었습니다.', 'success');
        setTimeout(() => router.refresh(), 1000);
      } catch (error: any) {
        showSnackbar(error?.message || '거절에 실패했습니다.', 'error');
      }
    }
  };

  const handlePropose = async () => {
    if (!proposedPrice.trim()) {
      showSnackbar('제안 가격을 입력해주세요.', 'warning');
      return;
    }
    if (confirm('가격을 제안하시겠습니까?')) {
      try {
        await proposeMutation.mutateAsync({
          requestId,
          requestData: {
            proposedPrice: Number(proposedPrice),
            proposalNote,
            proposedBy: 'admin',
          },
        });
        showSnackbar('가격이 제안되었습니다.', 'success');
        setTimeout(() => router.refresh(), 1000);
      } catch (error: any) {
        showSnackbar(error?.message || '가격 제안에 실패했습니다.', 'error');
      }
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!request) {
    return <div>요청을 찾을 수 없습니다.</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <SnackbarComponent />
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        매입 신청 상세
      </Typography>

      {/* 신청 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          신청 정보
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              신청 ID
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.requestId}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              상태
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.status}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              총 평가 금액
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              ₩{request.totalEvaluatedPrice.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              총 수량
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.totalEvaluatedStock}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 신청자 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          신청자 정보
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              이름
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.userName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              이메일
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.userEmail}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              연락처
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.phoneNumber}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              주소
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.address} {request.addressDetail} ({request.zipcode})
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              은행
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.bankName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              계좌번호
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {request.bankAccountNumber}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 아이템 목록 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          아이템 목록
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>순서</TableCell>
              <TableCell>음반명</TableCell>
              <TableCell>아티스트</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell align="right">평가 가격</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request.items.map((item) => (
              <TableRow key={item.requestItemId}>
                <TableCell>{item.itemOrder}</TableCell>
                <TableCell>{item.albumTitle}</TableCell>
                <TableCell>{item.albumArtist}</TableCell>
                <TableCell>{item.albumIsbn}</TableCell>
                <TableCell align="right">
                  ₩{item.evaluatedPrice.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 배송 정보 */}
      {request.shippings && request.shippings.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            배송 정보
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>송장번호</TableCell>
                <TableCell>택배사</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>수령 여부</TableCell>
                <TableCell>수령일</TableCell>
                <TableCell>수령자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.shippings.map((shipping) => (
                <TableRow key={shipping.shippingId}>
                  <TableCell>{shipping.trackingNumber}</TableCell>
                  <TableCell>{shipping.shippingCompany}</TableCell>
                  <TableCell>{shipping.actualQuantity}</TableCell>
                  <TableCell>{shipping.isReceived ? '완료' : '대기'}</TableCell>
                  <TableCell>
                    {shipping.receivedAt
                      ? new Date(shipping.receivedAt).toLocaleString()
                      : '-'}
                  </TableCell>
                  <TableCell>{shipping.receivedBy || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* 가격조정 필요 상태일 때 액션 */}
      {request.status === 'NEED_NEGOTIATION' && (
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            매입 신청 처리
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleAccept}
              disabled={acceptMutation.isPending}
              sx={{
                background: '#4caf50',
                '&:hover': { background: '#45a049' },
              }}
              startIcon={
                acceptMutation.isPending && (
                  <CircularProgress size={16} color="inherit" />
                )
              }
            >
              {acceptMutation.isPending ? '처리 중...' : '수락'}
            </Button>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="거절 사유"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                size="small"
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                disabled={rejectMutation.isPending}
                startIcon={
                  rejectMutation.isPending && (
                    <CircularProgress size={16} color="inherit" />
                  )
                }
                sx={{ minWidth: 120 }}
              >
                {rejectMutation.isPending ? '처리 중...' : '거절'}
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                type="number"
                placeholder="제안 가격"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                size="small"
                sx={{ width: 150 }}
              />
              <TextField
                fullWidth
                placeholder="제안 메모"
                value={proposalNote}
                onChange={(e) => setProposalNote(e.target.value)}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handlePropose}
                disabled={proposeMutation.isPending}
                sx={{
                  background: '#ff9800',
                  '&:hover': { background: '#e68900' },
                  minWidth: 120,
                }}
                startIcon={
                  proposeMutation.isPending && (
                    <CircularProgress size={16} color="inherit" />
                  )
                }
              >
                {proposeMutation.isPending ? '처리 중...' : '가격 제안'}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
