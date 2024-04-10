'use client';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExcelDownload() {
  const handleDown = useCallback(() => {
    const data = [
      [
        'SKU',
        '바코드(필수)',
        '상품이름(필수)',
        '카테고리(필수)',
        '좌표(필수, 콤마(,)로 구분)',
        '썸네일 주소',
        '상세페이지 주소',
        '가수 이름',
        '버전',
        '소속사 이름',
        '음반사 이름',
        '수량',
        '가격',
        '매입가',
        '무게',
        '가로',
        '세로',
        '높이',
        '출시일(0000-00-00)',
        '주문마감일(0000-00-00)',
      ],
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
  }, []);

  return (
    <div>
      <button onClick={handleDown}>양식받기</button>
    </div>
  );
}
