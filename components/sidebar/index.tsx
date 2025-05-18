import React from 'react';
import dynamic from 'next/dynamic';
import IconButton from '@mui/material/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { menus } from '@/constants/menus';
import { pocaMenus } from '@/constants/poca-menus';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Sidebar() {
  const { userEmail } = useAuth();
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>(
    {},
  );
  const theme = useTheme();

  // Modal state for video recording
  const [openModal, setOpenModal] = React.useState(false);
  const [shippingId, setShippingId] = React.useState('');
  const [videoBlob, setVideoBlob] = React.useState<Blob | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const [openQrScanner, setOpenQrScanner] = React.useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoBlob(blob);
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.start();
  };

  const stopRecordingAndUpload = async () => {
    mediaRecorderRef.current?.stop();
    // Wait for mediaRecorder.onstop to fire before uploading
    alert('촬영이 종료되었습니다.');
    alert('shippingId:' + shippingId);
    alert('videoBlob:' + videoBlob?.size);
    setTimeout(async () => {
      if (videoBlob && shippingId) {
        // Presigned URL 요청
        const presignRes = await fetch('/api/shipping-videos/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shippingDetailId: shippingId,
            fileName: `video_${shippingId}_${Date.now()}.webm`,
            fileType: 'video/webm',
          }),
        });
        const { presignedUrl, uploadFileUrl } = await presignRes.json();
        await fetch(presignedUrl, {
          method: 'PUT',
          body: videoBlob,
          headers: { 'Content-Type': 'video/webm' },
        });
        // 업로드 결과 등록
        await fetch('/api/shipping-videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shippingDetailId: shippingId,
            videoUrl: uploadFileUrl,
          }),
        });
        alert('영상이 업로드되었습니다.');
        setOpenModal(false);
        setShippingId('');
        setVideoBlob(null);
      }
    }, 500);
  };

  const handleClick = (text: string) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const showPocaMenus =
    userEmail === 'rudghksldl@gmail.com' || userEmail === 'kurare@naver.com';

  const renderMenus = (menuList: any[]) =>
    menuList.map((menu, idx) => {
      if (menu.href) {
        return (
          <ListItem key={menu.text + idx} disablePadding>
            <Link href={menu.href} passHref legacyBehavior>
              <ListItemButton
                component="a"
                sx={{
                  color: theme.palette.text.primary,
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[200],
                    color: theme.palette.common.black,
                  },
                  '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: theme.palette.grey[900],
                    color: theme.palette.common.white,
                  },
                }}
              >
                <ListItemText primary={menu.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        return (
          <React.Fragment key={menu.text + idx}>
            <ListItemButton
              onClick={() => handleClick(menu.text)}
              sx={{
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                '&:hover': {
                  backgroundColor: theme.palette.grey[200],
                  color: theme.palette.common.black,
                },
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: theme.palette.grey[900],
                  color: theme.palette.common.white,
                },
              }}
            >
              <ListItemText primary={menu.text} />
              {openMenus[menu.text] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMenus[menu.text]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.subMenus.map((sub: any, subIdx: number) => (
                  <ListItem
                    key={sub.text + subIdx}
                    sx={{ pl: 4 }}
                    disablePadding
                  >
                    <Link href={sub.href} passHref legacyBehavior>
                      <ListItemButton
                        component="a"
                        sx={{
                          color: theme.palette.text.secondary,
                          borderRadius: theme.shape.borderRadius,
                          mx: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.grey[800],
                            color: theme.palette.common.white,
                          },
                          '&.Mui-selected, &.Mui-selected:hover': {
                            backgroundColor: theme.palette.common.black,
                            color: theme.palette.common.white,
                          },
                        }}
                      >
                        <ListItemText primary={sub.text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }
      return null;
    });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 200,
          boxSizing: 'border-box',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <List>
        {renderMenus(menus)}
        {showPocaMenus && renderMenus(pocaMenus)}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpenModal(true)}
        >
          영상촬영
        </Button>
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>배송 ID 입력 또는 스캔</DialogTitle>
          <DialogContent>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                margin="normal"
                label="배송 ID"
                value={shippingId}
                onChange={(e) => setShippingId(e.target.value)}
              />
              <IconButton
                onClick={() => setOpenQrScanner(true)}
                sx={{ ml: 1 }}
                size="large"
              >
                <QrCodeScannerIcon />
              </IconButton>
            </Box>
            <video
              ref={videoRef}
              width="100%"
              controls
              muted
              style={{ marginTop: 16 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={startRecording}>촬영 시작</Button>
            <Button onClick={stopRecordingAndUpload}>
              촬영 종료 및 업로드
            </Button>
            <Button onClick={() => setOpenModal(false)}>닫기</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openQrScanner}
          onClose={() => setOpenQrScanner(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>바코드/QR 코드 스캔</DialogTitle>
          <DialogContent>
            <QrScanner
              delay={300}
              onError={(err) => console.error(err)}
              onScan={(data) => {
                if (data?.text) {
                  setShippingId(data.text);
                  setOpenQrScanner(false);
                }
              }}
              style={{ width: '100%' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenQrScanner(false)}>닫기</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
