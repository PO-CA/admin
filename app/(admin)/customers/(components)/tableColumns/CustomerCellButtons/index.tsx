import React from 'react';
import { Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useModal } from '@/hooks/useModal';
import { CustomerUpdateAddress } from '@/components/modal/customerUpdateAddress';

export default function CustomerCellButtons({ info }: any) {
  const {
    Modal: ModalAlert,
    isOpen: alertIsOpen,
    openModal: alertOpen,
    closeModal: alertClose,
  } = useModal();

  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        startIcon={<EditIcon />}
        onClick={alertOpen}
        sx={{
          minWidth: 'unset',
          fontSize: 12,
          py: 0.5,
          px: 1,
        }}
      >
        수정
      </Button>
      <ModalAlert isOpen={alertIsOpen} closeModal={alertClose}>
        <CustomerUpdateAddress
          content={'주소 수정'}
          closeModal={alertClose}
          addressInfo={info.row.original}
        />
      </ModalAlert>
    </Box>
  );
}
