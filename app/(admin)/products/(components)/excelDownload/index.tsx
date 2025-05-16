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
        '썸네일URL',
        '상세설명URL',
        '아티스트',
        '멤버',
        '소속사',
        '제작사',
        '재고',
        '판매가',
        '매입가',
        '무게',
        'x',
        'y',
        'z',
        '출시일',
        '마감일',
        '노출여부',
      ],
      [
        '컬럼 설명',
        '상품의 바코드',
        '상품명',
        '카테고리 ID (숫자)',
        '좌표 ID 리스트 (숫자, 콤마로 구분)',
        '썸네일 이미지 URL',
        '상세페이지 URL',
        '아티스트명',
        '멤버명',
        '소속사명',
        '제작사명',
        '재고수량(숫자)',
        '판매가(숫자)',
        '매입가(숫자)',
        '무게(숫자)',
        '가로(숫자)',
        '세로(숫자)',
        '높이(숫자)',
        '출시일(yyyy-mm-dd)',
        '마감일(yyyy-mm-dd)',
        'true/false(노출여부)',
      ],
      [
        'ABC-001',
        '8801234567890',
        'BTS 앨범',
        '1',
        '1,2',
        'https://img.com/1.jpg',
        'https://desc.com/1',
        'BTS',
        'RM',
        'HYBE',
        'HYBE',
        '100',
        '25000',
        '20000',
        '500',
        '150',
        '200',
        '30',
        '2024-06-01',
        '2024-06-30',
        'true',
      ],
      [
        'ABC-002',
        '8801234567891',
        'NCT 앨범',
        '2',
        '3',
        '',
        '',
        'NCT',
        '태용',
        'SM',
        'SM',
        '50',
        '22000',
        '18000',
        '400',
        '140',
        '190',
        '25',
        '2024-07-01',
        '',
        'false',
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
