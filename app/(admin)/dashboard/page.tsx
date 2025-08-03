'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatsTotal from './(components)/total';
import StatsByUsers from './(components)/byUsers';
import StatsByMonth from './(components)/byMonth';
import StatsByInCharge from './(components)/byInCharge';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DashBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography
        variant="h5"
        sx={{
          background: 'white',
          p: isMobile ? 1.5 : 2,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          mb: 2,
          fontSize: isMobile ? 16 : 18,
          borderRadius: 1,
        }}
      >
        대시보드
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 2 }}
      >
        <StatsTotal />
        <StatsByUsers />
        <StatsByMonth />
        <StatsByInCharge />
      </Box>
    </Box>
  );
}
