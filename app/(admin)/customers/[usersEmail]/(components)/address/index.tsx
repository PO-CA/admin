'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { addressColumns } from '../../tableColumns/addressColumns';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function UserAddress({ usersEmail }: { usersEmail: string }) {
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(usersEmail);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!addressData) return [];
    return addressData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [addressData]);

  if (isAddressLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAddressSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Failed to load data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        rows={rows}
        columns={addressColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: 'white',
          fontSize: 14,
        }}
      />
    </Box>
  );
}
