import { useGetSellsWithMonth } from '@/query/query/stats';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function StatsByMonth() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const {
    data: monthData,
    isLoading: isMonthLoading,
    isSuccess: isMonthSuccess,
  } = useGetSellsWithMonth(year);

  return (
    <Paper
      sx={{
        background: 'white',
        p: 2,
        fontSize: 14,
        fontWeight: 500,
        border: '1px solid',
        borderColor: 'divider',
        m: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} mb={1}>
        월별
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{ width: 100 }}
          size="small"
        >
          {Array.from({ length: 5 }).map((_, idx) => {
            const y = currentYear - idx;
            return (
              <MenuItem key={y} value={y}>
                {y}년
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {!isMonthLoading && isMonthSuccess && monthData && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {monthData.map((item: any, i: number) => (
            <Box key={i} sx={{ mr: 2 }}>
              <Typography>{item.month} 월</Typography>
              <Typography>
                매출액: {item.totalSell.toLocaleString()} 원
              </Typography>
              <Typography>
                판매수량: {item.totalQty.toLocaleString()} 개
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
