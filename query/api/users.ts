import { API_URL } from '@/constants/apis';
import axios from 'axios';
import { SignIn } from '@/types/signIn';
import { requests } from '../request';
import { SignUp } from '@/types/signUp';
import { UpdateUsersPermissionDTO } from '@/types/updateUsersPermissionDTO';
import { UpdateUsersNicknameDTO } from '@/types/updateUsersNicknameDTO';

export const myInfo = async () => {
  const { data } = await requests({
    method: 'get',
    url: `/users/myinfo`,
  });
  return data;
};

export const signUp = async (payload: SignUp) => {
  const { data } = await requests({
    method: 'post',
    url: `/users/signup`,
    data: payload,
  });

  return data;
};

export const signIn = async (payload: SignIn) => {
  const { data } = await requests({
    method: 'post',
    url: `/users/signin`,
    headers: {
      Authorization: '',
    },
    data: payload,
  });

  return data;
};

export const signOut = async () => {
  const { data } = await requests({
    method: 'post',
    url: `/users/signout`,
  });

  return data;
};

export const reIssue = async () => {
  const { data } = await requests({
    method: 'post',
    url: `/users/reissue`,
    data: {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    },
  });

  return data;
};

export const getAllUsersWithOrderItemsQty = async () => {
  const { data } = await requests(`${API_URL}/users/userswithorderitemsqty`, {
    method: 'GET',
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getUserDetailByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/users/${usersEmail}`,
  });
  return data;
};

export const updateUsersPermission = async (
  payload: UpdateUsersPermissionDTO,
) => {
  const { data } = await requests(`${API_URL}/users/permission`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('권한 수정을 성공했습니다');
  return data;
};

export const updateUsersNickname = async (payload: UpdateUsersNicknameDTO) => {
  const { data } = await requests(`${API_URL}/users/nickname`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('회사명 수정을 성공했습니다');
  return data;
};
