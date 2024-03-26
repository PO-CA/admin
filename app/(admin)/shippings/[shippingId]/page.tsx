'use client';
import TanTable, { fuzzyFilter } from '@/components/table';
import styles from './page.module.css';
import { useGetAllShippingsByShippingId } from '@/query/query/shippings';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

  const table = useReactTable({
    data: shippingData?.logiShippingItems,
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
  console.log('shippingData', shippingData);

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
        <div>
          <div>
            <div>INVOICE</div>
            <div>
              <div>
                <div>Seller</div>
                <div>HMcompany</div>
                <div>71, Bukhang-ro 207beon-gil</div>
                <div>Seo-gu, Incheon, Korea, 22856 </div>
                <div>Tel: +82 2 010 5788 7679</div>
              </div>
              <div>
                <div>invoice No.:</div>
                <div>
                  invoice Date: {new Date().toLocaleString().substring(0, 10)}
                </div>
              </div>
            </div>
            <div>
              <div>no.</div>
              <div>Description of goods</div>
              <div>Option</div>
              <div>Qty</div>
              <div>Unit price</div>
              <div>Amount</div>
            </div>

            <TanTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              styles={tableStyles}
            />
            <div>
              <div></div>
              <div>배송비</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div> </div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div> </div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div> </div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div>Total Amount in </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div>{'Declaration of origin'}</div>
              <div>{'Date & Company Chop'}</div>
            </div>
            <div>
              <div>
                {'We the undersigned, the exporter of the products, '}
                {
                  'covered by this document, declare that, except where otherwise'
                }
                {
                  'clearly indicated, these products are of South Korea preferntial origin.'
                }
              </div>
              <div>
                <div></div>
                <div>HMcompany</div>
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
