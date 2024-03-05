import { API_URL } from '@/constants/apis';
import axios from 'axios';
import { SignIn } from '@/types/signIn';
import { requests } from '../request';
import { SignUp } from '@/types/signUp';

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
