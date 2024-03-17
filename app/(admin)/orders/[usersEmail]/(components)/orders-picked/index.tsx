'use client';
import React, { useEffect } from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import TanTable, { fuzzyFilter } from '@/components/table';
import styles from './index.module.css';
import tableStyles from './table.module.css';
import {
  useGetAllPickedOrderByUsersEmail,
  usePutToUnPickOrderItem,
} from '@/query/query/orders';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import { useCreateShipping } from '@/query/query/shippings';

export default function OrdersPicked({ usersEmail }: any) {
  const { userEmail } = useAuth();
  const {
    data: pickedOrderItemsData,
    isLoading: isPickedOrderItemsLoading,
    isSuccess: isPickedOrderItemsSuccess,
  } = useGetAllPickedOrderByUsersEmail(usersEmail);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: pickedOrderItemsData,
    columns: orderItemsColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  let selectedRows: any = null;
  if (!isPickedOrderItemsLoading && isPickedOrderItemsSuccess) {
    selectedRows = table.getSelectedRowModel().rows;
  }

  useEffect(() => {
    if (selectedRows !== null) {
      if (!isPickedOrderItemsLoading && isPickedOrderItemsSuccess) {
        setSelectedRowIds(selectedRows.map((row: any) => row.original.id));
      }
    }
  }, [
    table,
    isPickedOrderItemsLoading,
    isPickedOrderItemsSuccess,
    selectedRows,
  ]);

  const { mutateAsync: putToUnPickOrderItem } = usePutToUnPickOrderItem();
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(userEmail);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShippingDTO>({
    mode: 'onChange',
    defaultValues: {
      shippingFee: 0,
    },
  });

  const { mutateAsync: createShipping } = useCreateShipping();

  const onSubmit: SubmitHandler<CreateShippingDTO> = (data) => {
    if (selectedRowIds.length < 1)
      return alert('배송처리할 주문을 선택해 주세요');
    if (Number(data.shippingFee) < 0)
      return alert('올바른 배송비를 작성해 주세요.');
    data.usersEmail = userEmail;
    data.orderItemsIds = selectedRowIds;
    console.log('data', data);

    createShipping(data);
    reset({
      shippingFee: 0,
      memo: '',
      trackingNumber: '',
    });
    setSelectedRowIds([]);
  };
  return (
    <>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            if (selectedRowIds.length > 0) {
              putToUnPickOrderItem(selectedRowIds);
            } else {
              alert('포장 해제할 주문을 선택해 주세요');
            }
          }}
        >
          포장 해제
        </button>
        <button>주문 삭제</button>
      </div>
      {!isPickedOrderItemsLoading && isPickedOrderItemsSuccess && (
        <TanTable
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          styles={tableStyles}
          sort
          search
          filter
          pagenation
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.subTitle}>주문처리</div>

        <div style={{ display: 'flex' }}>
          {!isPickedOrderItemsLoading && isPickedOrderItemsSuccess && (
            <div>총 {table.getSelectedRowModel().rows.length} 개</div>
          )}
          <div>
            <div>배송방법</div>
            <select {...register('shippingType')}>
              <option value="택배">택배</option>
              <option value="퀵">퀵</option>
            </select>
          </div>
          <div>
            <div>송장번호</div>
            <input {...register('trackingNumber')} />
          </div>
          <div>
            <div>배송지</div>
            {!isAddressLoading &&
              isAddressSuccess &&
              addressData &&
              addressData.length > 0 && (
                <select {...register('addressId')}>
                  {addressData.map((address: any) => (
                    <option defaultChecked key={address.id} value={address.id}>
                      {address.addressName}
                    </option>
                  ))}
                </select>
              )}
          </div>
          <div>
            <div>배송비</div>{' '}
            <input type="number" {...register('shippingFee')} />
          </div>
        </div>

        <button type="submit">주문 처리</button>
      </form>
    </>
  );
}
