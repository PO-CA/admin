'use client';
import React from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGetAllOrderByusersEmail } from '@/query/api/orders';
import TableLoader from '@/components/tableLoader';

export default function UserOrders({ usersEmail }: any) {
  const {
    data: orderItemsData,
    isLoading: isOrderItemsLoading,
    isSuccess: isOrderItemsSuccess,
  } = useGetAllOrderByusersEmail(usersEmail);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  if (isOrderItemsLoading) {
    return <TableLoader />;
  }

  if (!isOrderItemsSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={orderItemsData || []}
        columns={orderItemsColumns}
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
