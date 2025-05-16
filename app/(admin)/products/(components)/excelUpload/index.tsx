'use client';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import styles from './index.module.css';
import { json } from 'stream/consumers';
import { useCreateProductsBulk } from '@/query/query/products';

export default function ExcelUpload() {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const { mutate: createProductsBulk } = useCreateProductsBulk();

  const handleDrop = useCallback(async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null });

        // 밸리데이션 (for문으로 변경)
        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i] as any;
          if (
            !row['바코드(필수)'] ||
            String(row['바코드(필수)']).trim().length < 1
          ) {
            setUploadedFile(null);
            alert(`${i + 2}번째 행의 바코드가 없습니다`);
            return;
          }
          if (
            !row['상품이름(필수)'] ||
            String(row['상품이름(필수)']).trim().length < 1
          ) {
            setUploadedFile(null);
            alert(`${i + 2}번째 행의 상품이름이 없습니다`);
            return;
          }
          if (!row['카테고리(필수)'] || isNaN(Number(row['카테고리(필수)']))) {
            setUploadedFile(null);
            alert(`${i + 2}번째 행의 카테고리 값이 없거나 숫자가 아닙니다`);
            return;
          }
          if (
            !row['좌표(필수, 콤마(,)로 구분)'] ||
            String(row['좌표(필수, 콤마(,)로 구분)']).trim().length < 1
          ) {
            setUploadedFile(null);
            alert(`${i + 2}번째 행의 좌표가 없습니다`);
            return;
          }
          const coords = String(row['좌표(필수, 콤마(,)로 구분)'])
            .split(',')
            .map((v: string) => v.trim());
          if (coords.some((c: string) => !c || isNaN(Number(c)))) {
            setUploadedFile(null);
            alert(`${i + 2}번째 행의 좌표 값 중 숫자가 아닌 값이 있습니다`);
            return;
          }
        }

        // 모든 행이 통과한 경우에만 파일 저장
        setUploadedFile({ file, jsonData });
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);

  // 상품 등록용 데이터 변환 함수
  const convertToProductPayload = (jsonData: any[]): any[] => {
    return jsonData.map((row: any) => ({
      title: row['상품이름(필수)'],
      thumbNailUrl: row['썸네일URL'] || null,
      descriptionUrl: row['상세설명URL'] || null,
      Artist: row['아티스트'] || null,
      Member: row['멤버'] || null,
      Ent: row['소속사'] || null,
      Company: row['제작사'] || null,
      stock: row['재고'] ? Number(row['재고']) : null,
      price: row['판매가'] ? Number(row['판매가']) : null,
      purchase: row['매입가'] ? Number(row['매입가']) : null,
      weight: row['무게'] ? Number(row['무게']) : null,
      x: row['x'] ? Number(row['x']) : null,
      y: row['y'] ? Number(row['y']) : null,
      z: row['z'] ? Number(row['z']) : null,
      barcode: row['바코드(필수)'],
      releaseDate: row['출시일'] ? new Date(row['출시일']) : null,
      deadlineDate: row['마감일'] ? new Date(row['마감일']) : null,
      sku: row['SKU'] || null,
      visible: row['노출여부'] !== undefined ? Boolean(row['노출여부']) : true,
      categoryId: Number(row['카테고리(필수)']),
      coordinateIds: row['좌표(필수, 콤마(,)로 구분)']
        .split(',')
        .map((id: string) => Number(id.trim())),
    }));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !uploadedFile.jsonData) {
      alert('엑셀 파일을 먼저 업로드 해주세요.');
      return;
    }
    const payload = convertToProductPayload(uploadedFile.jsonData);
    createProductsBulk(payload);
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={(e) => handleDrop(e.target.files)}
      />
      <button type="submit">업로드</button>
    </form>
  );
}
