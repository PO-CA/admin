'use client';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import styles from './index.module.css';

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
        const workbook = XLSX.read(data, { type: 'array', bookVBA: true });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setUploadedFile({ file, jsonData });
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);
  console.log('uploadedFile', uploadedFile);

  return (
    <form>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={(e) => handleDrop(e.target.files)}
      />
    </form>
  );
}
