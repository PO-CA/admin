'use client';

import { useGetAllUsersWithOrderItemsQty } from '@/query/query/users';
import React from 'react';
import { ordersColumns } from '../tableColumns/ordersColumns';
import TanTable from '@/components/table';

export default function UserListWithOrderQty() {
  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useGetAllUsersWithOrderItemsQty();
  return (
    !isUserLoading &&
    isUserSuccess && <TanTable data={userData} columns={ordersColumns} />
  );
}
