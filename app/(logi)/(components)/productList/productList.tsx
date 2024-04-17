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
import { productColumns } from '../tableColumns/productColumns';
import { useGetUsersAllproducts } from '@/query/query/products';
import tableStyles from './productListTable.module.css';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function ProductList() {
  const { userId } = useAuth();
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetUsersAllproducts(userId || null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: productsData,
    columns: productColumns,
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
  return (
    <div>
      <div className={styles.titleContainer}>상품-목록</div>
      <div className={styles.tableContainer}>
        {!isProductsLoading && isProductsSuccess && (
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
