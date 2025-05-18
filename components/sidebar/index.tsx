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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info' as 'error' | 'info' | 'success' | 'warning',
  });
  const [isRecording, setIsRecording] = React.useState(false);
  const [deviceSupportsCamera, setDeviceSupportsCamera] = React.useState(true);

  // 디바이스 기능 감지
  React.useEffect(() => {
    // 카메라 지원 여부 확인
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setDeviceSupportsCamera(false);
      showSnackbar('이 기기는 카메라를 지원하지 않습니다.', 'warning');
    }

    // MediaRecorder 지원 여부 확인
    if (typeof MediaRecorder === 'undefined') {
      showSnackbar('이 기기는 비디오 녹화를 지원하지 않습니다.', 'warning');
    }
  }, []);

  const showSnackbar = (
    message: string,
    severity: 'error' | 'info' | 'success' | 'warning' = 'info',
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 디바이스에 적합한 비디오 MIME 타입 감지
  const getSupportedMimeType = (): string => {
    const types = [
      'video/webm',
      'video/mp4',
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return 'video/webm'; // 기본값
  };

  const startRecording = async () => {
    try {
      // 후면 카메라 먼저 시도
      const constraints = {
        video: {
          facingMode: { exact: 'environment' },
        },
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        // 후면 카메라가 없거나 접근 불가능한 경우 기본 카메라로 대체
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: mimeType });
        setVideoBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        showSnackbar('촬영이 완료되었습니다', 'success');
      };

      mediaRecorder.start();
      setIsRecording(true);
      showSnackbar('녹화가 시작되었습니다', 'info');
    } catch (error) {
      console.error('녹화 시작 오류:', error);
      showSnackbar(
        '카메라에 접근할 수 없습니다. 권한을 확인해 주세요.',
        'error',
      );
    }
  };

  const stopRecordingAndUpload = async () => {
    if (!mediaRecorderRef.current || !isRecording) {
      showSnackbar('녹화가 진행 중이지 않습니다', 'warning');
      return;
    }

    try {
      mediaRecorderRef.current.stop();
      showSnackbar('녹화가 종료되었습니다. 업로드 중...', 'info');

      // mediaRecorder.onstop 이벤트가 발생할 때까지 잠시 대기
      setTimeout(async () => {
        if (!videoBlob) {
          showSnackbar('비디오 데이터를 찾을 수 없습니다', 'error');
          return;
        }

        if (!shippingId) {
          showSnackbar('배송 ID를 입력해주세요', 'warning');
          return;
        }

        try {
          // Presigned URL 요청
          const presignRes = await fetch('/api/shipping-videos/presign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              shippingDetailId: shippingId,
              fileName: `video_${shippingId}_${Date.now()}.${videoBlob.type.includes('mp4') ? 'mp4' : 'webm'}`,
              fileType: videoBlob.type,
            }),
          });

          if (!presignRes.ok) {
            throw new Error('Presigned URL 생성 실패');
          }

          const { presignedUrl, uploadFileUrl } = await presignRes.json();

          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            body: videoBlob,
            headers: { 'Content-Type': videoBlob.type },
          });

          if (!uploadRes.ok) {
            throw new Error('파일 업로드 실패');
          }

          // 업로드 결과 등록
          const registerRes = await fetch('/api/shipping-videos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              shippingDetailId: shippingId,
              videoUrl: uploadFileUrl,
            }),
          });

          if (!registerRes.ok) {
            throw new Error('비디오 등록 실패');
          }

          showSnackbar('영상이 성공적으로 업로드되었습니다', 'success');
          setOpenModal(false);
          setShippingId('');
          setVideoBlob(null);
        } catch (error) {
          console.error('업로드 오류:', error);
          showSnackbar('영상 업로드 중 오류가 발생했습니다', 'error');
        }
      }, 500);
    } catch (error) {
      console.error('녹화 종료 오류:', error);
      showSnackbar('녹화 종료 중 오류가 발생했습니다', 'error');
    }
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
          disabled={!deviceSupportsCamera}
        >
          영상촬영
        </Button>
        <Dialog
          open={openModal}
          onClose={() => {
            if (mediaRecorderRef.current && isRecording) {
              mediaRecorderRef.current.stop();
              setIsRecording(false);
            }
            setOpenModal(false);
          }}
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
            <Button
              onClick={startRecording}
              disabled={isRecording}
              color="primary"
            >
              촬영 시작
            </Button>
            <Button
              onClick={stopRecordingAndUpload}
              disabled={!isRecording}
              color="secondary"
            >
              촬영 종료 및 업로드
            </Button>
            <Button
              onClick={() => {
                if (mediaRecorderRef.current && isRecording) {
                  mediaRecorderRef.current.stop();
                  setIsRecording(false);
                }
                setOpenModal(false);
              }}
            >
              닫기
            </Button>
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
              onError={(err: Error) => {
                console.error('QR 스캔 오류:', err);
                showSnackbar('QR 스캔 중 오류가 발생했습니다', 'error');
              }}
              onScan={(data: { text: string } | null) => {
                if (data?.text) {
                  setShippingId(data.text);
                  setOpenQrScanner(false);
                  showSnackbar('QR 코드를 성공적으로 스캔했습니다', 'success');
                }
              }}
              style={{ width: '100%' }}
              constraints={{
                video: {
                  facingMode: { exact: 'environment' }, // 후면 카메라 사용
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenQrScanner(false)}>닫기</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
