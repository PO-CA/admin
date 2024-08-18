'use client';
import React, { useEffect, useState } from 'react';
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
import tableStyles from './cartListTable.module.css';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';
import { pocaCartColumns } from '../tableColumns/pocaCartColumns';
import { useCreatePocaOrder } from '@/query/query/poca/pocaOrders';
import { useRouter } from 'next/navigation';
import { useGetPocaCartsItems } from '@/query/query/poca/carts';

export default function PocaCartList() {
  const { userId } = useAuth();
  const router = useRouter();

  const {
    data: cartsData,
    isLoading: isCartsLoading,
    isSuccess: isCartsSuccess,
  } = useGetPocaCartsItems(userId);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: cartsData,
    columns: pocaCartColumns,
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

  //
  const [inputValues, setInputValues] = useState({
    userId: 0,
    channelType: '트위터',
    ordersStatus: '인증요청',
    nickname: '',
    shippingMemo: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userId) {
      setInputValues({
        userId: userId,
        channelType: inputValues.channelType,
        ordersStatus: '인증요청',
        nickname: inputValues.nickname,
        shippingMemo: inputValues.shippingMemo,
      });
    }
  }, [
    userId,
    inputValues.channelType,
    inputValues.nickname,
    inputValues.shippingMemo,
    inputValues.ordersStatus,
    inputValues.userId,
  ]);

  const {
    mutateAsync: createPocaOrder,
    isSuccess: isCreatePocaOrderSuccess,
    isError: isCreatePocaOrderError,
    data: createPocaOrderData,
  } = useCreatePocaOrder();

  const onSubmit = () => {
    if (cartsData && cartsData.length < 1) {
      return alert('장바구니에 담긴 POCA가 없습니다.');
    }
    if (inputValues.nickname.length < 1) {
      return alert('인증아이디는 필수 입니다');
    } else if (confirm('인증 요청을 하시겠습니까?')) {
      createPocaOrder(inputValues);
    }
  };

  useEffect(() => {
    if (
      createPocaOrderData &&
      createPocaOrderData.data &&
      createPocaOrderData.data.errorMessage
    ) {
      alert(createPocaOrderData.data.errorMessage);
    } else if (isCreatePocaOrderSuccess) {
      alert(`인증요청을 성공 했습니다`);
      router.push('/poca-store');
    } else if (isCreatePocaOrderError) {
      alert(`인증요청을 실패 했습니다. 관리자에게 문의하세요`);
    }
  }, [
    isCreatePocaOrderSuccess,
    isCreatePocaOrderError,
    createPocaOrderData,
    router,
  ]);

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
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <form>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <label style={{ width: '50%' }}>판매채널</label>
              <select
                style={{ width: '50%', fontSize: '14px' }}
                name="channelType"
                value={inputValues.channelType}
                onChange={handleInputChange}
              >
                <option>트위터</option>
                <option>오픈채팅</option>
                <option>기타</option>
              </select>
            </div>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <label style={{ width: '50%' }}>인증아이디</label>
              <input
                style={{ width: '50%', fontSize: '14px' }}
                type="text"
                name="nickname"
                placeholder="인증아이디(필수)"
                value={inputValues.nickname}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <label style={{ width: '50%' }}>메모</label>
              <input
                style={{ width: '50%', fontSize: '14px' }}
                type="text"
                name="shippingMemo"
                placeholder="요청 메모"
                value={inputValues.shippingMemo}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            style={{
              border: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: 'rgb(77, 24, 127)',
              padding: '10px 8px',
              color: 'white',
              marginTop: '10px',
            }}
            onClick={onSubmit}
          >
            인증요청
          </button>
        </div>
      </div>
    </div>
  );
}
