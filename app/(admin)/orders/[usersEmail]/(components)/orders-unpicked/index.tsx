'use client';
import {
  useGetAllUnpickedOrderByusersEmail,
  usePutToCancelOrderItem,
  usePutToPickOrderItem,
} from '@/query/query/orders';
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
import tableStyles from './table.module.css';
import styles from './index.module.css';
import TableLoader from '@/components/tableLoader';

export default function OrdersUnpicked({ usersEmail }: any) {
  const {
    data: unpickedOrderItemsData,
    isLoading: isUnpickedOrderItemsLoading,
    isSuccess: isUnpickedOrderItemsSuccess,
  } = useGetAllUnpickedOrderByusersEmail(usersEmail);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: unpickedOrderItemsData,
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

  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  let selectedRows: any = null;
  if (!isUnpickedOrderItemsLoading && isUnpickedOrderItemsSuccess) {
    selectedRows = table.getSelectedRowModel().rows;
  }

  useEffect(() => {
    if (selectedRows !== null) {
      if (!isUnpickedOrderItemsLoading && isUnpickedOrderItemsSuccess) {
        setSelectedRowIds(selectedRows.map((row: any) => row.original.id));
      }
    }
  }, [
    table,
    isUnpickedOrderItemsLoading,
    isUnpickedOrderItemsSuccess,
    selectedRows,
  ]);

  const { mutateAsync: putToPickOrderItem } = usePutToPickOrderItem();
  const { mutateAsync: cancelOrderItem } = usePutToCancelOrderItem();

  if (isUnpickedOrderItemsLoading) {
    return <TableLoader />;
  }

  if (!isUnpickedOrderItemsSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            if (selectedRowIds.length > 0) {
              putToPickOrderItem(selectedRowIds);
            } else {
              alert('포장 처리할 주문을 선택해 주세요');
            }
          }}
        >
          포장 처리
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
        </button>
      </div>
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
    </>
  );
}
