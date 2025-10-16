'use client';

import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPreReleaseOrderSummary } from '@/query/query/b2b/pre-release';
import PreReleaseDownload from './(components)/PreReleaseDownload';

function PreReleaseOrderTable() {
  const { data, isLoading } = useGetPreReleaseOrderSummary();

  const columns: GridColDef[] = [
    {
      field: 'productId',
      headerName: '앨범 ID',
      flex: 0.5,
    },
    {
      field: 'productTitle',
      headerName: '앨범명',
      flex: 1.5,
    },
    {
      field: 'versionName',
      headerName: '버전',
      flex: 1,
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
    id: `${item.productId}-${item.versionId}` || idx,
    productId: item.productId,
    productTitle: item.productTitle,
    versionId: item.versionId,
    versionName: item.versionName,
    totalQty: item.totalQty,
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

export default function PreReleasePage() {
  const { data, isLoading } = useGetPreReleaseOrderSummary();

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
        신보 주문 집계 (버전별)
        <Box sx={{ ml: 2 }}>
          <PreReleaseDownload data={data} isLoading={isLoading} />
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
        <PreReleaseOrderTable />
      </Paper>
    </Box>
  );
}
