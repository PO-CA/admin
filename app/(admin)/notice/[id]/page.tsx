'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetNotice,
  useUpdateNotice,
  useDeleteNotice,
} from '@/query/query/notice';
import Link from 'next/link';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Breadcrumbs,
  Stack,
  LinearProgress,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AdminNoticeDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: notice, isLoading } = useGetNotice(Number(id));
  const { mutate: updateNotice, isPending: isUpdating } = useUpdateNotice();
  const { mutate: deleteNotice, isPending: isDeleting } = useDeleteNotice();
  const router = useRouter();

  const [form, setForm] = useState({ title: '', content: '', visible: true });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (notice)
      setForm({
        title: notice.title,
        content: notice.content,
        visible: notice.visible,
      });
  }, [notice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotice(
      { id: Number(id), ...form },
      {
        onSuccess: () => {
          setSaveMessage('공지사항이 성공적으로 수정되었습니다.');
          setTimeout(() => setSaveMessage(''), 3000);
        },
      },
    );
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteNotice(Number(id), {
        onSuccess: () => router.push('/notice'),
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <LinearProgress />
          <Box sx={{ p: 5, textAlign: 'center' }}>로딩중...</Box>
        </Paper>
      </Container>
    );
  }

  if (!notice) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            공지사항을 찾을 수 없습니다.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
            component={Link}
            href="/notice"
          >
            목록으로 돌아가기
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* 상단 네비게이션 */}
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/admin"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            관리자
          </Link>
          <Link
            href="/notice"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            공지사항 관리
          </Link>
          <Typography color="text.primary">글 수정</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            공지사항 상세/수정
          </Typography>
        </Box>

        {saveMessage && (
          <Alert severity="success" sx={{ mx: 3, mt: 2 }}>
            {saveMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <TextField
            label="제목"
            fullWidth
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <TextField
            label="내용"
            fullWidth
            multiline
            minRows={10}
            maxRows={20}
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
            required
            variant="outlined"
            sx={{ mb: 3 }}
            // 줄바꿈이 제대로 저장되도록 설정
            InputProps={{
              style: { whiteSpace: 'pre-wrap' },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.visible}
                onChange={(e) =>
                  setForm((f) => ({ ...f, visible: e.target.checked }))
                }
                color="primary"
              />
            }
            label="공개 여부"
            sx={{ mb: 3, display: 'block' }}
          />

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isUpdating}
            >
              {isUpdating ? '저장 중...' : '수정 저장'}
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              삭제
            </Button>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/notice"
          >
            목록으로
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
