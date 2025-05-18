import {
  useCreateAProductAveragePrice,
  useGetAllproductAveragePrice,
} from '@/query/query/products';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function ProductAverageModal({
  content,
  closeModal,
  productId,
}: {
  content: string;
  closeModal: () => void;
  productId: number;
}) {
  const {
    data: averagePrice,
    isLoading,
    isSuccess,
  } = useGetAllproductAveragePrice(productId);

  const { mutateAsync, isPending } = useCreateAProductAveragePrice();

  const [price, setPrice] = useState<any>(null);
  const [qty, setQty] = useState<any>(null);
  const [average, setAverage] = useState<any>(null);

  useEffect(() => {
    if (averagePrice) {
      setAverage({
        totalBuy: averagePrice.length,
        totalQty: averagePrice.reduce(
          (total: any, item: any) => total + item.qty,
          0,
        ),
        averagePrice: (function (items) {
          const totalQty = items.reduce(
            (total: any, item: any) => total + item.qty,
            0,
          );
          const totalPrice = items.reduce(
            (total: any, item: any) => total + item.price * item.qty,
            0,
          );
          if (totalQty === 0) return 0;
          return totalPrice / totalQty;
        })(averagePrice),
      });
    }
  }, [averagePrice]);

  return (
    <Box
      sx={{
        p: 3,
        minWidth: 340,
        background: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2} textAlign="center">
        {content}
      </Typography>
      <Box sx={{ display: 'flex', mb: 3, justifyContent: 'center', gap: 4 }}>
        <Box>
          <Typography fontSize={14}>매입</Typography>
          <Typography fontWeight={600}>{average?.totalBuy} 건</Typography>
        </Box>
        <Box>
          <Typography fontSize={14}>전체 매입량</Typography>
          <Typography fontWeight={600}>{average?.totalQty} 개</Typography>
        </Box>
        <Box>
          <Typography fontSize={14}>평균매입가</Typography>
          <Typography fontWeight={600}>
            {average?.averagePrice?.toFixed(0)} 원
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        {isSuccess &&
          averagePrice &&
          averagePrice.map((item: any, i: number) => (
            <Box
              key={i}
              sx={{
                minWidth: 80,
                p: 1,
                border: '1px solid #eee',
                borderRadius: 1,
              }}
            >
              <Typography fontSize={13} fontWeight={600}>
                {i + 1}
              </Typography>
              <Typography fontSize={13}>수량: {item.qty} 개</Typography>
              <Typography fontSize={13}>매입가: {item.price} 원</Typography>
            </Box>
          ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="수량"
          type="number"
          size="small"
          value={qty ?? ''}
          onChange={(e) => setQty(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          label="매입가"
          type="number"
          size="small"
          value={price ?? ''}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await mutateAsync({ productId, qty, price }).then(() => {
              setQty(0);
              setPrice(0);
              alert('매입 내역을 추가했습니다.');
            });
          }}
          disabled={isPending || isLoading}
        >
          {isPending || isLoading ? '추가중...' : '추가'}
        </Button>
        <Button variant="outlined" color="inherit" onClick={closeModal}>
          닫기
        </Button>
      </Box>
    </Box>
  );
}
