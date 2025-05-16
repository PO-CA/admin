'use client';
import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useGetAllproducts } from '@/query/query/products';

export default function ExcelDownloadForUpdate() {
  const { data: allProducts } = useGetAllproducts();

  const handleDown = useCallback(() => {
    const header = [
      'id',
      'SKU',
      '바코드(필수)',
      '상품이름(필수)',
      '카테고리(필수)',
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
    ];
    const data = [
      header,
      ...(allProducts
        ? allProducts.map((item: any) => [
            item.id,
            item.sku,
            item.barcode,
            item.title,
            item.logiCategory?.id,
            item.thumbNailUrl,
            item.descriptionUrl,
            item.artist,
            item.member,
            item.ent,
            item.company,
            item.stock,
            item.price,
            item.purchase,
            item.weight,
            item.x,
            item.y,
            item.z,
            item.releaseDate,
            item.deadlineDate,
            item.visible,
          ])
        : []),
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
    saveAs(excelFile, '상품_업데이트_양식.xlsx');
  }, [allProducts]);

  return (
    <div>
      <button onClick={handleDown}>양식받기</button>
    </div>
  );
}
