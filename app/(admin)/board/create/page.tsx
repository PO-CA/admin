'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCreateBoard } from '@/query/query/board';

export default function AdminBoardCreatePage() {
  const { mutate: createBoard, isPending } = useCreateBoard();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', visible: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBoard(form, { onSuccess: () => router.push('/board') });
  };

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
            href="/board"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            게시판 관리
          </Link>
          <Typography color="text.primary">새 글 작성</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            게시판 작성
          </Typography>
        </Box>

        {isPending && <LinearProgress />}

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
              disabled={isPending}
            >
              {isPending ? '저장 중...' : '저장'}
            </Button>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/board"
          >
            목록으로
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
