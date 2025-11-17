'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CreateLogiPocaProductForm from './(components)/CreateLogiPocaProductForm';
import LogiPocaProductTable from './(components)/LogiPocaProductTable';

export default function LogiPocaProductsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Logi 포토카드 관리
      </Typography>

      <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }}>
        <Box sx={{ flex: { lg: '0 0 360px' }, width: '100%' }}>
          <CreateLogiPocaProductForm />
        </Box>
        <Box sx={{ flex: 1 }}>
          <LogiPocaProductTable />
        </Box>
      </Stack>
    </Box>
  );
}
