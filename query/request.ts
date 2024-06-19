import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { reIssue } from './api/users';
import { API_URL } from '@/constants/apis';

export const requests = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

requests.interceptors.request.use(
  (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    config.withCredentials = true;
    if (config.url !== '/users/signin' && config.headers) {
      config.headers.Authorization =
        `Bearer ${localStorage.getItem('accessToken')}` || '';
    }

    if (config.url === '/users/reissue' && config.headers) {
      config.headers.Authorization = '';
    }

    return Promise.resolve({ ...config } as InternalAxiosRequestConfig);
  },

  (error: AxiosError<AxiosRequestConfig>) => {
    switch (true) {
      case Boolean(error.config):
        console.log('에러: 요청 실패', error);
        break;
      case Boolean(error.request):
        console.log('에러: 응답 없음', error);
        break;
      default:
        console.log('에러:', error);
        break;
    }

    return Promise.reject(error);
  },
);

requests.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
    const { config, data } = response;
    if (config.url === '/users/reissue') {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
  },

  (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
      const { message } = error;
      const { method, url } = error.config as AxiosRequestConfig;
      const { status, statusText, data } = error.response as AxiosResponse;

      if (data && data.message === '잘못된 JWT 서명입니다.') {
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        window.location.href = '/';
      }

      if (
        status === 401 &&
        url !== '/users/reissue' &&
        url !== '/users/signout'
      ) {
        reIssue();
      }

      switch (status) {
        case 400:
          console.log(status, message, '잘못된 요청입니다.');
          break;
        case 401:
          console.log(status, message, '인증 실패입니다.');
          break;
        case 403:
          console.log(status, message, '권한이 없습니다.');
          break;
        case 404:
          console.log(status, message, '찾을 수 없는 페이지입니다.');
          break;
        case 500:
          console.log(status, message, '서버 오류입니다.');
          break;
        default: {
          console.log(status, `에러가 발생했습니다. ${error.message}`);
        }
      }
    } else if (error instanceof Error && error.name === 'TimeoutError') {
      console.log(0, '요청 시간이 초과되었습니다.');
    } else {
      console.log(0, `에러가 발생했습니다. ${error.toString()}`);
    }
    return Promise.reject(error);
  },
);
