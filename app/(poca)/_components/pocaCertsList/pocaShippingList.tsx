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
import { useGetPocaOrderByUsersIdAndStatus } from '@/query/query/poca/pocaOrders';
import { pocaShippingUserColumns } from '../tableColumns/pocaShippingUserColumns';

export default function PocaShippingList() {
  const { userId } = useAuth();

  const {
    data: pocasData,
    isLoading: isPocasLoading,
    isSuccess: isPocasSuccess,
  } = useGetPocaOrderByUsersIdAndStatus(userId, '발송완료');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: pocasData,
    columns: pocaShippingUserColumns,
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
      <div className={styles.titleContainer}>발송완료</div>

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
