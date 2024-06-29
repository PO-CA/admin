import TanTable, { fuzzyFilter } from '@/components/table';
import React, { useState } from 'react';
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
import tableStyles from './pocaStoreListTable.module.css';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';
import { pocaStoreListColumns } from '../tableColumns/pocaStoreListColumns';
import { useGetAllPocas } from '@/query/query/poca/poca';

export default function PocaStoreList() {
  const { userId } = useAuth();

  const {
    data: pocasData,
    isLoading: isPocasLoading,
    isSuccess: isPocasSuccess,
  } = useGetAllPocas();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: pocasData,
    columns: pocaStoreListColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: { pageSize: 50, pageIndex: 0 },
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
  return (
    <div>
      <div className={styles.titleContainer}>포카</div>

      <div className={styles.tableContainer}>
        {!isPocasLoading && isPocasSuccess && (
          <TanTable
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            styles={tableStyles}
            search
            pagenation
          />
        )}
      </div>
    </div>
  );
}
