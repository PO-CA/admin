'use client';

import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetReleasedOrderSummary } from '@/query/query/b2b/old-release';
import ReleasedDownload from './(components)/ReleasedDownload';

function ReleasedOrderTable() {
  const { data, isLoading } = useGetReleasedOrderSummary();

  const columns: GridColDef[] = [
    {
      field: 'barcode',
      headerName: '바코드',
      flex: 1,
    },
    {
      field: 'artist',
      headerName: '아티스트',
      flex: 1,
    },
    {
      field: 'productTitle',
      headerName: '앨범명',
      flex: 2,
    },
    {
      field: 'version',
      headerName: '버전',
      flex: 0.7,
      renderCell: () => {
        return '';
      },
    },
    {
      field: 'totalQty',
      headerName: '수량',
      flex: 0.7,
      type: 'number',
      renderCell: (params: any) => {
        return params.value?.toLocaleString() || '0';
      },
    },
  ];

  const rows = (data || []).map((item: any, idx: number) => ({
    id: item.productId || idx,
    productId: item.productId,
    productTitle: item.productTitle,
    totalQty: item.totalQty,
    barcode: item.barcode,
    artist: item.artist,
    version: '',
  }));

  return (
    <DataGrid
      sx={{ height: 'auto', background: 'white', fontSize: 14 }}
      rows={rows}
      columns={columns}
      pageSizeOptions={[20, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  );
}

export default function OldReleasePage() {
  const { data, isLoading } = useGetReleasedOrderSummary();

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          background: 'white',
          p: 2,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          mb: 2,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        구보 주문 집계 (앨범별)
        <Box sx={{ ml: 2 }}>
          <ReleasedDownload data={data} isLoading={isLoading} />
        </Box>
      </Typography>
      <Paper
        sx={{
          background: 'white',
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <ReleasedOrderTable />
      </Paper>
    </Box>
  );
}
