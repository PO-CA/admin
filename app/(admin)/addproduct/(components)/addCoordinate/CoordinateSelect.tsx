import React, { useEffect, useState } from 'react';
import { useGetAllCoordinate } from '@/query/query/coordinate';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteCoordinateButton from './DeleteCoordinateButton';
import { useGetAllproducts } from '@/query/query/products';

// 공통 rows 생성 함수
function useCoordinateRows() {
  const {
    data: coordinateData,
    isLoading: isCoordinateLoading,
    isSuccess: isCoordinateSuccess,
  } = useGetAllCoordinate();

  const rows = Array.isArray(coordinateData)
    ? coordinateData.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        ...row,
      }))
    : [];

  return { rows, isCoordinateLoading, isCoordinateSuccess };
}

// 1. 상품 등록용 컴포넌트 (체크박스)
export function CoordinateSelectRegister({
  columns,
  setSelectedRowIds,
}: {
  columns: any[];
  setSelectedRowIds: (selectedRowIds: number[]) => void;
}) {
  const { rows, isCoordinateLoading, isCoordinateSuccess } =
    useCoordinateRows();
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);

  useEffect(() => {
    setRowSelectionModel([]);
  }, []);

  useEffect(() => {
    setSelectedRowIds(rowSelectionModel.map((id) => Number(id)));
  }, [rowSelectionModel, setSelectedRowIds]);

  // 8.x 버전: rowSelectionModel은 { [id]: true } 형태의 객체
  const rowSelectionModelObj = rowSelectionModel.reduce(
    (acc, id) => {
      acc[id] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  let dataGridProps: any = {
    checkboxSelection: true,
    disableRowSelectionOnClick: true,
    rowSelectionModel: rowSelectionModelObj,
    onRowSelectionModelChange: (newSelection: any) => {
      // 8.x: 객체로 들어오면 key만 배열로 변환
      if (newSelection && typeof newSelection === 'object') {
        setRowSelectionModel(Object.keys(newSelection));
      } else if (Array.isArray(newSelection)) {
        setRowSelectionModel(newSelection);
      } else {
        setRowSelectionModel([]);
      }
    },
  };

  if (isCoordinateLoading) return <div>loading</div>;
  if (!isCoordinateSuccess) return <div>fail</div>;

  return (
    <Box
      sx={{
        background: 'white',
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography fontWeight={600} fontSize={14} sx={{ mb: 1 }}>
        좌표❗️
      </Typography>
      <DataGrid
        sx={{ background: 'white', fontSize: 14 }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        {...dataGridProps}
      />
    </Box>
  );
}

// 2. 상품 수정용 컴포넌트 (배경 강조)
export function CoordinateSelectEdit({
  columns,
  productData,
}: {
  columns: any[];
  productData: any;
}) {
  const { rows, isCoordinateLoading, isCoordinateSuccess } =
    useCoordinateRows();

  let dataGridProps: any = {};
  if (productData && Array.isArray(productData.selectedCoordinateIds)) {
    dataGridProps.getRowClassName = (params: any) =>
      productData.selectedCoordinateIds.map(String).includes(String(params.id))
        ? 'highlight-row'
        : '';
  }

  if (isCoordinateLoading) return <div>loading</div>;
  if (!isCoordinateSuccess) return <div>fail</div>;

  return (
    <Box
      sx={{
        background: 'white',
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography fontWeight={600} fontSize={14} sx={{ mb: 1 }}>
        좌표❗️
      </Typography>
      <DataGrid
        sx={{ background: 'white', fontSize: 14 }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        {...dataGridProps}
      />
      <style jsx global>{`
        .highlight-row {
          background-color: #ffe0b2 !important;
        }
      `}</style>
    </Box>
  );
}
