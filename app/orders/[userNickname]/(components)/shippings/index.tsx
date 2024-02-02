'use client';
import React from 'react';
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
import { useGetAllShippingsByUserNickname } from '@/query/query/shippings';
import { shippingColumns } from '@/app/shippings/(components)/tableColumns/shippingColumns';

export default function UserShippings({
  userNickname,
}: {
  userNickname: string;
}) {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByUserNickname(userNickname);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: shippingData,
    columns: shippingColumns,
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

  if (isShippingLoading) {
    return <div>Loading...</div>;
  }

  if (!isShippingSuccess) {
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
