'use client';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import styles from './index.module.css';
import { json } from 'stream/consumers';

export default function ExcelUpload() {
  //   const [file, setFile] = useState(null);
  //   const [jsonData, setJsonData] = useState('');

  //   const handleConvert = () => {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         const data = e.target.result;
  //         const workbook = XLSX.read(data, { type: 'binary' });
  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         const json = XLSX.utils.sheet_to_json(worksheet);
  //         setJsonData(JSON.stringify(json, null, 2));
  //       };
  //       reader.readAsBinaryString(file);
  //     }
  //   };

  const [uploadedFile, setUploadedFile] = useState<any>(null);

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

        // 밸리데이션
        jsonData.forEach((row: any, i: number) => {
          if (!row['바코드(필수)']) {
            return alert(`${i + 1}번째 행의 바코드가 없습니다`);
          }
          if (!row['상품이름(필수)']) {
            return alert(`${i + 1}번째 행의 상품이름이 없습니다`);
          }
          if (!row['카테고리(필수)']) {
            return alert(`${i + 1}번째 행의 카테고리가 없습니다`);
          }
          if (!row['좌표(필수, 콤마(,)로 구분)']) {
            return alert(`${i + 1}번째 행의 좌표가 없습니다`);
          }
          //
          if (row['바코드(필수)'].length < 1) {
            return alert(`${i + 1}번째 행의 바코드가 없습니다`);
          }
          if (row['상품이름(필수)'].length < 1) {
            return alert(`${i + 1}번째 행의 상품이름이 없습니다`);
          }
          if (row['카테고리(필수)'].length < 1) {
            return alert(`${i + 1}번째 행의 카테고리가 없습니다`);
          }
          if (row['좌표(필수, 콤마(,)로 구분)'].length < 1) {
            return alert(`${i + 1}번째 행의 좌표가 없습니다`);
          }
        });

        setUploadedFile({ file, jsonData });
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);

  return (
    <form>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={(e) => handleDrop(e.target.files)}
      />
      <button>업로드</button>
    </form>
  );
}
