'use client';
import React, { useState } from 'react';
import { useGetCreditsByUsersEmail } from '@/query/query/credit';
import { DataGrid } from '@mui/x-data-grid';
import AddCredit from '../addCredit';
import Box from '@mui/material/Box';

export default function Credits({ usersEmail }: { usersEmail: string }) {
  const { data: creditData, isLoading: isCreditLoading } =
    useGetCreditsByUsersEmail(usersEmail);

  const columns = [
    {
      field: 'createdAt',
      headerName: '날짜',
      flex: 1,
      valueGetter: (params: any) => params?.slice(0, 10),
    },
    {
      field: 'content',
      headerName: '내용',
      flex: 1,
    },
    {
      field: 'plus',
      headerName: '➕',
      flex: 1,
    },
    {
      field: 'minus',
      headerName: '➖',
      flex: 1,
    },
    {
      field: 'balance',
      headerName: '잔액',
      flex: 1,
    },
    {
      field: 'memo',
      headerName: '메모',
      flex: 1,
    },
  ];

  const rows = (creditData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        sx={{ height: 'auto', background: 'white', fontSize: 14 }}
        rows={rows}
        columns={columns}
        loading={isCreditLoading}
        disableRowSelectionOnClick
        pageSizeOptions={[20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        showToolbar
      />
      <Box sx={{ mt: 2 }}>
        <AddCredit />
      </Box>
    </Box>
  );
}
