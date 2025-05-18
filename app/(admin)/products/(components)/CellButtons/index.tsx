import { useDeleteAProduct } from '@/query/query/products';
import React from 'react';
import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import { ProductAverageModal } from '@/components/modal/productAverageModal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CellButtons({ info }: any) {
  const { mutate: deleteProduct, isPending } = useDeleteAProduct();
  const {
    Modal: ModalAlert,
    isOpen: alertIsOpen,
    openModal: alertOpen,
    closeModal: alertClose,
  } = useModal();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Button
          color="error"
          variant="outlined"
          size="small"
          sx={{
            minWidth: 40,
            px: 1,
            py: 0.5,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: 12,
          }}
          onClick={() => {
            if (confirm('삭제하시겠습니까?')) {
              deleteProduct(info.row.original.id);
            }
          }}
          disabled={isPending}
        >
          삭제
        </Button>
        <Link
          href={`/products/${info.row.original.id}`}
          passHref
          legacyBehavior
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 40,
              px: 1,
              py: 0.5,
              fontWeight: 600,
              borderRadius: 2,
              fontSize: 12,
            }}
            component="a"
            disabled={isPending}
          >
            수정
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Link
          href={`/products/copy/${info.row.original.id}`}
          passHref
          legacyBehavior
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 40,
              px: 1,
              py: 0.5,
              fontWeight: 600,
              borderRadius: 2,
              fontSize: 12,
            }}
            component="a"
            disabled={isPending}
          >
            복사
          </Button>
        </Link>
        <Button
          variant="outlined"
          size="small"
          sx={{
            minWidth: 40,
            px: 1,
            py: 0.5,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: 12,
          }}
          onClick={alertOpen}
          disabled={isPending}
        >
          평균
        </Button>
      </Box>
      <ModalAlert isOpen={alertIsOpen} closeModal={alertClose}>
        <ProductAverageModal
          content={'평균매입가'}
          closeModal={alertClose}
          productId={info.row.original.id}
        />
      </ModalAlert>
    </Box>
  );
}
