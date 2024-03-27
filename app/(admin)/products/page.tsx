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
import { useEffect, useState } from 'react';
import tableStyles from './table.module.css';
import ExcelUpload from './(components)/excelUpload';

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

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  let selectedRows: any = null;
  if (!isProductsLoading && isProductsSuccess) {
    selectedRows = table.getSelectedRowModel().rows;
  }

  useEffect(() => {
    if (selectedRows !== null) {
      if (!isProductsLoading && isProductsSuccess) {
        setSelectedRowIds(selectedRows.map((row: any) => row.original.id));
      }
    }
  }, [table, isProductsLoading, isProductsSuccess, selectedRows]);

  return (
    <main className={styles.productsContainer}>
      <div className={styles.subTitle}>상품-목록</div>
      <ExcelUpload />
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
    </main>
  );
}
