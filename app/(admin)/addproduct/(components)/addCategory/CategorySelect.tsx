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
}: {
  onChange: (event: SelectChangeEvent) => void;
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
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="categoryId-label">카테고리 선택(필수)</InputLabel>
        <Select
          labelId="categoryId-label"
          id="categoryId"
          name="categoryId"
          label="카테고리 선택(필수)"
          onChange={onChange}
          defaultValue=""
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
