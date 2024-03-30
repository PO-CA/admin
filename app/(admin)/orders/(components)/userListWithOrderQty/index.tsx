'use client';
import { ordersColumns } from '../tableColumns/ordersColumns';
import TanTable, { fuzzyFilter } from '@/components/table';
import { useGetAllUsersWithOrderItemsQty } from '@/query/query/users';
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
import tableStyles from './table.module.css';
import TableLoader from '@/components/tableLoader';
export default function UserListWithOrderQty() {
  const {
    data: usersOrdersata,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetAllUsersWithOrderItemsQty();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data: usersOrdersata,
    columns: ordersColumns,
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

  if (isUsersLoading) {
    return <TableLoader />;
  }

  if (!isUsersSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <TanTable
      table={table}
      styles={tableStyles}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      search
      sort
      pagenation
      filter
    />
  );
}
