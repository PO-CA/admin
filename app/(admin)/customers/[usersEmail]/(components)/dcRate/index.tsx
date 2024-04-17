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
import { dcRateColumns } from '../../tableColumns/dcRateColumns';
import tableStyles from './table.module.css';
import { useGetDCRateByUsersEmail } from '@/query/query/dc';
import TableLoader from '@/components/tableLoader';

export default function UserDcRate({ usersEmail }: { usersEmail: string }) {
  const {
    data: dcRateData,
    isLoading: isDcRateLoading,
    isSuccess: isDcRateSuccess,
  } = useGetDCRateByUsersEmail(usersEmail);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: dcRateData,
    columns: dcRateColumns,
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

  if (isDcRateLoading) {
    return <TableLoader />;
  }

  if (!isDcRateSuccess) {
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
