'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { dcAmountColumns } from '../../tableColumns/dcAmountColumns';
import { useGetDCAmountByUsersEmail } from '@/query/query/dc';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function UserDcAmount({ usersEmail }: { usersEmail: string }) {
  const {
    data: dcAmountData,
    isLoading: isDcAmountLoading,
    isSuccess: isDcAmountSuccess,
  } = useGetDCAmountByUsersEmail(usersEmail);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!dcAmountData) return [];
    return dcAmountData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [dcAmountData]);

  if (isDcAmountLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isDcAmountSuccess) {
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
        columns={dcAmountColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          backgroundColor: 'white',
          fontSize: 14,
        }}
      />
    </Box>
  );
}
