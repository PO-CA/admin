'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { creditsColumns } from '../tableColumns/creditsColumns';
import { useGetCreditsByUsersEmail } from '@/query/query/credit';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Credits({ usersEmail }: { usersEmail: string }) {
  const {
    data: creditData,
    isLoading: isCreditLoading,
    isSuccess: isCreditSuccess,
  } = useGetCreditsByUsersEmail(usersEmail);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!creditData) return [];
    return creditData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [creditData]);

  if (isCreditLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!isCreditSuccess) {
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
        columns={creditsColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        disableRowSelectionOnClick
        autoHeight
        showToolbar
        sx={{
          backgroundColor: 'white',
          fontSize: 14,
          '& .MuiDataGrid-cell': {
            alignItems: 'center',
          },
        }}
      />
    </Box>
  );
}
