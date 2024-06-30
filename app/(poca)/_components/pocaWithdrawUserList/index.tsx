'use client';
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
import TanTable, { fuzzyFilter } from '@/components/table';
import tableStyles from './pocaOrdersList.module.css';
import styles from './page.module.css';
import { useGetPocaOrderDetails } from '@/query/query/poca/pocaOrders';
import { useParams } from 'next/navigation';
import { toDateString } from '@/utils/utils';
import { pocaOrderListColumns } from '../tableColumns/pocaOrderList';
import Image from 'next/image';
import Link from 'next/link';

export default function PocaWithdrawUserList() {
  const { orderId } = useParams();

  const {
    data: pocaOrdersData,
    isLoading: isPocaOrdersLoading,
    isSuccess: isPocaOrdersSuccess,
  } = useGetPocaOrderDetails(orderId);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: pocaOrdersData?.ordersItems,
    columns: pocaOrderListColumns,
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
    !isPocaOrdersLoading &&
    isPocaOrdersSuccess && (
      <div className={styles.container}>
        <div className={styles.titleContainer}>주문 상세</div>
        <div className={styles.tableContainer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>인증여부</div>
              <div>{pocaOrdersData.isCert ? '✅' : '❌'}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주문번호</div>
              <div>{pocaOrdersData.id}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주문상태</div>
              <div>{pocaOrdersData.ordersStatus}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>인증아이디</div>
              <div>{pocaOrdersData.nickname}</div>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(pocaOrdersData.nickname);
                }}
              >
                복사
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>판매채널</div>
              <div>{pocaOrdersData.channelType}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>요청일</div>
              <div>{toDateString(pocaOrdersData.createdAt)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주문총액</div>
              <div>{pocaOrdersData.totalPrice}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주문총수량</div>
              <div>{pocaOrdersData.totalCount}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>판매채널</div>
              <div>{pocaOrdersData.channelType}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>배송방법</div>
              <div>{pocaOrdersData.shippingType}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>인증아이디</div>
              <div>{pocaOrdersData.nickname}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주소1</div>
              <div>{pocaOrdersData.address1}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>주소2</div>
              <div>{pocaOrdersData.address2}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>받는사람</div>
              <div>{pocaOrdersData.receiver}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>전화번호</div>
              <div>{pocaOrdersData.receiverPhone}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>우편번호</div>
              <div>{pocaOrdersData.zipcode}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>메모</div>
              <div>{pocaOrdersData.shippingMemo}</div>
            </div>
          </div>
        </div>
        <div className={styles.titleContainer}>주문한 포카 목록</div>
        <div className={styles.tableContainer}>
          {!isPocaOrdersLoading && isPocaOrdersSuccess && (
            <TanTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              styles={tableStyles}
            />
          )}
        </div>
        <div className={styles.titleContainer}>인증사진</div>
        <div className={styles.tableContainer}>
          {orderId && (
            <Link
              href={`${process.env.NEXT_PUBLIC_S3_CERT_URL}${orderId}.JPG`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                unoptimized
                quality={20}
                src={`${process.env.NEXT_PUBLIC_S3_CERT_URL}${orderId}.JPG`}
                alt="pocaImg"
                width={300}
                height={300}
              />
            </Link>
          )}
        </div>
      </div>
    )
  );
}
