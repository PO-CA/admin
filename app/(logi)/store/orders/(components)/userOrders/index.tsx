'use client';
import React from 'react';
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
import { useGetAllOrderByusersEmail } from '@/query/api/orders';
import TableLoader from '@/components/tableLoader';

export default function UserOrders({ usersEmail }: any) {
  const {
    data: orderItemsData,
    isLoading: isOrderItemsLoading,
    isSuccess: isOrderItemsSuccess,
  } = useGetAllOrderByusersEmail(usersEmail);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: orderItemsData,
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

  if (isOrderItemsLoading) {
    return <TableLoader />;
  }

  if (!isOrderItemsSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <TanTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      styles={tableStyles}
      filter
      sort
      pagenation
      search
    />
  );
}
