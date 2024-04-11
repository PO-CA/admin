'use client';
import TanTable, { fuzzyFilter } from '@/components/table';
import styles from './page.module.css';
import { useGetAllShippingsByShippingId } from '@/query/query/shippings';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { shippingItemColumns } from '../(components)/tableColumns/shippingItemColumns';
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

export default function ShippingDetail({
  params,
}: {
  params: { shippingId: string };
}) {
  const { shippingId } = params;

  const router = useRouter();

  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByShippingId(shippingId);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [invoiceData, setInvoiceData] = useState<any>([]);

  useEffect(() => {
    if (shippingData) {
      setInvoiceData([
        ...shippingData?.logiShippingItems,
        {},
        {},
        {
          productName: '배송비',
          totalPrice: shippingData?.shippingFee,
        },
        {
          productName: 'Total Amount in',
          totalPrice:
            shippingData?.totalProductPrice + shippingData?.shippingFee,
        },
      ]);
    }
  }, [shippingData]);

  const table = useReactTable({
    data: invoiceData,
    columns: shippingItemColumns,
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

  const componentRef = useRef<ComponentToPrint>(null);

  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
    onAfterPrint: () => router.back(),
  });

  const printGoback = () => {
    handlePrint();
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
            INVOICE
          </div>
          <div
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
              <div>invoice No.: {shippingData?.id}</div>
              <div>
                invoice Date: {new Date().toISOString().substring(0, 10)}
              </div>
            </div>
          </div>

          <div>
            <TanTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              styles={tableStyles}
            />
            <div style={{ padding: '0px 21.5px', display: 'flex' }}>
              <div
                style={{
                  flex: '0.65',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '5px 0px',
                  border: '1px solid lightgray',
                }}
              >
                {'Declaration of origin'}
              </div>
              <div
                style={{
                  flex: '0.35',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '5px 0px',
                  border: '1px solid lightgray',
                }}
              >
                {'Date & Company Chop'}
              </div>
            </div>
            <div style={{ padding: '0px 21.5px', display: 'flex' }}>
              <div
                style={{
                  flex: '0.65',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 900,
                  padding: '5px 0px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>
                  {'We the undersigned, the exporter of the products, '}
                </div>
                <div>{'covered by this document, declare that, '}</div>
                <div>{'except where otherwise clearly indicated,'}</div>
                <div>
                  {'these products are of South Korea preferntial origin.'}
                </div>
              </div>
              <div
                style={{
                  flex: '0.35',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 900,
                  padding: '5px 0px 0px',
                  border: '1px solid lightgray',
                }}
              >
                <div style={{ height: '100px' }}></div>
                <div
                  style={{ borderTop: '1px solid lightgray', padding: '10px' }}
                >
                  HMcompany
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (isShippingLoading) return <div>loading</div>;

  if (!isShippingSuccess) return <div>fail</div>;

  return (
    <main className={styles.productDetailContainer}>
      <button onClick={printGoback}>인쇄하기</button>
      <ComponentToPrint ref={componentRef} />
    </main>
  );
}
