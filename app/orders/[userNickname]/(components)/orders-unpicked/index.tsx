'use client';

import { useGetAllUnpickedOrderByUserNickname } from '@/query/query/orders';
import React from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import TanTable from '@/components/table';

export default function OrdersUnpicked({ userNickname }: any) {
  const {
    data: unpickedOrderItemsData,
    isLoading: isUnpickedOrderItemsLoading,
    isSuccess: isUnpickedOrderItemsSuccess,
  } = useGetAllUnpickedOrderByUserNickname(userNickname);
  return (
    !isUnpickedOrderItemsLoading &&
    isUnpickedOrderItemsSuccess && (
      <TanTable data={unpickedOrderItemsData} columns={orderItemsColumns} />
    )
  );
}
