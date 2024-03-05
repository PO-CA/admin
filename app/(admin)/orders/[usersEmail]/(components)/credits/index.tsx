'use client';
import TanTable, { fuzzyFilter } from '@/components/table';
import React, { useState } from 'react';
import { creditsColumns } from '../tableColumns/creditsColumns';
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
import tableStyles from './table.module.css';
import { useGetCreditsByUsersEmail } from '@/query/query/credit';

export default function Credits({ usersEmail }: { usersEmail: string }) {
  const {
    data: creditData,
    isLoading: isCreditLoading,
    isSuccess: isCreditSuccess,
  } = useGetCreditsByUsersEmail(usersEmail);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: creditData,
    columns: creditsColumns,
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

  if (isCreditLoading) {
    return <div>Loading...</div>;
  }

  if (!isCreditSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <TanTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      styles={tableStyles}
      search
      filter
      pagenation
    />
  );
}
