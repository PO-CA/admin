'use client';
import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';

export default function ProductListDownload({
  productsData,
  isLoading,
}: {
  productsData: any;
  isLoading: boolean;
}) {
  const handleDown = useCallback(() => {
    const data = [
      ['SKU', '바코드', '상품이름', '수량', '가격'],
      ...productsData.map((item: any) => [
        item.sku,
        item.barcode,
        item.title,
        item.stock,
        item.price,
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // @ts-ignore
    const excelButter = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelFile = new Blob([excelButter], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(excelFile, 'asd.xlsx');
  }, [productsData]);

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{ fontWeight: 600, borderRadius: 2 }}
      onClick={handleDown}
      disabled={isLoading}
    >
      {isLoading ? '상품 목록 로딩중...' : '상품 목록 받기'}
    </Button>
  );
}
