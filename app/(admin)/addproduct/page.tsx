'use client';
import AddCategory from './(components)/addCategory/AddCategory';
import useInput from '@/hooks/useInput';
import CategorySelect from './(components)/addCategory/CategorySelect';
import { ProductData } from '@/types/productData';
import ProductInput from '@/components/productInput';
import { useCreateAProduct } from '@/query/query/products';
import AddCoordinate from './(components)/addCoordinate/AddCoordinate';
import { CoordinateSelectRegister } from './(components)/addCoordinate/CoordinateSelect';
import { useState } from 'react';
import DeleteCategory from './(components)/addCategory/DeleteCategory';
import { coordinatesColumns } from './(components)/addCoordinate/coordinatesColumns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const {
    value: addProductData,
    onChange,
    reset,
  } = useInput<ProductData>({
    categoryId: '',
    sku: '',
    title: '',
    thumbNailUrl: '',
    descriptionUrl: '',
    artist: '',
    ent: '',
    company: '',
    member: '',
    stock: 0,
    price: 0,
    purchase: 0,
    weight: 0,
    x: 0,
    y: 0,
    z: 0,
    barcode: '',
    releaseDate: 0,
    deadlineDate: 0,
    coordinateIds: [],
  });
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const { mutateAsync: createAProduct, isPending } = useCreateAProduct();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductData.coordinateIds = selectedRowIds;

    if (addProductData.categoryId === '')
      return alert('카테고리를 선택해주세요.');
    if (addProductData.coordinateIds.length < 1)
      return alert('좌표를 선택해주세요.');
    if (addProductData.title === '') return alert('상품명을 작성해주세요.');
    if (addProductData.barcode === '') return alert('Barcode를 작성해주세요.');

    addProductData.releaseDate = new Date(
      addProductData.releaseDate,
    ).toISOString();
    addProductData.deadlineDate = new Date(
      addProductData.deadlineDate,
    ).toISOString();

    createAProduct(addProductData).then((response) => {
      setSelectedRowIds([]);
      reset();

      // 상품 생성 후 상세 페이지로 이동할지 물어보기
      if (
        confirm(
          '상품이 생성되었습니다. 버전을 추가하려면 상품 상세 페이지로 이동하시겠습니까?',
        )
      ) {
        if (response?.id) {
          router.push(`/products/${response.id}`);
        }
      }
    });
  };

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
        }}
      >
        상품-등록
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
        <Alert severity="info" sx={{ mb: 2 }}>
          버전 관리는 상품 등록 후 상품 상세 페이지에서 가능합니다.
        </Alert>
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2, fontWeight: 600, borderRadius: 2 }}
            disabled={isPending}
          >
            {isPending ? '추가중...' : '상품추가'}
          </Button>
          <Paper
            sx={{
              background: 'white',
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <CategorySelect
                onChange={(e: SelectChangeEvent) => {
                  onChange({
                    target: {
                      name: e.target.name || 'categoryId',
                      value: e.target.value,
                    },
                  } as any);
                }}
              />
              <DeleteCategory categoryId={Number(addProductData.categoryId)} />
            </Box>
            <AddCategory />
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
            <CoordinateSelectRegister
              columns={coordinatesColumns}
              setSelectedRowIds={setSelectedRowIds}
            />
            <AddCoordinate />
          </Paper>
          <ProductInput addProductData={addProductData} onChange={onChange} />
        </form>
      </Paper>
    </Box>
  );
}
