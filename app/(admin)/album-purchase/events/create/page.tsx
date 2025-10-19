'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAlbums } from '@/query/query/album-purchase/albums';
import { useCreateEvent } from '@/query/query/album-purchase/events';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

export default function CreateEventPage() {
  const router = useRouter();
  const { data: albums } = useGetAlbums();
  const createMutation = useCreateEvent();

  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    eventDescription: '',
    memo: '',
    purchaseAlbumPrice: '',
    photocardPrice: '',
    purchaseAlbumAndPhotocardPrice: '',
    etcPrice: '0',
    etcDescription: '',
    eventDate: '',
    deadlineForArrivalDate: '',
    limitPeriodDate: '7',
    eventStatus: 'AVAILABLE_FOR_PURCHASE',
    eventPurchaseType: 'ONLY_ALBUM',
  });

  const handleAlbumSelect = (album: any) => {
    setSelectedAlbum(album);
    setFormData({
      ...formData,
      title: album.title,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAlbum) {
      alert('앨범을 선택해주세요.');
      return;
    }

    try {
      await createMutation.mutateAsync({
        albumPurchaseId: selectedAlbum.id,
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
        isbn: selectedAlbum.isbn,
        albumTitle: selectedAlbum.title,
        albumArtist: selectedAlbum.artist,
        albumReleaseDate: selectedAlbum.releaseDate,
        albumEntertainmentAgency: selectedAlbum.entertainmentAgency,
        eventStatus: formData.eventStatus as any,
        eventPurchaseType: formData.eventPurchaseType as any,
      });
      alert('행사가 등록되었습니다.');
      router.push('/album-purchase/events');
    } catch (error) {
      console.error('행사 등록 실패:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        행사 등록
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* 앨범 선택 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            앨범 선택
          </Typography>
          <Autocomplete
            options={albums || []}
            getOptionLabel={(option: any) =>
              `[${option.isbn}] ${option.title} - ${option.artist}`
            }
            value={selectedAlbum}
            onChange={(_, newValue) => handleAlbumSelect(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="앨범 검색" required />
            )}
          />
          {selectedAlbum && (
            <Box sx={{ mt: 2, p: 2, background: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>선택된 앨범:</strong> {selectedAlbum.title}
              </Typography>
              <Typography variant="body2">
                <strong>아티스트:</strong> {selectedAlbum.artist}
              </Typography>
              <Typography variant="body2">
                <strong>ISBN:</strong> {selectedAlbum.isbn}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* 행사 기본 정보 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: 18, fontWeight: 600 }}
          >
            행사 정보
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
                setFormData({ ...formData, eventStatus: e.target.value })
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
                setFormData({ ...formData, eventPurchaseType: e.target.value })
              }
            >
              <MenuItem value="ONLY_ALBUM">앨범만</MenuItem>
              <MenuItem value="ONLY_PHOTOCARD">포토카드만</MenuItem>
              <MenuItem value="ALBUM_AND_PHOTOCARD">앨범 + 포토카드</MenuItem>
              <MenuItem value="ETC">기타</MenuItem>
            </TextField>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!selectedAlbum}
            sx={{ background: '#4caf50', '&:hover': { background: '#45a049' } }}
          >
            등록
          </Button>
          <Button variant="outlined" size="large" onClick={() => router.back()}>
            취소
          </Button>
        </Box>
      </form>
    </Box>
  );
}
