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
import { cartColumns } from '../tableColumns/cartColumns';
import { useGetUsersAllCarts } from '@/query/query/cart';
import { useCreateOrderItemsInCart } from '@/query/query/orders';
import TanTable, { fuzzyFilter } from '@/components/table';
import tableStyles from './cartListTable.module.css';
import { useAuth } from '@/hooks/useAuth';
export default function CartList() {
  const { userId } = useAuth();
  const {
    data: cartsData,
    isLoading: isCartsLoading,
    isSuccess: isCartsSuccess,
  } = useGetUsersAllCarts(userId);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: cartsData,
    columns: cartColumns,
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

  const { mutate: createOrderItem } = useCreateOrderItemsInCart();

  return (
    <div>
      <div>장바구니</div>
      {!isCartsLoading && isCartsSuccess && (
        <TanTable
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          styles={tableStyles}
          search
          pagenation
        />
      )}
      <div>
        <div>
          {/* TODO 배송지 API */}
          <div>배송지</div>
          <select name="" id="">
            <option value="">메인</option>
            <option value="">서브</option>
            <option value="">서브2</option>
          </select>
        </div>
        <button onClick={() => createOrderItem(userId)}>주문하기</button>
      </div>
    </div>
  );
}
