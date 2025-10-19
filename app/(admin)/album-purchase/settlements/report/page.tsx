'use client';

import { useState, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetSettlementReport } from '@/query/query/album-purchase/settlements';

function ReportContent({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const { data: report, isLoading } = useGetSettlementReport(
    startDate,
    endDate,
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report) {
    return (
      <Typography variant="body1" sx={{ p: 3 }}>
        리포트 데이터를 불러올 수 없습니다.
      </Typography>
    );
  }

  const summaryCards = [
    {
      label: '총 정산 건수',
      value: `${report.totalSettlementCount}건`,
      color: 'primary',
    },
    { label: '완료', value: `${report.completedCount}건`, color: 'success' },
    { label: '대기', value: `${report.pendingCount}건`, color: 'warning' },
    {
      label: '총 정산액',
      value: `₩${report.totalAmount.toLocaleString()}`,
      color: 'primary',
    },
    {
      label: '완료 금액',
      value: `₩${report.completedAmount.toLocaleString()}`,
      color: 'success',
    },
    {
      label: '대기 금액',
      value: `₩${report.pendingAmount.toLocaleString()}`,
      color: 'warning',
    },
  ];

  return (
    <Box>
      {/* 요약 통계 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {summaryCards.map((card, idx) => (
          <Card key={idx} sx={{ boxShadow: 1 }}>
            <CardContent>
              <Typography color="text.secondary" fontSize={13} gutterBottom>
                {card.label}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={600}
                color={`${card.color}.main`}
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 월별 데이터 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          월별 정산 현황
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>년월</TableCell>
              <TableCell align="right">정산 건수</TableCell>
              <TableCell align="right">정산 금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.monthlyData && report.monthlyData.length > 0 ? (
              report.monthlyData.map((data) => (
                <TableRow key={`${data.year}-${data.month}`} hover>
                  <TableCell>
                    {data.year}년 {data.month}월
                  </TableCell>
                  <TableCell align="right">{data.settlementCount}건</TableCell>
                  <TableCell align="right">
                    ₩{data.totalAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body2" color="text.secondary">
                    데이터가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default function SettlementReportPage() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(
    firstDayOfMonth.toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState(
    lastDayOfMonth.toISOString().split('T')[0],
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          background: 'white',
          p: 2,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          mb: 2,
          fontSize: 18,
        }}
      >
        정산 리포트
      </Typography>

      {/* 날짜 선택 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}>
          조회 기간 설정
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="시작일"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <TextField
            label="종료일"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Box>
      </Paper>

      {/* 리포트 내용 */}
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <ReportContent startDate={startDate} endDate={endDate} />
      </Suspense>
    </Box>
  );
}
