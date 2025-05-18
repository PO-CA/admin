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
    if (rowSelectionModel.length > 0) {
      setSelectedRowIds(rowSelectionModel.map((id) => Number(id)));
    } else {
      setSelectedRowIds([]);
    }
  }, [rowSelectionModel, setSelectedRowIds]);

  let dataGridProps: any = {
    checkboxSelection: true,
    disableRowSelectionOnClick: true,
    onRowSelectionModelChange: (newSelectionModel: any) => {
      // DataGrid 8.x에서는 newSelectionModel이 객체 형태로 전달될 수 있음
      let selectionArray: any[] = [];

      if (Array.isArray(newSelectionModel)) {
        // 배열인 경우 그대로 사용
        selectionArray = newSelectionModel;
      } else if (newSelectionModel && typeof newSelectionModel === 'object') {
        // 객체인 경우 (type과 ids Set이 있는 형태)
        if (newSelectionModel.ids && newSelectionModel.ids instanceof Set) {
          // Set에서 배열로 변환
          selectionArray = Array.from(newSelectionModel.ids);
        }
      }
      setRowSelectionModel(selectionArray.map((id) => String(id)));
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
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
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

  // 각 row에 productId 정보 추가
  const enhancedRows = rows.map((row) => ({
    ...row,
    productId: productData?.id, // productData에서 id 추가
    isChecked:
      productData?.selectedCoordinateIds
        ?.map(String)
        .includes(String(row.id)) || false,
  }));

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
        rows={enhancedRows}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
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
