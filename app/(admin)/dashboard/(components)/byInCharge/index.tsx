import {
  useGetInCharge,
  useGetInCharges,
  useGetSellsByInCharge,
} from '@/query/query/stats';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function StatsByInCharge() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    data: inChargesData,
    isLoading: isInChargesLoading,
    isSuccess: isInChargesSuccess,
  } = useGetInCharges();

  const [selectedInCharge, setSelectedInCharge] = useState<any>('');

  const {
    data: inChargeData,
    isLoading: isInChargeLoading,
    isSuccess: isInChargeSuccess,
  } = useGetInCharge(selectedInCharge);
  //
  const {
    data: sellsByInChargeData,
    isLoading: isSellsByInChargeLoading,
    isSuccess: isSellsByInChargeSuccess,
  } = useGetSellsByInCharge();
  const [selectedData, setSelectedData] = React.useState([]);

  useEffect(() => {
    setSelectedData(
      sellsByInChargeData?.filter(
        (item: any) => item.inCharge === selectedInCharge,
      ),
    );
  }, [sellsByInChargeData, selectedInCharge]);

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
        담당자별
      </Typography>
      {!isInChargesLoading && isInChargesSuccess && inChargesData && (
        <Box>
          <Select
            value={selectedInCharge}
            onChange={(e) => setSelectedInCharge(e.target.value)}
            displayEmpty
            sx={{ minWidth: 180, mb: 1 }}
            size="small"
          >
            <MenuItem value={''}>담당자를 선택해 주세요</MenuItem>
            {inChargesData.map((item: any, i: number) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {!isInChargeLoading &&
            isInChargeSuccess &&
            inChargeData &&
            selectedInCharge && (
              <Box>
                <Typography>{selectedInCharge}</Typography>
                <Typography>
                  매출액: {inChargeData.totalSell.toLocaleString()} 원
                </Typography>
                <Typography>
                  판매수량: {inChargeData.totalQty.toLocaleString()} 개
                </Typography>
              </Box>
            )}
          {!isSellsByInChargeLoading &&
            isSellsByInChargeSuccess &&
            inChargesData &&
            selectedInCharge &&
            selectedData && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  flexDirection: isMobile ? 'column' : 'row',
                  border: isMobile ? '1px solid' : 'none',
                  borderColor: isMobile ? 'divider' : 'none',
                  borderRadius: isMobile ? 1 : 0,
                  overflowY: 'scroll',
                }}
              >
                {selectedData.map((item: any, i: number) => (
                  <Box key={i} sx={{ mr: 2 }}>
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
