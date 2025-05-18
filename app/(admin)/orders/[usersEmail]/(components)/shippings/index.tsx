'use client';
import React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { shippingColumns } from '@/app/(admin)/shippings/(components)/tableColumns/shippingColumns';
import { useGetAllShippingsByUsersEmail } from '@/query/query/shippings';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function UserShippings({ usersEmail }: { usersEmail: string }) {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByUsersEmail(usersEmail);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!shippingData) return [];
    return shippingData.map((row: any, idx: number) => ({
      id: row.id || idx,
      ...row,
    }));
  }, [shippingData]);

  if (isShippingLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isShippingSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Failed to load data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 600 }}>
      <DataGrid
        rows={rows}
        columns={shippingColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
        loading={isShippingLoading}
        sx={{
          backgroundColor: 'white',
          fontSize: 14,
        }}
      />
    </Box>
  );
}
