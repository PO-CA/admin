'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LogiPocaProductTable from './(components)/LogiPocaProductTable';

export default function LogiPocaProductsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Logi 포토카드 목록
      </Typography>

      <LogiPocaProductTable />
    </Box>
  );
}
