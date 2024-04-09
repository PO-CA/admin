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
import Addresses from './addresses';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import styles from './page.module.css';

export default function CartList() {
  const { userId, userEmail } = useAuth();
  const {
    data: cartsData,
    isLoading: isCartsLoading,
    isSuccess: isCartsSuccess,
  } = useGetUsersAllCarts(userId);
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(userEmail);

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

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  return (
    <div>
      <div className={styles.titleContainer}>장바구니</div>
      <div className={styles.tableContainer}>
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
          {!isAddressLoading && isAddressSuccess && (
            <Addresses
              data={addressData}
              handleSelectChange={handleSelectChange}
              selectedOption={selectedOption}
            />
          )}

          <button
            onClick={() => {
              if (!selectedOption) return alert('배송지를 선택해 주세요.');
              createOrderItem({ userId, addressId: selectedOption });
            }}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}
