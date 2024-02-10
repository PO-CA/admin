'use client';
import { useGetAllPickedOrderByUserNickname } from '@/query/query/orders';
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
import styles from '../../page.module.css';

export default function OrdersPicked({ userNickname }: any) {
  const {
    data: pickedOrderItemsData,
    isLoading: isPickedOrderItemsLoading,
    isSuccess: isPickedOrderItemsSuccess,
  } = useGetAllPickedOrderByUserNickname(userNickname);
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

  return (
    <>
      {!isPickedOrderItemsLoading && isPickedOrderItemsSuccess && (
        <TanTable
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

      <div>
        <div className={styles.subTitle}>주문처리</div>

        <div style={{ display: 'flex' }}>
          {!isPickedOrderItemsLoading && isPickedOrderItemsSuccess && (
            <div>총 {table.getSelectedRowModel().rows.length} 개</div>
          )}
          <div>
            <div>배송방법</div>
            <select name="" id="">
              <option value="">퀵</option>
              <option value="">택배</option>
            </select>
          </div>
          <div>
            <div>송장번호</div>
            <input />
          </div>
          <div>
            <div>배송지</div>
            <select name="" id="">
              <option value="">메인</option>
              <option value="">1</option>
            </select>
          </div>
          <div>
            <div>배송비</div> <input type="number" />{' '}
          </div>
        </div>
        <button>주문 처리</button>
      </div>
    </>
  );
}
