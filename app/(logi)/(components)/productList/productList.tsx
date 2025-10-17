'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { productColumns } from '../tableColumns/productColumns';
import { useGetUsersReleasedProducts } from '@/query/query/products';
import { useAuth } from '@/hooks/useAuth';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
} from '@mui/material';

export default function ProductList() {
  const { userId } = useAuth();
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetUsersReleasedProducts(userId || null);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!productsData) return [];
    return productsData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [productsData]);

  if (isProductsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isProductsSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">데이터를 불러오지 못했습니다.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{}}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        상품 목록 (구보)
      </Typography>

      <Paper sx={{}}>
        <DataGrid
          rows={rows}
          columns={productColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionOnClick
          rowHeight={100}
          showToolbar
          sx={{
            backgroundColor: 'white',
            fontSize: 14,
            '& .MuiDataGrid-cell': {
              alignItems: 'center',
            },
            minHeight: 500,
          }}
        />
      </Paper>
    </Container>
  );
}
