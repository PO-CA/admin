'use client';
import CartList from '../(components)/cartList/cartList';
import ProductList from '../(components)/productList/productList';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { useGetNotices } from '@/query/query/notice';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';

// 간단한 공지사항 미리보기 컴포넌트
const RecentNotices = () => {
  const { data: notices, isLoading } = useGetNotices();

  // visible이 true인 공지만 표시하고 최근 3개만 가져옴
  const recentNotices =
    notices
      ?.filter((notice: any) => notice.visible)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3) || [];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        mb: 3,
        mx: 20,
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <NotificationsIcon
          sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }}
        />
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ fontWeight: 600, fontSize: '0.95rem' }}
        >
          최근 공지사항
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Link
          href="/store/notice"
          style={{ textDecoration: 'none', color: '#666', fontSize: '0.8rem' }}
        >
          더보기
        </Link>
      </Box>

      <Divider sx={{ my: 0.5 }} />

      {isLoading ? (
        <Box sx={{ py: 1, textAlign: 'center', fontSize: '0.9rem' }}>
          로딩중...
        </Box>
      ) : recentNotices.length > 0 ? (
        <List disablePadding dense>
          {recentNotices.map((notice: any) => (
            <ListItem
              key={notice.id}
              component={Link}
              href={`/store/notice/${notice.id}`}
              disablePadding
              sx={{
                py: 0.5,
                mx: 1,
                borderBottom: '1px solid #f5f5f5',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.9rem',
                        maxWidth: '70%',
                      }}
                    >
                      {notice.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem', ml: 1, mr: 5 }}
                    >
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
                disableTypography
                sx={{ my: 0 }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            py: 1,
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          등록된 공지사항이 없습니다.
        </Box>
      )}
    </Paper>
  );
};

export default function Store() {
  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      {/* 공지사항 컴포넌트 추가 */}
      <RecentNotices />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ width: '65%' }}>
          <ProductList />
        </Box>
        <Box sx={{ width: '35%' }}>
          <CartList />
        </Box>
      </Box>
    </Box>
  );
}
