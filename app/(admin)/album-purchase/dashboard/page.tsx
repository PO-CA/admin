'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useGetDashboardStats } from '@/query/query/album-purchase/settlements';

function DashboardContent() {
  const { data: stats, isLoading } = useGetDashboardStats();
  const router = useRouter();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const quickLinks = [
    { href: '/album-purchase/albums', text: '앨범 관리', color: '#2196f3' },
    { href: '/album-purchase/events', text: '행사 관리', color: '#9c27b0' },
    { href: '/album-purchase/requests', text: '매입 신청', color: '#ff9800' },
    { href: '/album-purchase/receipts', text: '수령 처리', color: '#4caf50' },
    {
      href: '/album-purchase/settlements',
      text: '정산 관리',
      color: '#f44336',
    },
    {
      href: '/album-purchase/settlements/report',
      text: '정산 리포트',
      color: '#607d8b',
    },
  ];

  return (
    <Box>
      {/* 통계 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom fontSize={14}>
              전체 정산
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {stats?.totalSettlementCount || 0}
              <Typography component="span" variant="h6" color="text.secondary">
                건
              </Typography>
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={600}>
              ₩{(stats?.totalSettlementAmount || 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom fontSize={14}>
              정산 대기 중
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {stats?.pendingSettlementCount || 0}
              <Typography component="span" variant="h6" color="text.secondary">
                건
              </Typography>
            </Typography>
            <Typography variant="h6" color="warning.main" fontWeight={600}>
              ₩{(stats?.pendingSettlementAmount || 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom fontSize={14}>
              정산 완료
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {stats?.completedSettlementCount || 0}
              <Typography component="span" variant="h6" color="text.secondary">
                건
              </Typography>
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight={600}>
              ₩{(stats?.completedSettlementAmount || 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom fontSize={14}>
              오늘 정산
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {stats?.todaySettlementCount || 0}
              <Typography component="span" variant="h6" color="text.secondary">
                건
              </Typography>
            </Typography>
            <Typography variant="h6" color="info.main" fontWeight={600}>
              ₩{(stats?.todaySettlementAmount || 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom fontSize={14}>
              이번 달 정산
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {stats?.thisMonthSettlementCount || 0}
              <Typography component="span" variant="h6" color="text.secondary">
                건
              </Typography>
            </Typography>
            <Typography variant="h6" color="secondary.main" fontWeight={600}>
              ₩{(stats?.thisMonthSettlementAmount || 0).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 빠른 링크 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          빠른 링크
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {quickLinks.map((link) => (
            <Button
              key={link.href}
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => router.push(link.href)}
              sx={{
                py: 2,
                borderColor: link.color,
                color: link.color,
                '&:hover': {
                  borderColor: link.color,
                  background: `${link.color}10`,
                },
              }}
            >
              {link.text}
            </Button>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default function DashboardPage() {
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
        음반 매입 관리 대시보드
      </Typography>
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <DashboardContent />
      </Suspense>
    </Box>
  );
}
