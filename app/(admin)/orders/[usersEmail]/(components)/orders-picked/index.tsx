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
  usePutToCancelOrderItem,
  usePutToUnPickOrderItem,
} from '@/query/query/orders';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import { useCreateShipping } from '@/query/query/shippings';
import PrintPickingList from './(components)/printPickingList';

export default function OrdersPicked({ usersEmail }: any) {
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
    initialState: {
      pagination: { pageSize: 20, pageIndex: 0 },
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
  const { mutateAsync: cancelOrderItem } = usePutToCancelOrderItem();

  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(usersEmail);

  const {
    register,
    handleSubmit,
    reset,
    getFieldState,
    getValues,
    formState: { errors },
  } = useForm<CreateShippingDTO>({
    mode: 'onChange',
    defaultValues: {
      shippingFee: 0,
    },
  });

  const { mutateAsync: createShipping } = useCreateShipping();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  const onSubmit: SubmitHandler<CreateShippingDTO> = (data) => {
    if (selectedRowIds.length < 1)
      return alert('배송처리할 주문을 선택해 주세요');
    if (Number(data.shippingFee) < 0)
      return alert('올바른 배송비를 작성해 주세요.');
    data.usersEmail = usersEmail.replace('%40', '@');
    data.orderItemsIds = selectedRowIds;
    data.addressId = selectedOption;

    createShipping(data);
    reset({
      shippingFee: 0,
      memo: '',
      trackingNumber: '',
    });
    setSelectedRowIds([]);
  };

  const [selectedAddress, setSelectedAddress] = useState<any>({
    addressName: '',
    city: '',
    state: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  useEffect(() => {
    if (addressData)
      setSelectedAddress(
        addressData.find((address: any) => address.id === selectedOption),
      );
  }, [selectedOption, addressData]);
  return (
    <>
      <div className={styles.buttons}>
        {!isPickedOrderItemsLoading && isPickedOrderItemsSuccess && (
          <PrintPickingList table={table} />
        )}
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
        <button
          type="button"
          onClick={() => {
            if (selectedRowIds.length > 0) {
              cancelOrderItem(selectedRowIds);
            } else {
              alert('취소할 주문을 선택해 주세요');
            }
          }}
        >
          주문 삭제
        </button>{' '}
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
                <select id="address" onChange={handleSelectChange}>
                  <option defaultChecked>배송지를 선택해주세요</option>
                  {addressData.map((address: any) => (
                    <option key={address.id} value={address.id}>
                      {address.addressName}
                    </option>
                  ))}
                </select>
              )}
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <div>배송지 : </div>
              <div>{selectedAddress?.addressName}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>주소 : </div>
              <div>{selectedAddress?.city}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>상세주소 : </div>
              <div>{selectedAddress?.state}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>우편번호 : </div>
              <div>{selectedAddress?.zipcode}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>수령인 : </div>
              <div>{selectedAddress?.receiverName}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>번호 : </div>
              <div>{selectedAddress?.receiverPhoneNumber}</div>
            </div>
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
