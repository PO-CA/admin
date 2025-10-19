'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  useGetEventDetail,
  useUpdateEvent,
} from '@/query/query/album-purchase/events';
import type { EventStatus, EventPurchaseType } from '@/types/albumPurchase';
import { useSnackbar } from '../../../_components/useSnackbar';

function EditEventForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const { data: event, isLoading } = useGetEventDetail(eventId);
  const updateMutation = useUpdateEvent();
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const [formData, setFormData] = useState({
    title: '',
    eventDescription: '',
    memo: '',
    purchaseAlbumPrice: '',
    photocardPrice: '',
    purchaseAlbumAndPhotocardPrice: '',
    etcPrice: '',
    etcDescription: '',
    eventDate: '',
    deadlineForArrivalDate: '',
    limitPeriodDate: '',
    isVisible: true,
    isFinished: false,
    eventStatus: 'AVAILABLE_FOR_PURCHASE' as EventStatus,
    eventPurchaseType: 'ONLY_ALBUM' as EventPurchaseType,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        eventDescription: event.eventDescription || '',
        memo: event.memo || '',
        purchaseAlbumPrice: event.purchaseAlbumPrice?.toString() || '',
        photocardPrice: event.photocardPrice?.toString() || '',
        purchaseAlbumAndPhotocardPrice:
          event.purchaseAlbumAndPhotocardPrice?.toString() || '',
        etcPrice: event.etcPrice?.toString() || '',
        etcDescription: event.etcDescription || '',
        eventDate: event.eventDate || '',
        deadlineForArrivalDate: event.deadlineForArrivalDate || '',
        limitPeriodDate: event.limitPeriodDate?.toString() || '',
        isVisible: event.isVisible ?? true,
        isFinished: event.isFinished ?? false,
        eventStatus: event.eventStatus || 'AVAILABLE_FOR_PURCHASE',
        eventPurchaseType: event.eventPurchaseType || 'ONLY_ALBUM',
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        eventId,
        requestData: {
          title: formData.title,
          eventDescription: formData.eventDescription,
          memo: formData.memo,
          purchaseAlbumPrice: Number(formData.purchaseAlbumPrice),
          photocardPrice: Number(formData.photocardPrice),
          purchaseAlbumAndPhotocardPrice: Number(
            formData.purchaseAlbumAndPhotocardPrice,
          ),
          etcPrice: Number(formData.etcPrice),
          etcDescription: formData.etcDescription,
          eventDate: formData.eventDate,
          deadlineForArrivalDate: formData.deadlineForArrivalDate,
          limitPeriodDate: formData.limitPeriodDate
            ? Number(formData.limitPeriodDate)
            : undefined,
          isVisible: formData.isVisible,
          isFinished: formData.isFinished,
          eventStatus: formData.eventStatus,
          eventPurchaseType: formData.eventPurchaseType,
        },
      });
      showSnackbar('행사가 수정되었습니다.', 'success');
      setTimeout(() => router.push(`/album-purchase/events/${eventId}`), 1500);
    } catch (error: any) {
      showSnackbar(error?.message || '행사 수정에 실패했습니다.', 'error');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <SnackbarComponent />
      <form onSubmit={handleSubmit}>
        {/* 기본 정보 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            기본 정보
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="행사명"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="행사 설명"
              multiline
              rows={3}
              value={formData.eventDescription}
              onChange={(e) =>
                setFormData({ ...formData, eventDescription: e.target.value })
              }
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="행사일"
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="도착 마감일"
                type="date"
                required
                value={formData.deadlineForArrivalDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deadlineForArrivalDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* 가격 정보 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            매입 가격
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="앨범만"
              type="number"
              required
              value={formData.purchaseAlbumPrice}
              onChange={(e) =>
                setFormData({ ...formData, purchaseAlbumPrice: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="포토카드만"
              type="number"
              required
              value={formData.photocardPrice}
              onChange={(e) =>
                setFormData({ ...formData, photocardPrice: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="앨범 + 포토카드"
              type="number"
              required
              value={formData.purchaseAlbumAndPhotocardPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchaseAlbumAndPhotocardPrice: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="기타"
              type="number"
              required
              value={formData.etcPrice}
              onChange={(e) =>
                setFormData({ ...formData, etcPrice: e.target.value })
              }
            />
          </Box>
        </Paper>

        {/* 상태 설정 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            상태 설정
          </Typography>
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                select
                label="행사 상태"
                value={formData.eventStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventStatus: e.target.value as EventStatus,
                  })
                }
              >
                <MenuItem value="AVAILABLE_FOR_PURCHASE">매입 가능</MenuItem>
                <MenuItem value="DISCONTINUED">매입 중단</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="매입 타입"
                value={formData.eventPurchaseType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventPurchaseType: e.target.value as EventPurchaseType,
                  })
                }
              >
                <MenuItem value="ONLY_ALBUM">앨범만</MenuItem>
                <MenuItem value="ONLY_PHOTOCARD">포토카드만</MenuItem>
                <MenuItem value="ALBUM_AND_PHOTOCARD">앨범 + 포토카드</MenuItem>
                <MenuItem value="ETC">기타</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isVisible}
                    onChange={(e) =>
                      setFormData({ ...formData, isVisible: e.target.checked })
                    }
                  />
                }
                label="공개"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isFinished}
                    onChange={(e) =>
                      setFormData({ ...formData, isFinished: e.target.checked })
                    }
                  />
                }
                label="종료"
              />
            </Box>
          </Stack>
        </Paper>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
            startIcon={
              updateMutation.isPending && (
                <CircularProgress size={20} color="inherit" />
              )
            }
          >
            {updateMutation.isPending ? '수정 중...' : '수정 완료'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={updateMutation.isPending}
          >
            취소
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default function EditEventPage() {
  const params = useParams();
  const eventId = Number(params.eventId);

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
        행사 수정
      </Typography>
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <EditEventForm eventId={eventId} />
      </Suspense>
    </Box>
  );
}
