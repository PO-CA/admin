'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { shippingColumns } from '@/app/(admin)/shippings/(components)/tableColumns/shippingColumns';
import { useGetAllShippingsByUsersEmail } from '@/query/query/shippings';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function UserShippings({ usersEmail }: { usersEmail: string }) {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByUsersEmail(usersEmail);
  const [videoDialog, setVideoDialog] = useState({
    open: false,
    videoUrl: '',
  });

  // 영상보기 버튼 클릭 이벤트 핸들러 설정
  useEffect(() => {
    // shippingColumns의 videoStatus 컬럼에 있는 영상재생 버튼에 클릭 이벤트 추가
    const buttons = document.querySelectorAll('.video-play-button');
    buttons.forEach((button) => {
      const videoUrl = button.getAttribute('data-video-url');
      if (videoUrl) {
        button.addEventListener('click', () => handleOpenVideoDialog(videoUrl));
      }
    });

    return () => {
      // 이벤트 리스너 정리
      buttons.forEach((button) => {
        const videoUrl = button.getAttribute('data-video-url');
        if (videoUrl) {
          button.removeEventListener('click', () =>
            handleOpenVideoDialog(videoUrl),
          );
        }
      });
    };
  }, [shippingData]);

  const handleOpenVideoDialog = (videoUrl: string) => {
    setVideoDialog({
      open: true,
      videoUrl,
    });
  };

  const handleCloseVideoDialog = () => {
    setVideoDialog({
      open: false,
      videoUrl: '',
    });
  };

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!shippingData) return [];
    return shippingData.map((row: any, idx: number) => ({
      id: row.id || idx,
      ...row,
    }));
  }, [shippingData]);

  if (isShippingLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isShippingSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Failed to load data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 600 }}>
      <DataGrid
        rows={rows}
        columns={shippingColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
        loading={isShippingLoading}
        sx={{
          backgroundColor: 'white',
          fontSize: 14,
        }}
        onCellClick={(params) => {
          if (
            params.field === 'videoStatus' &&
            params.row.videoStatus === '영상저장' &&
            params.row.videoUrl
          ) {
            handleOpenVideoDialog(params.row.videoUrl);
          }
        }}
      />
      {/* 비디오 다이얼로그 */}
      <Dialog
        open={videoDialog.open}
        onClose={handleCloseVideoDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>배송 영상</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', textAlign: 'center', pt: 2 }}>
            {videoDialog.videoUrl && (
              <video
                controls
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
                src={videoDialog.videoUrl}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVideoDialog} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
