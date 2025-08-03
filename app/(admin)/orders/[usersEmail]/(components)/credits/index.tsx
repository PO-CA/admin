'use client';
import React, { useCallback, useState } from 'react';
import { useGetCreditsByUsersEmail } from '@/query/query/credit';
import { DataGrid } from '@mui/x-data-grid';
import AddCredit from '../addCredit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function Credits({ usersEmail }: { usersEmail: string }) {
  const { data: creditData, isLoading: isCreditLoading } =
    useGetCreditsByUsersEmail(usersEmail);

  const handleDown = useCallback(() => {
    const data = [
      ['날짜', '내용', '플러스', '마이너스', '잔액', '메모'],
      ...creditData.map((item: any) => [
        item.createdAt.slice(0, 10),
        item.content || '',
        item.plus || 0,
        item.minus || 0,
        item.balance || 0,
        item.memo || '',
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // @ts-ignore
    const excelButter = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelFile = new Blob([excelButter], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(excelFile, '크레딧.xlsx');
  }, [creditData]);

  const columns = [
    {
      field: 'createdAt',
      headerName: '날짜',
      // flex: 1,
      width: 100,
      valueGetter: (params: any) => params?.slice(0, 10),
    },
    {
      field: 'content',
      headerName: '내용',
      // flex: 1,
      width: 200,
    },
    {
      field: 'plus',
      headerName: '➕',
      // flex: 1,
      width: 100,
    },
    {
      field: 'minus',
      headerName: '➖',
      // flex: 1,
      width: 100,
    },
    {
      field: 'balance',
      headerName: '잔액',
      // flex: 1,
      width: 100,
    },
    {
      field: 'memo',
      headerName: '메모',
      // flex: 1,
      width: 200,
    },
  ];

  const rows = (creditData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ fontWeight: 600, borderRadius: 2, marginBottom: 2 }}
        onClick={handleDown}
        disabled={isCreditLoading}
      >
        크레딧 목록 받기
      </Button>
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
