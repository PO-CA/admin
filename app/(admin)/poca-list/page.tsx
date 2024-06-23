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
import styles from './page.module.css';
import tableStyles from './table.module.css';
import TableLoader from '@/components/tableLoader';
import { useGetAllPocas } from '@/query/query/poca';
import { pocaListColumns } from './(components)/tableColumns/pocaListColumns';

export default function POCAList() {
  const {
    data: pocasData,
    isLoading: isPocasLoading,
    isSuccess: isPocasSuccess,
  } = useGetAllPocas();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: pocasData,
    columns: pocaListColumns,
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

  if (!isPocasSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <main className={styles.shippingsContainer}>
      <div className={styles.titleContainer}>포카-목록</div>
      <div className={styles.tableContainer}>
        {isPocasLoading && <TableLoader />}
        <TanTable
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          styles={tableStyles}
          search
          filter
          pagenation
        />
      </div>
    </main>
  );
}
