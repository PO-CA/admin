'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatsTotal from './(components)/total';
import StatsByUsers from './(components)/byUsers';
import StatsByMonth from './(components)/byMonth';
import StatsByInCharge from './(components)/byInCharge';

export default function DashBoard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
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
        대시보드
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StatsTotal />
        <StatsByUsers />
        <StatsByMonth />
        <StatsByInCharge />
      </Box>
    </Box>
  );
}
