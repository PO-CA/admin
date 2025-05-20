'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetBoard } from '@/query/query/board';
import Link from 'next/link';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
  LinearProgress,
  Breadcrumbs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function BoardDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: board, isLoading } = useGetBoard(Number(id));

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <LinearProgress />
          <Box sx={{ p: 5, textAlign: 'center' }}>로딩중...</Box>
        </Paper>
      </Container>
    );
  }

  if (!board) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            공지사항을 찾을 수 없습니다.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
            component={Link}
            href="/board"
          >
            목록으로 돌아가기
          </Button>
        </Paper>
      </Container>
    );
  }

  const formattedDate = board.createdAt
    ? new Date(board.createdAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* 상단 네비게이션 */}
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/dashboard"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            홈
          </Link>
          <Link
            href="/board"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            게시판
          </Link>
          <Typography color="text.primary">상세보기</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* 공지사항 헤더 */}
        <Box sx={{ p: 3, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {board.title}
            {!board.visible && (
              <Chip
                label="숨김"
                size="small"
                variant="outlined"
                color="default"
                sx={{ ml: 2, height: 24 }}
              />
            )}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 1,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography variant="body2">{formattedDate}</Typography>
          </Box>
        </Box>

        {/* 공지사항 내용 */}
        <Box
          sx={{
            p: 3,
            minHeight: 300,
            backgroundColor: '#fafafa',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {board.content}
          </Typography>
        </Box>

        <Divider />

        {/* 하단 버튼 영역 */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/board')}
          >
            목록으로
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
