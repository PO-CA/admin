'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { useGetEventDetail } from '@/query/query/album-purchase/events';

function EventDetailContent({ eventId }: { eventId: number }) {
  const { data: event, isLoading } = useGetEventDetail(eventId);
  const router = useRouter();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Typography variant="body1" sx={{ p: 3 }}>
        행사를 찾을 수 없습니다.
      </Typography>
    );
  }

  const infoItems = [
    { label: '행사 ID', value: event.id },
    { label: '행사명', value: event.title },
    { label: '행사일', value: event.eventDate },
    { label: '마감일', value: event.deadlineForArrivalDate },
    { label: '공개 여부', value: event.isVisible ? '공개' : '비공개' },
    { label: '종료 여부', value: event.isFinished ? '종료' : '진행 중' },
  ];

  const albumInfoItems = [
    { label: '음반명', value: event.albumTitle },
    { label: '아티스트', value: event.albumArtist },
    { label: 'ISBN', value: event.isbn },
    { label: '발매일', value: event.albumReleaseDate },
    { label: '소속사', value: event.albumEntertainmentAgency || '-' },
  ];

  const priceItems = [
    { label: '앨범만', value: `₩${event.purchaseAlbumPrice.toLocaleString()}` },
    { label: '포토카드만', value: `₩${event.photocardPrice.toLocaleString()}` },
    {
      label: '앨범 + 포토카드',
      value: `₩${event.purchaseAlbumAndPhotocardPrice.toLocaleString()}`,
    },
    { label: '기타', value: `₩${event.etcPrice.toLocaleString()}` },
  ];

  return (
    <Box>
      {/* 기본 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
            행사 정보
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={event.isVisible ? '공개' : '비공개'}
              color={event.isVisible ? 'success' : 'default'}
              size="small"
            />
            <Chip
              label={event.isFinished ? '종료' : '진행 중'}
              color={event.isFinished ? 'default' : 'primary'}
              size="small"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {infoItems.map((item) => (
            <Box key={item.label}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 음반 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          음반 정보
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {albumInfoItems.map((item) => (
            <Box key={item.label}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 가격 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}>
          매입 가격
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {priceItems.map((item) => (
            <Box key={item.label}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 추가 정보 */}
      {(event.eventDescription || event.memo || event.etcDescription) && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            추가 정보
          </Typography>
          {event.eventDescription && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                행사 설명
              </Typography>
              <Typography variant="body1">{event.eventDescription}</Typography>
            </Box>
          )}
          {event.etcDescription && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                기타 설명
              </Typography>
              <Typography variant="body1">{event.etcDescription}</Typography>
            </Box>
          )}
          {event.memo && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                메모
              </Typography>
              <Typography variant="body1">{event.memo}</Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* 액션 버튼 */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => router.push(`/album-purchase/events/${eventId}/edit`)}
        >
          수정
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/album-purchase/events')}
        >
          목록으로
        </Button>
      </Box>
    </Box>
  );
}

export default function EventDetailPage() {
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
        행사 상세
      </Typography>
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <EventDetailContent eventId={eventId} />
      </Suspense>
    </Box>
  );
}
