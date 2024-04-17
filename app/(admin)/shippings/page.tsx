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
import { useGetAllShippings } from '@/query/query/shippings';
import { shippingColumns } from '@/app/(admin)/shippings/(components)/tableColumns/shippingColumns';
import styles from './page.module.css';
import tableStyles from './table.module.css';
import TableLoader from '@/components/tableLoader';

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

  if (!isShippingSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <main className={styles.shippingsContainer}>
      <div className={styles.titleContainer}>배송-목록</div>
      <div className={styles.tableContainer}>
        {isShippingLoading && <TableLoader />}
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
