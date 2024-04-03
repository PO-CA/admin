'use client';
import TanTable, { fuzzyFilter } from '@/components/table';
import styles from './page.module.css';
import { productColumns } from './(components)/tableColumns/productColumns';
import { useGetAllproducts } from '@/query/query/products';
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
import ExcelUpload from './(components)/excelUpload';
import TableLoader from '@/components/tableLoader';
import ExcelDownload from './(components)/excelDownload';

export default function Products() {
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetAllproducts();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: productsData,
    columns: productColumns,
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

  return (
    <main className={styles.productsContainer}>
      <div className={styles.titleContainer}>상품-목록</div>
      <div className={styles.titleContainer}>
        대량등록
        <div style={{ display: 'flex' }}>
          엑셀 업로드
          <ExcelUpload />
        </div>
        <div>
          <ExcelDownload />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {isProductsLoading && <TableLoader />}
        {!isProductsLoading && isProductsSuccess && (
          <TanTable
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            styles={tableStyles}
            search
            sort
            pagenation
            filter
          />
        )}
      </div>
    </main>
  );
}
