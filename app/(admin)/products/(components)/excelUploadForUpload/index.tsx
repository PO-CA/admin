'use client';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  useUpdateProductsBulk,
  useGetAllproducts,
} from '@/query/query/products';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ExcelUploadForUpdate() {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const { data: allProducts } = useGetAllproducts();
  const validIds = allProducts ? allProducts.map((p: any) => String(p.id)) : [];
  const { mutateAsync: updateProductsBulk, isPending } = useUpdateProductsBulk({
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다');
      }
    },
  });
  const [fileName, setFileName] = useState('');

  const handleDrop = useCallback(
    async (acceptedFiles: any) => {
      if (!allProducts || !validIds.length) {
        alert('상품 목록을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
        setUploadedFile(null);
        return;
      }
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileName(file.name);
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
            if (!row['id'] || !validIds.includes(String(row['id']))) {
              setUploadedFile(null);
              alert(`${i + 2}번째 행의 id(${row['id']})가 존재하지 않습니다`);
              return;
            }
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
            if (
              !row['카테고리(필수)'] ||
              isNaN(Number(row['카테고리(필수)']))
            ) {
              setUploadedFile(null);
              alert(`${i + 2}번째 행의 카테고리 값이 없거나 숫자가 아닙니다`);
              return;
            }
          }
          setUploadedFile({ file, jsonData });
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [allProducts, validIds],
  );

  // 상품 업데이트용 데이터 변환 함수
  const convertToUpdateProductPayload = (jsonData: any[]): any[] => {
    return jsonData.map((row: any) => ({
      id: row['id'],
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
      categoryId: row['카테고리(필수)'] ? Number(row['카테고리(필수)']) : null,
    }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !uploadedFile.jsonData) {
      alert('엑셀 파일을 먼저 업로드 해주세요.');
      return;
    }
    const payload = convertToUpdateProductPayload(uploadedFile.jsonData);
    await updateProductsBulk(payload as any);
    setUploadedFile(null);
  };

  return (
    <form
      onSubmit={handleUpload}
      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
    >
      <Button
        variant="contained"
        component="label"
        size="small"
        disabled={isPending}
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        엑셀 업로드
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          hidden
          onChange={(e) => handleDrop(e.target.files)}
        />
      </Button>
      <Button
        type="submit"
        size="small"
        variant="outlined"
        disabled={isPending}
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        {isPending ? '업로드 중...' : '업로드'}
      </Button>
      {fileName && (
        <span style={{ fontSize: 13, color: '#666' }}>{fileName}</span>
      )}
    </form>
  );
}
