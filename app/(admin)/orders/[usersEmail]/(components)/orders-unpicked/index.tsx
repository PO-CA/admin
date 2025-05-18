'use client';
import {
  useGetAllUnpickedOrderByusersEmail,
  usePutToCancelOrderItem,
  usePutToPickOrderItem,
} from '@/query/query/orders';
import React, { useState } from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';

export default function OrdersUnpicked({ usersEmail }: any) {
  const {
    data: unpickedOrderItemsData,
    isLoading: isUnpickedOrderItemsLoading,
  } = useGetAllUnpickedOrderByusersEmail(usersEmail);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const {
    mutateAsync: putToPickOrderItem,
    isPending: isPutToPickOrderItemPending,
  } = usePutToPickOrderItem();
  const { mutateAsync: cancelOrderItem } = usePutToCancelOrderItem();

  const rows = (unpickedOrderItemsData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  const handlePickOrders = () => {
    if (selectedRows.length > 0) {
      putToPickOrderItem(selectedRows);
    } else {
      alert('포장 처리할 주문을 선택해 주세요');
    }
  };

  const handleCancelOrders = () => {
    if (selectedRows.length > 0) {
      cancelOrderItem(selectedRows);
    } else {
      alert('취소할 주문을 선택해 주세요');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePickOrders}
          size="small"
          disabled={isPutToPickOrderItemPending}
        >
          {isPutToPickOrderItemPending ? '포장 처리중...' : '포장 처리'}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancelOrders}
          size="small"
        >
          주문 삭제
        </Button>
      </Stack>

      <DataGrid
        sx={{
          height: 'auto',
          background: 'white',
          fontSize: 14,
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        }}
        rows={rows}
        columns={orderItemsColumns}
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          let selectedIds: number[] = [];

          if (Array.isArray(newSelectionModel)) {
            selectedIds = newSelectionModel.map((id) =>
              typeof id === 'string' ? parseInt(id, 10) : Number(id),
            );
          } else if (
            newSelectionModel &&
            typeof newSelectionModel === 'object'
          ) {
            if (newSelectionModel.ids && newSelectionModel.ids instanceof Set) {
              selectedIds = Array.from(newSelectionModel.ids).map((id) =>
                typeof id === 'string' ? parseInt(id, 10) : Number(id),
              );
            }
          }

          setSelectedRows(selectedIds);
        }}
        loading={isUnpickedOrderItemsLoading}
        disableRowSelectionOnClick={false}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
      />
    </Box>
  );
}
