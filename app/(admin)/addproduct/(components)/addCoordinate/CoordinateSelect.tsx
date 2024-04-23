import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../page.module.css';
import { useGetAllCoordinate } from '@/query/query/coordinate';
import TanTable, { fuzzyFilter } from '@/components/table';
import {
  ColumnDef,
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
import tableStyles from './table.module.css';

export default function CoordinateSelect({
  productData,
  coordinatesColumns,
  setSelectedRowIds,
}: {
  productData?: any;
  coordinatesColumns: ColumnDef<any, any>[];
  setSelectedRowIds?: (selectedRowIds: number[]) => void;
}) {
  const {
    data: coordinateData,
    isLoading: isCoordinateLoading,
    isSuccess: isCoordinateSuccess,
  } = useGetAllCoordinate();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const seletedData = useMemo(() => {
    if (productData && coordinateData) {
      return coordinateData.map((coordinate: any, i: number) => {
        if (productData.selectedCoordinateIds.includes(coordinate.id)) {
          coordinate.isChecked = true;
        } else {
          coordinate.isChecked = false;
        }
        coordinate.productId = productData.id;
        return coordinate;
      });
    } else {
      return coordinateData || [];
    }
  }, [productData, coordinateData]);

  const table = useReactTable({
    data: seletedData,
    columns: coordinatesColumns,
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

  let selectedRows: any = null;
  if (!isCoordinateLoading && isCoordinateSuccess) {
    selectedRows = table.getSelectedRowModel().rows;
  }

  useEffect(() => {
    if (selectedRows !== null) {
      if (!isCoordinateLoading && isCoordinateSuccess && setSelectedRowIds) {
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
      <label className={styles.inputLabel}>좌표❗️</label>
      <TanTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        styles={tableStyles}
        search
        pagenation
        sort
      />
    </div>
  );
}
