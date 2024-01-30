'use client';

import { useGetAllPickedOrderByUserNickname } from '@/query/query/orders';
import React from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import TanTable from '@/components/table';

export default function OrdersPicked({ userNickname }: any) {
  const {
    data: pickedOrderItemsData,
    isLoading: isPickedOrderItemsLoading,
    isSuccess: isPickedOrderItemsSuccess,
  } = useGetAllPickedOrderByUserNickname(userNickname);
  return (
    !isPickedOrderItemsLoading &&
    isPickedOrderItemsSuccess && (
      <TanTable data={pickedOrderItemsData} columns={orderItemsColumns} />
    )
  );
}
