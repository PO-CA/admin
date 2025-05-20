'use client';
import React, { useState } from 'react';
import { useDeleteNotice, useGetNotices } from '@/query/query/notice';
import Link from 'next/link';
// MUI components
import {
  Container,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Pagination,
  Divider,
  Chip,
  LinearProgress,
  styled,
} from '@mui/material';
import { useGetBoards } from '@/query/query/board';

// 스타일이 적용된 테이블 헤더 셀
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontWeight: 'bold',
}));

export default function AdminBoardPage() {
  const { data: boards, isLoading } = useGetBoards();

  // 페이지네이션 상태 관리
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // 페이지당 표시할 항목 수

  // 페이지 변경 핸들러
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

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
  // 페이지네이션 적용
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedBoards = boards.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(boards.length / rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          스텝 게시판
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          중요한 안내사항을 확인하세요
        </Typography> */}
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* 로딩 상태 표시 */}
        {isLoading && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell align="center" width={80}>
                  번호
                </StyledTableHeadCell>
                <StyledTableHeadCell>제목</StyledTableHeadCell>
                <StyledTableHeadCell align="center" width={150}>
                  등록일
                </StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedBoards.length > 0 ? (
                displayedBoards.map((board: any, idx: number) => (
                  <TableRow
                    key={board.id}
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                    component={Link as any}
                    href={`/board/${board.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <TableCell align="center">{board.id}</TableCell>
                    <TableCell>
                      {board.title}{' '}
                      {!board.visible && (
                        <Chip
                          label="숨김"
                          size="small"
                          variant="outlined"
                          color="default"
                          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {board.createdAt.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">
                      등록된 게시글이 없습니다.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        {/* 페이지네이션 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>
    </Container>
  );
}
