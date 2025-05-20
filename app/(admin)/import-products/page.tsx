'use client';

import { Box, Container, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import React from 'react';
import AddOrderProduct from './(components)/addOrderProduct';
export default function ImportProducts() {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">상품 입고</Typography>
        <AddOrderProduct />
      </Paper>
    </Container>
  );
}
