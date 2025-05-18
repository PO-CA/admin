'use client';
import CartList from '../(components)/cartList/cartList';
import ProductList from '../(components)/productList/productList';
import { Box } from '@mui/material';

export default function Store() {
  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ width: '65%' }}>
          <ProductList />
        </Box>
        <Box sx={{ width: '35%' }}>
          <CartList />
        </Box>
      </Box>
    </Box>
  );
}
