'use client';
import TanTable, { fuzzyFilter } from '@/components/table';
import styles from './page.module.css';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import tableStyles from './table.module.css';
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
import { printPickingListColumns } from '../printPickingListColumns';

export default function PrintPickingList({
  table: data,
  usersData,
}: {
  table: any;
  usersData: any;
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: data.getSelectedRowModel().rows,
    columns: printPickingListColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: { pageSize: 500, pageIndex: 0 },
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

  const componentRef = useRef<ComponentToPrint>(null);

  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });

  const printGoback = () => {
    if (data.getSelectedRowModel().rows.length < 1) {
      return alert('인쇄할 주문을 선택해 주세요.');
    } else {
      handlePrint();
    }
  };
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: '10px',
          }}
        >
          <div
            style={{
              fontSize: '30px',
              fontWeight: 900,
              margin: '20px 0 0 30px',
            }}
          >
            PICKING LIST
          </div>

          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              margin: '20px 0 0 30px',
            }}
          >
            {usersData?.nickname}
          </div>
          {/* <div
            style={{
              display: 'flex',
              marginLeft: '40px',
              marginTop: '20px',
              marginBottom: '100px',
              fontSize: '18px',
            }}
          >
            <div style={{ flex: '0.5' }}>
              <div style={{ fontWeight: 900, marginBottom: '5px' }}>Seller</div>
              <div>HMcompany</div>
              <div>71, Bukhang-ro 207beon-gil</div>
              <div>Seo-gu, Incheon, Korea, 22856 </div>
              <div style={{ marginTop: '10px' }}>Tel: +82 2 010 5788 7679</div>
            </div>
            <div style={{ flex: '0.5' }}>
              <div>
                invoice Date: {new Date().toISOString().substring(0, 10)}
              </div>
            </div>
          </div> */}

          <div>
            <TanTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              styles={tableStyles}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <main className={styles.productDetailContainer}>
      <button onClick={printGoback}>포장리스트 인쇄</button>
      <div hidden>
        <ComponentToPrint ref={componentRef} />
      </div>
    </main>
  );
}
