'use client';
import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { shippingColumns } from '../../../shippings/(components)/tableColumns/shippingColumns';
import TableLoader from '@/components/tableLoader';
import { useGetAllShippingsByUsersEmail } from '@/query/query/shippings';

export default function UserShippings({ usersEmail }: { usersEmail: string }) {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByUsersEmail(usersEmail);

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
    <Box sx={{ width: '100%' }}>
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
      />
    </Box>
  );
}
