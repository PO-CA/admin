import { useGetSellsByUsers } from '@/query/query/stats';
import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function StatsByUsers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetSellsByUsers();

  const [userData, setUserData] = React.useState<any>([]);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedData, setSelectedData] = React.useState([]);

  useEffect(() => {
    if (!isUsersLoading && isUsersSuccess) {
      setUserData(getUniqueNicknames(usersData));
    }
  }, [isUsersLoading, isUsersSuccess, selectedUser, usersData]);

  useEffect(() => {
    setSelectedData(
      usersData?.filter((item: any) => item.nickname === selectedUser),
    );
  }, [usersData, selectedUser]);

  function getUniqueNicknames(data: any) {
    const uniqueNicknames = [];
    const map = new Map();

    for (const item of data) {
      if (!map.has(item.nickname)) {
        map.set(item.nickname, true);
        uniqueNicknames.push(`${item.nickname}`);
      }
    }

    return uniqueNicknames;
  }

  return (
    <Paper
      sx={{
        background: 'white',
        p: 2,
        fontSize: 14,
        fontWeight: 500,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} mb={1}>
        유저별
      </Typography>

      {!isUsersLoading && isUsersSuccess && usersData && (
        <Box>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            displayEmpty
            sx={{ minWidth: 180, mb: 1 }}
            size="small"
          >
            <MenuItem value="">유저를 선택해 주세요</MenuItem>
            {userData.map((item: any, i: number) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {userData && selectedData && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                border: isMobile ? '1px solid' : 'none',
                borderColor: isMobile ? 'divider' : 'none',
                borderRadius: isMobile ? 1 : 0,
                overflowY: 'scroll',
              }}
            >
              {selectedData.map((item: any, i: number) => (
                <Box
                  key={i}
                  sx={{
                    p: isMobile ? 1 : 0,
                    border: isMobile ? '1px solid' : 'none',
                    borderColor: isMobile ? 'divider' : 'none',
                    borderRadius: isMobile ? 1 : 0,
                  }}
                >
                  <Typography>{item.month} 월</Typography>
                  <Typography>
                    매출액: {item.totalSell.toLocaleString()} 원
                  </Typography>
                  <Typography>
                    판매수량: {item.totalQty.toLocaleString()} 개
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
