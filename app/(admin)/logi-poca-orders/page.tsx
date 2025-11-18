'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useGetPocaOrderUsers } from '@/query/query/logiPocaStore';

const currency = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export default function LogiPocaOrdersPage() {
  const { data, isLoading, isError } = useGetPocaOrderUsers();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        포토카드 관리 - 유저별 주문목록
      </Typography>
      <Paper>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert severity="error">주문 고객 목록을 불러오지 못했습니다.</Alert>
        ) : data && data.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>이메일</TableCell>
                  <TableCell>닉네임</TableCell>
                  <TableCell align="right">미배송 주문</TableCell>
                  <TableCell align="right">주문 갯수</TableCell>
                  <TableCell align="right">총 주문 수량</TableCell>
                  <TableCell align="right">총 주문 금액</TableCell>
                  <TableCell align="right">크레딧</TableCell>
                  <TableCell align="center">할인율</TableCell>
                  <TableCell align="center">상세</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.userId} hover>
                    <TableCell>{user.userEmail}</TableCell>
                    <TableCell>{user.nickname ?? '-'}</TableCell>
                    <TableCell align="right">{user.pendingOrderCount ?? 0}</TableCell>
                    <TableCell align="right">{user.totalOrderCount ?? 0}</TableCell>
                    <TableCell align="right">{user.totalOrderQuantity ?? 0}</TableCell>
                    <TableCell align="right">
                      {currency.format(user.totalAmount ?? 0)}
                    </TableCell>
                    <TableCell align="right">
                      {currency.format(user.pocaCreditBalance ?? 0)}
                    </TableCell>
                    <TableCell align="center">{(user.pocaDiscountRate ?? 0).toFixed(0)}%</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        href={`/logi-poca-orders/${encodeURIComponent(user.userEmail)}`}
                        variant="outlined"
                        size="small"
                      >
                        상세 보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info" sx={{ m: 2 }}>
            주문한 고객이 없습니다.
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
