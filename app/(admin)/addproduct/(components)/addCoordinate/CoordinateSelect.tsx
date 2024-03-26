import React, { useEffect, useState } from 'react';
import styles from '../../page.module.css';
import { useGetAllCoordinate } from '@/query/query/coordinate';
import TanTable, { fuzzyFilter } from '@/components/table';
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
import { coordinatesColumns } from './coordinatesColumns';
import tableStyles from './table.module.css';

export default function CoordinateSelect({
  setSelectedRowIds,
}: {
  setSelectedRowIds: (selectedRowIds: number[]) => void;
}) {
  const {
    data: coordinateData,
    isLoading: isCoordinateLoading,
    isSuccess: isCoordinateSuccess,
  } = useGetAllCoordinate();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: coordinateData,
    columns: coordinatesColumns,
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

  let selectedRows: any = null;
  if (!isCoordinateLoading && isCoordinateSuccess) {
    selectedRows = table.getSelectedRowModel().rows;
  }

  useEffect(() => {
    if (selectedRows !== null) {
      if (!isCoordinateLoading && isCoordinateSuccess) {
        setSelectedRowIds(selectedRows.map((row: any) => row.original.id));
      }
    }
  }, [
    table,
    isCoordinateLoading,
    isCoordinateSuccess,
    selectedRows,
    setSelectedRowIds,
  ]);

  if (isCoordinateLoading) return <div>loading</div>;

  if (!isCoordinateSuccess) return <div>fail</div>;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>좌표</label>
      <TanTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        styles={tableStyles}
        search
        pagenation
      />
    </div>
  );
}
