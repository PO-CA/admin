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
import { useGetAllShippings } from '@/query/query/shippings';
import styles from './page.module.css';
import { shippingColumns } from './(components)/tableColumns/shippingColumns';
import tableStyles from './table.module.css';
import TanTable, { fuzzyFilter } from '@/components/table';
export default function Shippings() {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippings();

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
    <main className={styles.shippingsContainer}>
      <div className={styles.subTitle}>배송-목록</div>
      <TanTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        styles={tableStyles}
        search
        filter
        pagenation
        sort
      />
    </main>
  );
}
