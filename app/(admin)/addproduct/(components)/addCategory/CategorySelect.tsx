import React from 'react';
import { useGetAllCategory } from '@/query/query/category';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';

export default function CategorySelect({
  onChange,
  name = 'categoryId',
  value,
}: {
  onChange: (event: SelectChangeEvent) => void;
  name?: string;
  value?: string | number;
}) {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
  } = useGetAllCategory();

  if (isCategoryLoading) return <div>loading</div>;
  if (!isCategorySuccess) return <div>fail</div>;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography fontWeight={600} fontSize={14} sx={{ minWidth: 70 }}>
        카테고리❗️
      </Typography>
      {/*
        label/input id를 name 기반으로 고유하게 구성해 재사용 컴포넌트가
        다른 폼에서도 충돌 없이 사용할 수 있도록 한다.
      */}
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id={`${name}-label`}>카테고리 선택(필수)</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          label="카테고리 선택(필수)"
          onChange={onChange}
          value={
            value === undefined || value === null || value === '' ? '' : value
          }
        >
          <MenuItem value="">카테고리 선택(필수)</MenuItem>
          {categoryData.map((category: any, i: number) => (
            <MenuItem key={`category.title${i}`} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
