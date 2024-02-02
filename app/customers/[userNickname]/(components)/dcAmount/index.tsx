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
import React, { useState } from 'react';
import TanTable, { fuzzyFilter } from '@/components/table';
import { useGetDCAmountByUserNickname } from '@/query/query/dc';
import { dcAmountColumns } from '../../tableColumns/dcAmountColumns';

export default function UserDcAmount({
  userNickname,
}: {
  userNickname: string;
}) {
  const {
    data: dcAmountData,
    isLoading: isDcAmountLoading,
    isSuccess: isDcAmountSuccess,
  } = useGetDCAmountByUserNickname(userNickname);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: dcAmountData,
    columns: dcAmountColumns,
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

  if (isDcAmountLoading) {
    return <div>Loading...</div>;
  }

  if (!isDcAmountSuccess) {
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
