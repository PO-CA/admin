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
import tableStyles from './pocaOrdersList.module.css';
import styles from './page.module.css';
import {
  useDeletePocaOrder,
  useGetPocaOrderDetails,
  useModifyPocaOrder,
} from '@/query/query/poca/pocaOrders';
import { useParams, useRouter } from 'next/navigation';
import { toDateString } from '@/utils/utils';
import { pocaOrderListColumns } from '../tableColumns/pocaOrderList';
import CertUpload from '@/app/(admin)/poca-certs/(components)/certUpload';
import Image from 'next/image';
import Link from 'next/link';

export default function PocaOrdersList() {
  const { orderId } = useParams();

  const router = useRouter();

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

  //
  const [inputValues, setInputValues] = useState({
    id: pocaOrdersData?.id,
    channelType: pocaOrdersData?.channelType,
    ordersStatus: '입금완료',
    nickname: pocaOrdersData?.nickname,
    shippingMemo: pocaOrdersData?.shippingMemo,
    address1: pocaOrdersData?.address1,
    address2: pocaOrdersData?.address2,
    receiver: pocaOrdersData?.receiver,
    receiverPhone: pocaOrdersData?.receiverPhone,
    shippingType: pocaOrdersData?.shippingType,
    zipcode: pocaOrdersData?.zipcode,
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (isPocaOrdersSuccess)
      setInputValues({
        id: pocaOrdersData?.id,
        channelType: pocaOrdersData.channelType,
        ordersStatus: '입금완료',
        nickname: pocaOrdersData.nickname,
        shippingMemo: pocaOrdersData.shippingMemo,
        address1: pocaOrdersData.address1,
        address2: pocaOrdersData.address2,
        receiver: pocaOrdersData.receiver,
        receiverPhone: pocaOrdersData.receiverPhone,
        shippingType: pocaOrdersData.shippingType,
        zipcode: pocaOrdersData.zipcode,
      });
  }, [isPocaOrdersSuccess, pocaOrdersData]);
  const { mutateAsync: patchOrders } = useModifyPocaOrder();

  const { mutate: deleteOrders } = useDeletePocaOrder();
  const onPatchIsCert = () => {
    if (window.confirm('정말 재인증 요청을 하시겠습니까?')) {
      patchOrders({
        id: pocaOrdersData?.id,
        isCert: false,
        shippingMemo: inputValues.shippingMemo,
      });
    }
  };
  const onDeleteOrders = () => {
    if (window.confirm('정말 주문을 삭제 하시겠습니까?')) {
      deleteOrders({ ordersId: orderId });
    }
  };
  const [open, setOpen] = useState(false);

  return (
    !isPocaOrdersLoading &&
    isPocaOrdersSuccess && (
      <div className={styles.container}>
        <div className={styles.titleContainer}>인증 상세</div>
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

            <form>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>판매채널</label>
                <select
                  style={{ fontSize: '14px' }}
                  name="channelType"
                  value={inputValues.channelType}
                  onChange={handleInputChange}
                >
                  <option>트위터</option>
                  <option>오픈채팅</option>
                  <option>기타</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>배송방법</label>
                <select
                  style={{ fontSize: '14px' }}
                  name="shippingType"
                  value={inputValues.shippingType}
                  onChange={handleInputChange}
                >
                  <option>준등기</option>
                  <option>택배</option>
                  <option>기타</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>인증아이디</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="nickname"
                  placeholder="인증아이디(필수)"
                  value={inputValues.nickname}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>주소1</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="address1"
                  placeholder="주소1"
                  value={inputValues.address1}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>주소2</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="address2"
                  placeholder="주소2"
                  value={inputValues.address2}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>받는사람</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="receiver"
                  placeholder="받는사람"
                  value={inputValues.receiver}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>전화번호</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="receiverPhone"
                  placeholder="전화번호"
                  value={inputValues.receiverPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>우편번호</label>
                <input
                  style={{ fontSize: '14px' }}
                  type="text"
                  name="zipcode"
                  placeholder="우편번호"
                  value={inputValues.zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>메모</label>
                <input
                  style={{ fontSize: '14px' }}
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
              onClick={async () => {
                if (window.confirm('정말 입금완료 처리를 하시겠습니까?')) {
                  const res = await patchOrders(inputValues);
                  if (res && res.ok === 'ok') router.push('/poca-cert');
                }
              }}
            >
              입금완료
            </button>
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
              onClick={() => onPatchIsCert()}
            >
              재인증요청
            </button>
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
              onClick={() => onDeleteOrders()}
            >
              인증취소
            </button>
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
        <div className={styles.titleContainer}>인증사진 업로드</div>
        <div className={styles.tableContainer}>
          <CertUpload />
        </div>
        <div className={styles.tableContainer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
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
              type="button"
              onClick={() => setOpen(!open)}
            >
              추가주문
            </button>
          </div>
          {open && '구현 준비중'}
        </div>
      </div>
    )
  );
}
