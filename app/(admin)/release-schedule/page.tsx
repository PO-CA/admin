'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useGetReleaseSchedules,
  useCreateReleaseSchedule,
  useUpdateReleaseSchedule,
  useDeleteReleaseSchedule,
} from '@/query/query/release-schedules';

// 일정 타입 정의
interface Schedule {
  id: number;
  date: string;
  content: string;
}

export default function ReleaseSchedulePage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<{
    id: number | null;
    date: string;
    content: string;
  }>({
    id: null,
    date: '',
    content: '',
  });

  // TanStack Query 훅 사용
  const {
    data: schedules = [],
    isLoading,
    isError,
  } = useGetReleaseSchedules(year, month);
  const createMutation = useCreateReleaseSchedule();
  const updateMutation = useUpdateReleaseSchedule();
  const deleteMutation = useDeleteReleaseSchedule();

  // 달력 생성 함수
  const createCalendar = () => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const rows = Math.ceil((firstDay + lastDate) / 7);

    let calendar = [];
    let day = 1 - firstDay;

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if (day > 0 && day <= lastDate) {
          // 해당 날짜의 일정 찾기
          const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const daySchedules = schedules.filter(
            (schedule: Schedule) =>
              new Date(schedule.date).toISOString().split('T')[0] ===
              dateString,
          );

          row.push({
            day,
            schedules: daySchedules,
            dateString,
          });
        } else {
          row.push({ day: null, schedules: [] });
        }
        day++;
      }
      calendar.push(row);
    }

    return calendar;
  };

  // 일정 저장 핸들러
  const handleSaveSchedule = async () => {
    try {
      if (currentSchedule.id) {
        // 업데이트
        await updateMutation.mutateAsync({
          id: currentSchedule.id,
          date: currentSchedule.date,
          content: currentSchedule.content,
        });
      } else {
        // 새로 생성
        await createMutation.mutateAsync({
          date: currentSchedule.date,
          content: currentSchedule.content,
        });
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('일정 저장 중 오류 발생:', error);
    }
  };

  // 일정 삭제 핸들러
  const handleDeleteSchedule = async () => {
    try {
      if (currentSchedule.id) {
        await deleteMutation.mutateAsync(currentSchedule.id);
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('일정 삭제 중 오류 발생:', error);
    }
  };

  // 이전 달로 이동
  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  // 다음 달로 이동
  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (dateString: string) => {
    setCurrentSchedule({
      id: null,
      date: dateString,
      content: '',
    });
    setOpenDialog(true);
  };

  // 일정 편집 핸들러
  const handleEditSchedule = (schedule: Schedule) => {
    setCurrentSchedule({
      id: schedule.id,
      date: new Date(schedule.date).toISOString().split('T')[0],
      content: schedule.content,
    });
    setOpenDialog(true);
  };

  const calendar = createCalendar();

  if (isLoading) {
    return (
      <Container>
        <Typography>일정을 불러오는 중...</Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Typography color="error">
          일정을 불러오는 중 오류가 발생했습니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Typography
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: 'center' }}
      >
        신보안내
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button onClick={prevMonth}>◀ 이전</Button>
        <Typography variant="h6">
          {year}년 {month}월
        </Typography>
        <Button onClick={nextMonth}>다음 ▶</Button>
      </Box>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box
          sx={{ display: 'table', width: '100%', borderCollapse: 'collapse' }}
        >
          {/* 요일 헤더 */}
          <Box sx={{ display: 'table-row' }}>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                color: 'error.main',
                width: '14.28%',
              }}
            >
              <Typography>Sun</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                width: '14.28%',
              }}
            >
              <Typography>Mon</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                width: '14.28%',
              }}
            >
              <Typography>Tue</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                width: '14.28%',
              }}
            >
              <Typography>Wed</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                width: '14.28%',
              }}
            >
              <Typography>Thu</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderRight: '1px solid #eee',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                width: '14.28%',
              }}
            >
              <Typography>Fri</Typography>
            </Box>
            <Box
              sx={{
                display: 'table-cell',
                borderBottom: '1px solid #eee',
                p: 1,
                textAlign: 'center',
                color: 'primary.main',
                width: '14.28%',
              }}
            >
              <Typography>Sat</Typography>
            </Box>
          </Box>

          {/* 달력 내용 */}
          {calendar.map((week, weekIndex) => (
            <Box sx={{ display: 'table-row' }} key={weekIndex}>
              {week.map((day, dayIndex) => (
                <Box
                  sx={{
                    display: 'table-cell',
                    height: 120,
                    border: '1px solid #eee',
                    p: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: day.day ? 'pointer' : 'default',
                    verticalAlign: 'top',
                    width: '14.28%',
                  }}
                  key={dayIndex}
                  onClick={() => day.day && handleDateClick(day.dateString)}
                >
                  {day.day && (
                    <>
                      <Typography
                        sx={{
                          color:
                            dayIndex === 0
                              ? 'error.main'
                              : dayIndex === 6
                                ? 'primary.main'
                                : 'inherit',
                          fontWeight: 'bold',
                          fontSize: '0.7rem',
                        }}
                      >
                        {day.day}
                      </Typography>
                      {/* <Typography variant="caption" display="block">
                        {month}월 {day.day}일
                      </Typography> */}
                      {day.schedules.map((schedule: Schedule) => (
                        <Box
                          key={schedule.id}
                          sx={{
                            mt: 0.5,
                            p: 0.5,
                            backgroundColor: 'rgba(255, 255, 0, 0.3)',
                            fontSize: '0.7rem',
                            wordBreak: 'break-all',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '50px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditSchedule(schedule);
                          }}
                        >
                          {schedule.content}
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 페이지 하단 저작권 표시 */}
      {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          CopyRight Since 2001-{new Date().getFullYear()} PO-CA All Rights
          RESERVED.
        </Typography>
      </Box> */}

      {/* 일정 다이얼로그 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentSchedule.date &&
            new Date(currentSchedule.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
          일정
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="일정 내용"
            fullWidth
            multiline
            rows={4}
            value={currentSchedule.content}
            onChange={(e) =>
              setCurrentSchedule({
                ...currentSchedule,
                content: e.target.value,
              })
            }
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          {currentSchedule.id && (
            <Button
              onClick={handleDeleteSchedule}
              color="error"
              startIcon={<DeleteIcon />}
            >
              삭제
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            취소
          </Button>
          <Button
            onClick={handleSaveSchedule}
            color="primary"
            variant="contained"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending
              ? '저장 중...'
              : '저장'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
