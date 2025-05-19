'use client';
import { useCreateAProduct, useGetAProduct } from '@/query/query/products';
import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';
import ProductInput from '@/components/productInput';
import CategorySelect from '../../../addproduct/(components)/addCategory/CategorySelect';
import DeleteCategory from '../../../addproduct/(components)/addCategory/DeleteCategory';
import AddCategory from '../../../addproduct/(components)/addCategory/AddCategory';
import { CoordinateSelectEdit } from '../../../addproduct/(components)/addCoordinate/CoordinateSelect';
import AddCoordinate from '../../../addproduct/(components)/addCoordinate/AddCoordinate';
import { ProductData } from '@/types/productData';
import { coordinatesColumns } from '@/app/(admin)/addproduct/(components)/addCoordinate/coordinatesColumns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material/Select';

export default function ProductCopy({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetAProduct(productId);

  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const { mutateAsync: createAProduct, isPending } = useCreateAProduct();

  const {
    value: productInputData,
    setValue,
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

  useEffect(() => {
    if (productData !== undefined)
      setValue({
        categoryId: productData.logiCategory.id || '',
        sku: productData.sku || '',
        title: productData.title || '',
        thumbNailUrl: productData.thumbNailUrl || '',
        descriptionUrl: productData.descriptionUrl || '',
        artist: productData.artist || '',
        ent: productData.ent || '',
        member: productData.member || '',
        company: productData.company || '',
        stock: productData.stock || 0,
        price: productData.price || 0,
        purchase: productData.purchase || 0,
        weight: productData.weight || 0,
        x: productData.x || 0,
        y: productData.y || 0,
        z: productData.z || 0,
        barcode: productData.barcode || '',
        releaseDate: productData.releaseDate || '',
        deadlineDate: productData.deadlineDate || '',
        coordinateIds: [],
      });
  }, [productData, setValue]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    productInputData.coordinateIds = selectedRowIds;

    if (productInputData.categoryId === '')
      return alert('카테고리를 선택해주세요.');

    if (productInputData.title === '') return alert('상품명을 작성해주세요.');
    if (productInputData.sku === '') return alert('sku를 작성해주세요.');
    if (productInputData.barcode === '')
      return alert('Barcode를 작성해주세요.');

    productInputData.releaseDate = new Date(
      productInputData.releaseDate,
    ).toISOString();
    productInputData.deadlineDate = new Date(
      productInputData.deadlineDate,
    ).toISOString();

    createAProduct(productInputData).then(() => {
      setSelectedRowIds([]);
      reset();
    });
  };

  if (isProductLoading) return <div>loading</div>;

  if (!isProductSuccess) return <div>fail</div>;

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
        상품-복사 등록
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
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2, fontWeight: 600, borderRadius: 2 }}
            disabled={isPending}
          >
            {isPending ? '복사중...' : '상품 복사'}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: 80, fontWeight: 600 }}>
              상품번호
            </Typography>
            <TextField
              value={productId}
              size="small"
              disabled
              sx={{ minWidth: 120 }}
            />
          </Box>
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
              <DeleteCategory
                categoryId={Number(productInputData.categoryId)}
              />
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
            <CoordinateSelectEdit
              columns={coordinatesColumns}
              productData={productData}
            />
            <AddCoordinate />
          </Paper>
          <ProductInput addProductData={productInputData} onChange={onChange} />
        </form>
      </Paper>
    </Box>
  );
}
