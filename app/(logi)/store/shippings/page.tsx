'use client';
import React from 'react';
import { useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAllShippingsByUsersEmail } from '@/query/query/shippings';
import { shippingColumns } from './(components)/tableColumns/shippingColumns';
import TableLoader from '@/components/tableLoader';
import { useGetMyInfo } from '@/query/query/users';

export default function Shippings() {
  const { data } = useGetMyInfo();

  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByUsersEmail(data?.userEmail);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  if (isShippingLoading) {
    return <TableLoader />;
  }

  if (!isShippingSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          borderBottom: '2px solid #eaeaea',
          pb: 1,
        }}
      >
        배송-목록
      </Typography>
      <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
        <DataGrid
          rows={shippingData || []}
          columns={shippingColumns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          rowHeight={100}
          showToolbar
          disableRowSelectionOnClick
          getRowId={(row) => row.id || row._id || Math.random().toString()}
          density="standard"
          autoHeight
          sx={{
            '& .MuiDataGrid-cell': {
              px: 2,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '2px solid #ddd',
            },
          }}
        />
      </Paper>
    </Container>
  );
}
