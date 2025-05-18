'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ProductListDownload from './(components)/productListlDownload';
import ExcelUpload from './(components)/excelUpload';
import ExcelDownload from './(components)/excelDownload';
import ExcelUploadForUpdate from './(components)/excelUploadForUpload';
import ExcelDownloadForUpdate from './(components)/excelDownloadForupload';
import ProductTable from './(components)/ProductTable';
import { useGetAllproducts } from '@/query/query/products';

export default function Products() {
  const { data: productsData, isLoading } = useGetAllproducts();

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          background: 'white',
          p: 2,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          mb: 2,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        상품-목록
        <Box sx={{ ml: 2 }}>
          <ProductListDownload
            productsData={productsData}
            isLoading={isLoading}
          />
        </Box>
      </Typography>
      <Paper
        sx={{
          background: 'white',
          p: 2,
          mb: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography fontWeight={700} mb={1}>
          대량등록
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <span>엑셀 업로드</span>
          <ExcelUpload />
        </Box>
        <ExcelDownload />
      </Paper>
      <Paper
        sx={{
          background: 'white',
          p: 2,
          mb: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography fontWeight={700} mb={1}>
          대량 수정
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <span>엑셀 업로드로 수정</span>
          <ExcelUploadForUpdate />
        </Box>
        <ExcelDownloadForUpdate />
      </Paper>
      <Paper
        sx={{
          background: 'white',
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <ProductTable />
      </Paper>
    </Box>
  );
}
