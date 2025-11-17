'use client';

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useCreateLogiPocaProduct } from '@/query/query/logiPocaProducts';

const initialForm = {
  title: '',
  artist: '',
  member: '',
  company: '',
  sku: '',
  thumbNailUrl: '',
  description: '',
  price: '',
  stock: '',
};

export default function CreateLogiPocaProductForm() {
  const [formValues, setFormValues] = useState(initialForm);
  const [error, setError] = useState('');

  const { mutateAsync, isPending } = useCreateLogiPocaProduct();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formValues.title || !formValues.price || !formValues.stock) {
      setError('상품명, 가격, 재고를 입력해 주세요.');
      return;
    }

    await mutateAsync({
      title: formValues.title,
      artist: formValues.artist || undefined,
      member: formValues.member || undefined,
      company: formValues.company || undefined,
      sku: formValues.sku || undefined,
      thumbNailUrl: formValues.thumbNailUrl || undefined,
      description: formValues.description || undefined,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
    });

    setFormValues(initialForm);
    setError('');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        포토카드 등록
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="상품명 *"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="SKU"
              name="sku"
              value={formValues.sku}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="아티스트"
              name="artist"
              value={formValues.artist}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="멤버"
              name="member"
              value={formValues.member}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="유통사"
              name="company"
              value={formValues.company}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="썸네일 URL"
              name="thumbNailUrl"
              value={formValues.thumbNailUrl}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="가격 *"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="재고 *"
              name="stock"
              type="number"
              value={formValues.stock}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <TextField
            label="설명"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            multiline
            minRows={3}
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button variant="contained" type="submit" disabled={isPending}>
            {isPending ? '등록 중...' : '등록'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
