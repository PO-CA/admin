'use client';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAllproducts } from '@/query/query/products';
import { importProductsColumns } from './importProductsColumns';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// 스타일링된 DataGrid
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    fontWeight: 600,
    display: 'flex !important',
  },
  '& .MuiDataGrid-columnHeadersInner': {
    display: 'flex !important',
  },
  '& .MuiDataGrid-columnHeader': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  '& .MuiDataGrid-cell': {
    padding: '8px 16px',
  },
  '& .MuiDataGrid-toolbarContainer': {
    padding: '8px 16px',
    backgroundColor: theme.palette.grey[100],
  },
}));

// 테이블 컨테이너
const TableContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

export default function ImportProducts() {
  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetAllproducts();

  // 로딩 상태
  if (isProductLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 오류 상태
  if (!isProductSuccess || !productData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">데이터를 불러오는데 실패했습니다.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <StyledDataGrid
        rows={productData}
        columns={importProductsColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        showToolbar
        rowHeight={100}
        getRowId={(row) => row.id || Math.random().toString()}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
        }}
      />
    </TableContainer>
  );
}
