import {
  useGetTop5,
  useGetTotalQty,
  useGetTotalSell,
} from '@/query/query/stats';
import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => null,
});

export default function StatsTotal() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    data: totalSell,
    isLoading: isTotalSellLoading,
    isSuccess: isTotalSellSuccess,
  } = useGetTotalSell();

  const {
    data: totalQty,
    isLoading: isTotalQtyLoading,
    isSuccess: isTotalQtySuccess,
  } = useGetTotalQty();

  const {
    data: top5data,
    isLoading: isTop5Loading,
    isSuccess: isTop5Success,
  } = useGetTop5();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper
        sx={{
          width: '100%',
          p: 2,
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} mb={1}>
          전체
        </Typography>
        <Typography>
          총 매출액 :{' '}
          {!isTotalSellLoading &&
            isTotalSellSuccess &&
            totalSell &&
            totalSell.toLocaleString()}{' '}
          원
        </Typography>
        <Typography>
          총 판매수량 :{' '}
          {!isTotalQtyLoading &&
            isTotalQtySuccess &&
            totalQty &&
            totalQty.toLocaleString()}{' '}
          개
        </Typography>
      </Paper>
      <Paper
        sx={{
          width: '100%',
          p: 2,
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} mb={1}>
          전체 TOP 5
        </Typography>
        {!isTop5Loading &&
          isTop5Success &&
          top5data &&
          top5data.map((item: any, i: number) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                gap: 1,
                mb: 0.5,
                p: isMobile ? 1 : 0,
                flexDirection: isMobile ? 'column' : 'row',
                border: isMobile ? '1px solid' : 'none',
                borderColor: isMobile ? 'divider' : 'none',
                borderRadius: isMobile ? 1 : 0,
                justifyContent: isMobile ? 'center' : 'space-between',
              }}
            >
              <Typography sx={{ minWidth: 120, flex: 5.5, fontSize: 14 }}>
                앨범명 : {item.title}
              </Typography>
              <Typography sx={{ minWidth: 160, flex: 2.5, fontSize: 14 }}>
                총 매출액 : {item.totalSell.toLocaleString()} 원
              </Typography>
              <Typography sx={{ flex: 2, fontSize: 14 }}>
                총 판매수량 : {item.totalQty.toLocaleString()} 개
              </Typography>
            </Box>
          ))}
      </Paper>
    </Box>
  );
}
