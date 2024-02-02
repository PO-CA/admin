'use client';
import { useGetAllPickedOrderByUserNickname } from '@/query/query/orders';
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

  if (isPickedOrderItemsLoading) {
    return <div>Loading...</div>;
  }

  if (!isPickedOrderItemsSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <TanTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      useSearch={false}
      useFilter={false}
      usePagenation={false}
    />
  );
}
