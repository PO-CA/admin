'use client';
import React, { useState, useEffect } from 'react';
import { useGetAllShippings } from '@/query/query/shippings';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import DeleteShippingButton from './deleteShippingButton';
import PayShippingButton from './payShippingButton';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { shippingColumns } from './tableColumns/shippingColumns';

export default function ShippingTable() {
  const { data: shippingData, isLoading } = useGetAllShippings();
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

  // 고유 데이터 ID로 행 데이터 설정
  const rows = (shippingData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  return (
    <>
      <DataGrid
        sx={{ height: 'auto', background: 'white', fontSize: 14 }}
        rows={rows}
        columns={shippingColumns}
        pageSizeOptions={[20, 50, 100]}
        loading={isLoading}
        disableRowSelectionOnClick
        showToolbar
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
    </>
  );
}
