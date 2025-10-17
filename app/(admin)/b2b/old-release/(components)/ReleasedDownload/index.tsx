'use client';
import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';

export default function ReleasedDownload({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const handleDown = useCallback(() => {
    const excelData = [
      ['Cat ID', '바코드', '아티스트', '앨범명', '버전', '수량'],
      ...data.map((item: any) => [
        item.catId || '',
        item.barcode || '',
        item.artist || '',
        item.productTitle || '',
        '', // 버전 빈칸
        item.totalQty || 0,
      ]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // @ts-ignore
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelFile = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(excelFile, '구보_주문집계.xlsx');
  }, [data]);

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{ fontWeight: 600, borderRadius: 2 }}
      onClick={handleDown}
      disabled={isLoading || !data || data.length === 0}
    >
      {isLoading ? '로딩중...' : '엑셀 다운로드'}
    </Button>
  );
}
