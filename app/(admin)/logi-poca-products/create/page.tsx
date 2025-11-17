'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateLogiPocaProductForm from '../(components)/CreateLogiPocaProductForm';

export default function CreateLogiPocaProductPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Logi 포토카드 등록
      </Typography>

      <Box sx={{ maxWidth: 480 }}>
        <CreateLogiPocaProductForm />
      </Box>
    </Box>
  );
}
